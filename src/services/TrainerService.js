import api from "./api";

const API_URL = '/formadores';

const test = false;

//Busqueda de tematicas para el MAPA
export const getTrainersList = async (thematics) => {
    test && console.log("getTrainerList");
    try {
        return (await api.get(API_URL + "/list?thematics=" + thematics)).data;
    } catch (error) {
        throw error;
    }
}

export const getTrainers = async ({ page, size, name, lastname, province, thematic, orderBy, asc, enabled }) => {
    test && console.log("getTrainers");
    try {
        const url = (
            "?page=" + page
            + "&size=" + size
            + "&name=" + name
            + "&lastname=" + lastname
            + "&province=" + province
            + "&thematic=" + thematic
            + "&orderBy=" + orderBy
            + "&asc=" + asc
            + "&enabled=" + enabled
        );
        const response = await api.get(
            API_URL + url);
        return response.data; // Retorna los datos de la respuesta
    } catch (error) {
        throw error;
    }
}

export const getPDF = async ({ name, lastname, province, thematic, enabled }) => {
    test && console.log("getPDF");
    try {
        const url = (
            "?name=" + name
            + "&lastname=" + lastname
            + "&province=" + province
            + "&thematic=" + thematic
            + "&enabled=" + enabled
        );
        const response = await api.get(
            API_URL + "/pdf" + url);
        return response.data; // Retorna los datos de la respuesta
    } catch (error) {
        throw error;
    }
}

export const saveTrainer = async (trainer) => {
    test && console.log("saveTrainer");
    try {
        const { id, ...data } = trainer;
        const response = await api.post(
            API_URL,
            { ...data, enable: true });
        return (response?.data); // Retorna los datos de la respuesta
    } catch (error) {
        throw error;
    }
}

export const updateTrainer = async (data) => {
    test && console.log("updateTrainer");
    try {
        const id = data.id;
        data = { ...data, enabled: true }
        const response = await api.put(
            API_URL + "/" + id,
            data);

        return (response?.data);
        // Retorna los datos de la respuesta
    } catch (error) {
        throw error;
    }
}


export const unsuscribeTrainer = async (data) => {
    test && console.log("unsuscribeTrainer");
    try {
        const id = data.id;
        data = {
            ...data,
            enabled: false,
            thematics: [],
        }
        console.log(data);
        const response = await api.put(
            API_URL + "/" + id,
            data);

        return (response?.data);
        // Retorna los datos de la respuesta
    } catch (error) {
        throw error;
    }
}

export const deleteTrainer = async (id) => {
    test && console.log("deleteTrainer");
    try {
        const response = await api.delete(
            API_URL + "/" + id
        );
        return (response?.data);
    } catch (error) {
        throw error;
    }
}