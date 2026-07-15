import axios from "axios";

const TEMP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsIm5hbWUiOiJBZG1pbiBUb2tvIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3ODQxMDMxNDgsImV4cCI6MTc4NDE4OTU0OH0.0pkOQkMz6iwowfidoLpwh7nqKdE1WhBsEwDN046IUis";

const api = axios.create({
  baseURL: import.meta.env.VITE_HOST_NAME || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    const tokenFromStorage = localStorage.getItem("token");

    const token = tokenFromStorage || TEMP_TOKEN;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
