import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL+"/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar token automáticamente si existe
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export default api;
