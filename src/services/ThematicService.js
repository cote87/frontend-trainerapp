import api from "./api";

const API_URL = '/tematicas';

const test = false;

export const getThematicsList = async () => {
    test && console.log("getThematicList");
    let response = [];
    try {
        const r = await api.get(API_URL + "/");
        response = {
            data: r?.data,
            message: "Temática obtenidas con éxito",
            success: true,
        };
    } catch (error) {
        response = {
            data: undefined,
            message: "Error al obtener las temáticas",
            success: false,
        };
    }
    return response;
}

export const getThematics = async ({ page, size, name }) => {
    test && console.log("getThematics");
    const searchName = name || "";
    let response = {};
    try {
        const url = API_URL + "?page=" + page + "&size=" + size + "&name=" + searchName
        const r = await api.get(url);
        response = {
            data: r?.data,
            message: "Temática obtenidas con éxito",
            success: true,
        };
    } catch (error) {
        response = {
            data: undefined,
            message: "Error al obtener las temáticas",
            success: false,
        };
    }
    return response;
}

export const saveThematic = async (data) => {
    test && console.log("saveThematics");
    try {
        return await api.post(API_URL, data);
    } catch (error) {
        throw error;
    }

}

export const updateThematic = async (data) => {
    test && console.log("updateThematic");
    let response = {};
    try {
        const { id, ...editData } = data;
        const r = await api.put(API_URL + "/" + id, editData);
        console.log(r?.data);
        response = {
            data: r?.data,
            message: "Temática actualizada con éxito",
            success: true,
        };
    } catch (error) {
        throw error;
    }
    return response;
}

export const deleteThematic = async (id) => {
    test && console.log("deleteThematic");
    let response = {};
    try {
        const r = await api.delete(`${API_URL}/${id}`);
        response = {
            data: r?.data,
            message: "Temática eliminada con éxito",
            success: true,
        };
    } catch (error) {
        response = {
            data: undefined,
            message: "No se puede eliminar una temática que se encuentre vinculada a un Formador!",
            success: false,
        };
    }
    return response;
};