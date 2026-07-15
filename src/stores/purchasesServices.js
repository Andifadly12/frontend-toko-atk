import api from "../config/api";

const handleApiError = (error, defaultMessage) => {
  console.log("API ERROR:", error);

  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    defaultMessage;

  throw new Error(message);
};

export const getPurchases = async () => {
  try {
    const response = await api.get("/purchases");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data pembelian");
  }
};

export const getPurchaseById = async id => {
  try {
    const response = await api.get(`/purchases/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil detail pembelian");
  }
};

export const createPurchase = async purchaseData => {
  try {
    const response = await api.post("/purchases", purchaseData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal menambah pembelian");
  }
};

export const updatePurchase = async (id, purchaseData) => {
  try {
    const response = await api.put(`/purchases/${id}`, purchaseData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal update pembelian");
  }
};

export const deletePurchase = async id => {
  try {
    const response = await api.delete(`/purchases/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal hapus pembelian");
  }
};
