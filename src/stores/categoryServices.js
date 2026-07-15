import api from "../config/api.js";

const handleApiError = (error, defaultMessage) => {
  console.log("API ERROR:", error);

  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    defaultMessage;

  throw new Error(message);
};

export const getCategories = async () => {
  try {
    const response = await api.get("/categorys");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil category");
  } finally {
    console.log("Get category selesai");
  }
};
