import axios from "axios";
import useAuthStore from "../hooks/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_HOST_NAME || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
