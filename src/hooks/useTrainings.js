import { useState } from "react"
import { deleteTraining, getTraining, getTrainings, saveTraining } from "../services/TrainingService"

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
}

const initialSearchFilters = {
    title: "",
    organizer: "",
    startDateFrom: new Date().toISOString().split("T")[0], // formato yyyy-MM-dd,
    startDateTo: null,
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
            console.log("entro a limpiar filtros");
        }
    }

    const loadTrainings = async (newPage) => {
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

    const handlerDeleteTraining = async(id) => {
        try {
            await deleteTraining(id);
            loadTrainings(0);
        } catch (error) {
            throw error;
        }
    }

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