import api from "./api";

const API_URL = '/roles';

const test = false;

export const getRoles = async () => {
    try {
        test && console.log("getRoles");
        const response = await api.get(API_URL);
        return response.data; // Retorna los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        throw error;
    }
}