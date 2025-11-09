import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const loginAuth = async ({ username, password }) => {
  try {
    return await axios.post(URL + '/login', {
      username,
      password
    })
  } catch (error) {
    throw error;
  }
}

export const verifyPassword = async (password) => {
  try {
    return axios.post(URL + '/api/validacion', { password });
  } catch (error) {
  }
}