import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_HOST_NAME || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    const tokenKey = import.meta.env.VITE_TOKEN_KEY || "token";
    const authType = import.meta.env.VITE_AUTH_TYPE || "Bearer";

    const token = localStorage.getItem(tokenKey);

    if (token) {
      config.headers.Authorization = `${authType} ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
