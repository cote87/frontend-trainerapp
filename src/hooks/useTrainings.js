import { useState } from "react"
import { deleteTraining, getTraining, getTrainings, saveTraining } from "../services/TrainingService";
import { generateSingleTrainingPDF, generateTrainingListPDF } from "../utils/generatePDF";
export const ONLINE = "ONLINE";
export const ONSITE = "ONSITE";
export const HYBRID = "HYBRID";

const initialTraining = {
    id: '0',
    title: '',
    startDate: '', //YYYY-MM-DD
    description: '',
    organizer: '',
    thematic: {
        id: 0,
        name: '',
    },
    user: {
        id: 0,
        username: '',
        nickname: '',
        province: {
            id: 0,
            name: '',
        },
        role: ''
    }
}

const initialSearchFilters = {
    title: "",
    organizer: "",
    startDateFrom: new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Argentina/Buenos_Aires' }),
    startDateTo: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toLocaleDateString('sv-SE', { timeZone: 'America/Argentina/Buenos_Aires' }),
    mode: "",
    provinceId: null,
    thematicId: null,
    sortBy: "startDate",
    sortDir: "desc",
    size: 5,
}

export const useTrainings = () => {

    const [trainings, setTrainings] = useState([]);

    const [currentTraining, setCurrentTraining] = useState(initialTraining);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageable, setPageable] = useState([]);
    const [totalElements, setTotalElements] = useState(0);

    // Filtros
    const [searchFilters, setSearchFilters] = useState(initialSearchFilters);

    const { title, organizer, startDateFrom, startDateTo, mode, provinceId, thematicId, sortBy, sortDir, size } = searchFilters;
    const [loading, setLoading] = useState(false);

    const clearFilters = () => {
        if (JSON.stringify(searchFilters) !== JSON.stringify(initialSearchFilters)) {
            setSearchFilters(initialSearchFilters);
        }
    }

    const loadTrainings = async (newPage) => {
        setLoading(true);
        try {
            const response = await getTrainings({
                page: newPage,
                size,
                title,
                organizer,
                startDateFrom,
                startDateTo,
                mode,
                provinceId,
                thematicId,
                sortBy,
                sortDir
            });

            setPage(newPage);

            setTrainings(response.data.content ?? response.data ?? []);
            setTotalPages(response.data.totalPages ?? 0);
            setPageable(response.data.pageable ?? []);
            setTotalElements(response.data.totalElements ?? 0);

        } catch (error) {
            console.error("Error al cargar capacitaciones:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlerClearCurrentTraining = () => {
        setCurrentTraining(initialTraining);
    }

    const handlerLoadingTraining = async (id) => {
        const trainingDB = await getTraining(id);
        setCurrentTraining(trainingDB);
    }

    const handlerSaveTraining = async (data) => {
        try {
            await saveTraining(data);
            handlerClearCurrentTraining();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw error.response.data;
            }
            throw error;
        }
    };

    const handlerDeleteTraining = async (id) => {
        try {
            await deleteTraining(id);
            loadTrainings(0);
        } catch (error) {
            throw error;
        }
    }

    const handlerExportPdf = async (training) => {
        try {
            if (training) {
                await generateSingleTrainingPDF(training);
            }
        } catch (error) {
            console.error("Error al exportar el PDF:", error);
        }
    };

    const handlerExportListPdf = async () => {
        try {
            setLoading(true); 

          
            const response = await getTrainings({
                page: 0,
                size: 999999, 
                title,
                organizer,
                startDateFrom,
                startDateTo,
                mode,
                provinceId,
                thematicId,
                sortBy,
                sortDir
            });

            const allFilteredTrainings = response.data.content ?? response.data ?? [];

            if (allFilteredTrainings.length === 0) {
                throw new Error("No hay datos para exportar");
            }

            await generateTrainingListPDF(allFilteredTrainings);

        } catch (error) {
            console.error("Error al exportar la lista a PDF:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    return {
        initialSearchFilters,
        searchFilters,
        trainings,
        loading,
        currentTraining,
        page,
        totalPages,
        pageable,
        totalElements,
        handlerExportPdf,
        handlerExportListPdf,
        setSearchFilters,
        clearFilters,
        setPage,
        loadTrainings,
        handlerLoadingTraining,
        handlerSaveTraining,
        handlerClearCurrentTraining,
        handlerDeleteTraining,
    }
}