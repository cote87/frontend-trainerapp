import { useState } from "react"
import { deleteResearch, getResearch, getResearchs, saveResearch } from "../services/ResearchService"
import { findAllTrainers, findTrainer } from "../services/TrainerService"
import { getThematicsList } from "../services/ThematicService"
import { formatErrors } from "./tools"

const initialResearch = {
    id: 0,
    name: '',
    description: '',
    thematics: [
        /*     {
                 id: 0,
                 name: '',
             }*/
    ],
    researchers: [
        /*
            {
            id:0,
            name:'',
            trainer:{
                id:0
                name:''
                ...
                }
            }
        */
    ],
    userId: 0,
}

const initialResearchError = {
    name: '',
    description: '',
    thematics: '',
    researchers: '',
}

const initialSearchFilters = {
    name: '',
    thematic: '',
    size: 5,
    page: 0,
    sortDir: "asc",
    sortBy: "name",
}

const initialCurrentTrainer = {
    id: 0,
    name: '',
    lastname: '',
    documentType: {
        id: 0,
        name: '',
    },
    documentNumber: '',
    province: {
        id: 0,
        code: '0',
        name: ''
    },
    email: '',
    areaCode: '',
    phone: '',
    thematics: [
        /*     {
                 id: 0,
                 name: '',
             }*/
    ],
    cv: '',
    institution: '',
    enabled: true

};

export const useResearchs = () => {

    //INICIALIZACIÓN DE VARIABLES
    //Lista de investigaciones
    const [researchs, setResearchs] = useState([]);
    //parámetros de la página de resultados
    const [totalPages, setTotalPages] = useState(0);
    const [pageable, setPageable] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    // Filtros de búsqueda
    const [searchFilters, setSearchFilters] = useState(initialSearchFilters);
    const { name, thematic, size, page } = searchFilters;
    const [loading, setLoading] = useState(false);
    //Formulario Investigación
    const [visibleForm, setVisibleForm] = useState(false);
    const [currentResearch, setCurrentResearch] = useState(initialResearch);
    const [trainers, setTrainers] = useState([]);
    const [thematics, setThematics] = useState([]);
    //Foormulario View Trainer
    const [visibleViewTrainer, setVisibleViewTrainer] = useState(false);
    const [currentTrainer, setCurrentTrainer] = useState(initialCurrentTrainer);

    //Errores
    const [errors, setErrors] = useState(initialResearchError);
    //--------------------------------------------------------------------------

    //FUNCIONES
    //Filtros - Limpiar
    const clearFilters = () => {
        if (JSON.stringify(searchFilters) !== JSON.stringify(initialSearchFilters)) {
            setSearchFilters(initialSearchFilters);
        }
    }
    // Trainer - Lista de trainers
    const loadTrainers = async () => {
        try {
            const trainersListDB = await findAllTrainers({
                name: '',
                lastname: '',
                province: '',
                thematic: '',
                enabled: true,
            });
            setTrainers(trainersListDB);
        } catch (error) {
            throw error;
        }
    }
    // Thematic - Lista de thematics
    const loadThematics = async () => {
        try {
            const thematicListDB = await getThematicsList();
            setThematics(thematicListDB.data);
        } catch (error) {

        }
    }
    //Investigaciones - Obtener lista de investigaciones para la página
    const loadResearchs = async () => {
        setLoading(true);
        try {
            const request = {
                page,
                size,
                name,
                thematic,
            }
            const response = await getResearchs(request);

            setResearchs(response.data.content ?? response.data ?? []);
            setTotalPages(response.data.totalPages ?? 0);
            setPageable(response.data.pageable ?? []);
            setTotalElements(response.data.totalElements ?? 0);

        } catch (error) {
            console.error("Error al cargar Investigaciones:", error);
        } finally {
            setLoading(false);
        }
    }
    //Investigaciones - Limpiar la selección de investigación actual
    const clearCurrentResearch = () => {
        setCurrentResearch(initialResearch);
    }
    //Investigaciones - cargar el formulario de una investigación
    const loadForm = async (id) => {
        try {
            if (id > 0) {
                const researchDB = await getResearch(id);
                setCurrentResearch(researchDB);
            } else {
                clearCurrentResearch();
            }
            await loadThematics();
            await loadTrainers();
        } catch (error) {
            throw error;
        }
        setErrors({});
        setVisibleForm(true);
    }
    //---------------------------------------------------------------------------

    //HANDLERS
    // Trainer - ViewTrainer
    const handlerOpenViewTrainer = async (id) => {
        try {
            const trainerDB = await findTrainer(id);
            if (trainerDB.data) setCurrentTrainer(trainerDB.data);
            setVisibleViewTrainer(true);
        } catch (error) {
            throw error;
        }
    }
    const handlerCloseViewTrainer = () => {
        setVisibleViewTrainer(false);
        setCurrentTrainer(initialCurrentTrainer);
    }

    // Investigaciones - Cargar parámetros de búsqueda
    const handlerLoadSearchFilters = (searchFilters) => {
        setSearchFilters(searchFilters);
    }
    // Investigaciones - Abrir y Cerrar Form
    const handlerOpenResearchForm = (id = 0) => {
        loadForm(id);
    }
    const handlerCloseResearchForm = () => {
        setVisibleForm(false);
        clearCurrentResearch();
    }
    //Investigaciones - Carga inicial de investigaciones
    const handlerLoadResearchs = () => {
        loadResearchs();
    }
    //Investigaciones - Carga de una página de investigaciones
    const handlerChangePageResearchs = (newPage) => {
        setSearchFilters({
            ...searchFilters,
            page: newPage
        });
    }
    //Investigaciones - guardar una investigación
    const handlerSaveResearch = async (data) => {
        setErrors({});
        try {
            const response = await saveResearch(data);
            if (response) {
                clearCurrentResearch();
                setSearchFilters({
                    name: data.name,
                    thematic: '',
                    size: size,
                    page: 0,
                    sortDir: 'asc',
                    sortBy: 'name',
                })
                console.log(searchFilters);
                loadResearchs();
            }
            return true;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(formatErrors(error.response.data));
            }
            return false;
        }
    };
    //Investigación - eliminar una investigación
    const handlerDeleteResearch = async (id) => {
        try {
            await deleteResearch(id);
            loadResearchs();
        } catch (error) {
            throw error;
        }
    }
    //-------------------------------------------------------------------------------------

    return {
        loading,
        searchFilters,
        researchs,
        visibleForm,
        currentResearch,
        trainers,
        thematics,
        errors,
        visibleViewTrainer,
        currentTrainer,
        page,
        totalPages,
        pageable,
        totalElements,
        handlerLoadSearchFilters,
        handlerLoadResearchs,
        handlerOpenViewTrainer,
        handlerChangePageResearchs,
        handlerCloseResearchForm,
        handlerCloseViewTrainer,
        handlerOpenResearchForm,
        handlerSaveResearch,
        handlerDeleteResearch,
    };

}