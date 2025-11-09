import api from "./api";

const API_URL = '/provincias';

const test = false;

export const getProvinces = async () => {
    try {
        test && console.log("getProvinces");
        const response = await api.get(API_URL);
        return response.data; // Retorna los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener las provincias:', error);
        throw error;
    }
}