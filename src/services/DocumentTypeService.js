import api from "./api";

const API_URL = '/tipo-documento';

const test = false;

export const getDocumentTypes = async () => {
    try {
        test && console.log("getDocumentTypes");
        const response = await api.get(API_URL);
        return response.data; // Retorna los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener los tipos de documentos:', error);
        throw error;
    }
}