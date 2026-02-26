import api from "./api";

const API_URL = '/formadores';

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

export const findAllTrainers = async ({ name, lastname, province, thematic, enabled }) => {
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

export const findTrainer = async (id) => {
    try {
        return await api.get(API_URL+'/'+id);
    } catch (error) {
        throw error;
    }
}

export const saveTrainer = async (trainer) => {
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
    try {
        const response = await api.delete(
            API_URL + "/" + id
        );
        return (response?.data);
    } catch (error) {
        throw error;
    }
}