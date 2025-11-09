import api from "./api";

const API_URL = '/';


/**
 * Obtiene una lista paginada de capacitaciones con filtros.
 * 
 * @param {Object} params - Parámetros de búsqueda y paginación
 * @param {string} params.title - Título de la capacitación
 * @param {string} params.organizer - Nombre del organizador
 * @param {string} params.startDateFrom - Fecha desde (yyyy-MM-dd)
 * @param {string} params.startDateTo - Fecha hasta (yyyy-MM-dd)
 * @param {string} params.mode - Modo: ONSITE / ONLINE / HYBRID
 * @param {number} params.provinceId - Id de la provincia
 * @param {number} params.page - Página actual (0-indexed)
 * @param {number} params.size - Cantidad de items por página
 * @param {string} params.sortBy - Campo para ordenar
 * @param {string} params.sortDir - Dirección: asc / desc
 * @returns {Promise} - Objeto con lista de capacitaciones y info de paginación
 */

const test = false;

export const getTrainings = async ({
    title = '',
    organizer = '',
    startDateFrom = '',
    startDateTo = '',
    mode = '',
    provinceId = '',
    thematicId = '',
    page = 0,
    size = 5,
    sortBy = 'startDate',
    sortDir = 'asc',
} = {}) => {
    test && console.log("getTrainings");
    try {
        const response = await api.get(`${API_URL}capacitaciones`, {
            params: {
                title,
                organizer,
                startDateFrom,
                startDateTo,
                mode,
                provinceId,
                thematicId,
                page,
                size,
                sortBy,
                sortDir,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching trainings:", error);
        throw error;
    }
};

export const getTraining = async (id) => {
    test && console.log("getTraining");
    try {
        const response = await api.get(`${API_URL}capacitaciones/${id}`);
        return response.data; // devuelve directamente el objeto de la capacitación
    } catch (error) {
        console.error("Error fetching training:", error);
        throw error;
    }
};

export const getTrainingsList = async () => {
    try {

    } catch (error) {

    }
}

export const saveTraining = async (data) => {
    test && console.log("saveTraining");
    const { id, ...training } = data;

    try {
        if (data.id > 0) {
            await api.put(API_URL + `capacitaciones/${id}`, training);
        } else {
            await api.post(API_URL + `capacitaciones`, training);
        }

    } catch (error) {
        throw error;
    }

}

export const deleteTraining = async (id) => {
    test && console.log("deleteTraining");
    try {
        await api.delete(API_URL + "capacitaciones/" + id);
    } catch (error) {

    }
}