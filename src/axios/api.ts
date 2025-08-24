import axios from "axios";
import { store } from '../store';

export const api = axios.create({
  baseURL: `https://api-crmallcom.sandboxallcom.com/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "application-key": "2"
  },
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido - fazer logout
      store.dispatch({ type: 'auth/clearAuth' });
    }
    return Promise.reject(error);
  }
);
