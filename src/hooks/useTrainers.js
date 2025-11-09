import { useState } from "react";
import { getProvinces } from "../services/ProvinceService";
import { getDocumentTypes } from "../services/DocumentTypeService";
import { deleteTrainer, getPDF, getTrainers, saveTrainer, unsuscribeTrainer, updateTrainer } from "../services/TrainerService"
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";
import { generatePDF } from "../utils/generatePDF";

const initialTrainerForm = {
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
    enabled: true

};

const initialTrainerErrors = {
    name: '',
    lastname: '',
    documentType: '',
    documentNumber: '',
    province: '',
    email: '',
    areaCode: '',
    phone: '',
    thematics: '',
    cv: '',
}

export const useTrainers = () => {

    const [searchParams] = useSearchParams();

    const [viewTrainer, setViewTrainer] = useState(initialTrainerForm);

    const [trainers, setTrainers] = useState([]);

    const [totalPages, setTotalPages] = useState(0);

    const [visibleForm, setVisibleForm] = useState(false);

    const [currentTrainerForm, setCurrentTrainerForm] = useState(initialTrainerForm);

    const [provinces, setProvinces] = useState([]);

    const [documentTypes, setDocumentTypes] = useState([]);

    const [errors, setErrors] = useState(initialTrainerErrors);

    const page = (searchParams.get("page") || 0);

    const size = (searchParams.get("size") || 10);

    const orderBy = (searchParams.get("orderBy") || "lastname");

    const asc = (searchParams.get("asc") || "true");

    const enabled = (searchParams.get("enabled") || "true");

    const name = (searchParams.get("name") || "");

    let lastname = (searchParams.get("lastname") || "");

    const thematic = (searchParams.get("thematic") || "");

    const province = (searchParams.get("province") || "");

    const [pageable, setPageable] = useState({});

    const handlerLoadingProvinces = async () => {
        if (provinces.length === 0) {
            setProvinces(await getProvinces());
        }
    }

    const handlerLoadingDocumentTypes = async () => {
        if (documentTypes.length === 0) {
            setDocumentTypes(await getDocumentTypes());
        }
    }

    const handlerSearchTrainers = (searchForm) => {

        name = searchForm.name;
        lastname = searchForm.lastname;
        province = searchForm.province;
        thematic = searchForm.thematic;
        size = searchForm.size;
        orderBy = searchForm.orderBy;
        asc = searchForm.asc;
        enabled = searchForm.enabled;

        handlerLoadingTrainers();
    }

    const handlerLoadingTrainers = async (provinceId) => {
        try {
            let p = province;
            if (provinceId != undefined) {
                const provinces = await getProvinces();
                p = provinces.find(p => (p.id == provinceId)).name;
            }

            const trainersPageDB = await getTrainers({
                page: page,
                size: size,
                name: name,
                lastname: lastname,
                province: p,
                thematic: thematic,
                orderBy: orderBy,
                asc: asc,
                enabled: enabled
            });
            setTotalPages(trainersPageDB.totalPages);
            setPageable(trainersPageDB.pageable);
            setTrainers(trainersPageDB.content);

        } catch (err) {
            console.error("Error al cargar los formadores:", err);
        }
    };

    const handlerCreateTrainerPDF = async () => {
        try {
            const trainersListDB = await getPDF({
                name: name,
                lastname: lastname,
                province: province,
                thematic: thematic,
                enabled: enabled
            });
            if (trainersListDB) generatePDF(trainersListDB);

        } catch (err) {
            console.error("Error al buscar los formadores:", err);
        }
    };

    const handlerAddOrUpdateTrainer = async (trainer) => {

        try {

            const response = (trainer.id > 0) ? await updateTrainer(trainer) : await saveTrainer(trainer);

            if (response) {
                handlerVisibleForm(false);
                handlerCleanCurrentTrainer;

                Swal.fire({
                    title: "Completado!",
                    text: (trainer.id > 0) ? "Se actualizaron los datos correctamente! de " + trainer.lastname + ", " + trainer.name : trainer.lastname + ", " + trainer.name + " se registró con éxito!",
                    icon: "success"
                });
                lastname = trainer.lastname;
                handlerLoadingTrainers(trainer.province.id);
                return true;
            }
            return response;
        } catch (error) {
            if (error.response && (error.response.status == 400 || error.response.status == 403)) {
                let thematicsError = "";
                let documentNumberErr = "";
                if (error.response.status == 403) documentNumberErr = "El numero de documento ya existe en la base de datos!"
                else documentNumberErr = formatErrors(error.response.data).documentNumber;
                if (trainer.thematics == '') thematicsError = "Debe elegir al menos una temática"
                setErrors({
                    ...formatErrors(error.response.data),
                    thematics: thematicsError,
                    documentNumber: documentNumberErr,
                });
            }

            return false;
        }

    }

    const formatErrors = (errors) => {
        const formattedErrors = {};

        Object.keys(errors).forEach((key) => {
            const keys = key.split("."); // Divide "province.name" en ["province", "name"]

            if (keys.length > 1) {
                if (!formattedErrors[keys[0]]) {
                    formattedErrors[keys[0]] = {}; // Crea el objeto si no existe
                }
                formattedErrors[keys[0]][keys[1]] = errors[key]; // Guarda el mensaje dentro del objeto anidado
            } else {
                formattedErrors[key] = errors[key]; // Si no está anidado, lo guarda normal
            }
        });
        return formattedErrors;
    };
    const handlerDeleteTrainer = async (id) => {
        try {
            const response = await deleteTrainer(id);
            handlerLoadingTrainers();
            return response;
        } catch (error) {
            throw error;
        }
    }
    const handlerUnsuscribeTrainer = async (id) => {

        const trainer = trainers.find(t => t.id == id);

        try {
            (trainer) && await unsuscribeTrainer(trainer);
        } catch (error) {
            console.error("Error al intentar dar de baja al formador", error);
        }

        handlerLoadingTrainers(trainer.province.id);

    }
    const handlerVisibleForm = (isVisible) => {
        setVisibleForm(isVisible);
    }
    const handlerCleanCurrentTrainer = () => {
        setCurrentTrainerForm(initialTrainerForm);
        handlerCleanErrors();
    }

    const handlerCleanErrors = () => {
        setErrors(initialTrainerErrors);
    }

    const handlerFillCurrentTrainer = (id) => {
        let trainer = trainers.find(t => t.id == id);
        setCurrentTrainerForm(trainer);
    }

    const handlerViewTrainer = (id) => {
        setViewTrainer(trainers.find(t => t.id == id) || initialTrainerForm);
    }

    const handlerNavigate = () => {

    }


    return {
        pageable,
        totalPages,
        viewTrainer,
        errors,
        documentTypes,
        provinces,
        trainers,
        visibleForm,
        initialTrainerForm,
        currentTrainerForm,
        handlerViewTrainer,
        handlerAddOrUpdateTrainer,
        handlerVisibleForm,
        handlerCleanCurrentTrainer,
        handlerFillCurrentTrainer,
        handlerDeleteTrainer,
        handlerLoadingTrainers,
        handlerLoadingProvinces,
        handlerLoadingDocumentTypes,
        handlerNavigate,
        handlerSearchTrainers,
        handlerCleanErrors,
        handlerUnsuscribeTrainer,
        handlerCreateTrainerPDF,
    };

}