import api from "../config/api";

const handleApiError = (error, defaultMessage) => {
  console.log("API ERROR:", error);

  const message =
    error.response?.data?.message ||
    error.response?.data?.massage ||
    error.response?.data?.error ||
    error.message ||
    defaultMessage;

  throw new Error(message);
};

export const loginUser = async loginData => {
  try {
    const response = await api.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal login");
  }
};

export const registerUser = async registerData => {
  try {
    const response = await api.post("/users", registerData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal register");
  }
};
