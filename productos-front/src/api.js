// src/api.js

import axios from 'axios';

// Cambia URL_BASE si tu backend está en otra ruta/dominio
const URL_BASE = 'http://3.84.226.51/api';

const api = axios.create({
  baseURL: URL_BASE,
});

// Interceptor para agregar token en cabeceras
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;