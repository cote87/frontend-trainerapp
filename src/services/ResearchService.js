import api from "./api";

const API_URL = '/';

/**
 * Obtiene una lista paginada de investigaciones con filtros.
 * 
 * @param {Object} params - Parámetros de búsqueda y paginación
 * @param {string} params.name - Nombre de la investigación
 * @param {string} params.thematic - Nombre de la investigación
 * @param {number} params.page - Página actual (0-indexed)
 * @param {number} params.size - Cantidad de items por página
 * @returns {Promise} - Objeto con lista de capacitaciones y info de paginación
 */

export const getResearchs = async (request) => {
    const {name,page,size} = request;
    try {
        const response = await api.get(`${API_URL}investigaciones`, {
            params: {
                name,
                page,
                size,
            },
        });
        return response;
    } catch (error) {
        console.error("Error al buscar investigaciones:", error);
        throw error;
    }
};

export const getResearch = async (id) => {
    try {
        const response = await api.get(`${API_URL}investigaciones/${id}`);
        return response.data; // devuelve directamente el objeto de la investigación
    } catch (error) {
        console.error("Error al buscar una investigación:", error);
        throw error;
    }
};

//TODO por si se necesita la lista de investigaciones completa sin paginar
export const getResearchList = async () => {
    try {

    } catch (error) {

    }
}

export const saveResearch = async (updateData) => {
    const {id,...data} = updateData;
    if(id>0) return await api.put("/investigaciones/"+id, updateData); 
    else return await api.post("/investigaciones", data); 
    
}

export const saveResearch2 = async (data) => {

    const { id, ...research } = data;

    try {
        if (data.id > 0) {
            await api.put(API_URL + `investigaciones/${id}`, research);
        } else {
            console.log(API_URL + `investigaciones`);
            await api.post(API_URL + `investigaciones`, research);
        }
    } catch (error) {
        console.error("Error al guardar una investigación:", error);
        throw error;
    }

}

export const deleteResearch = async (id) => {
    try {
        await api.delete(API_URL + "investigaciones/" + id);
    } catch (error) {
        console.error("Error al eliminar una investigación:", error);
        throw error;
    }
}