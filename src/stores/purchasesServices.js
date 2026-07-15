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
  } finally {
    console.log("GET purchases selesai");
  }
};

export const getPurchaseById = async id => {
  try {
    const response = await api.get(`/purchases/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil detail pembelian");
  } finally {
    console.log("GET purchase detail selesai");
  }
};

export const createPurchase = async purchaseData => {
  try {
    const response = await api.post("/purchases", purchaseData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal menambah pembelian");
  } finally {
    console.log("CREATE purchase selesai");
  }
};

export const updatePurchase = async (id, purchaseData) => {
  try {
    const response = await api.put(`/purchases/${id}`, purchaseData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal update pembelian");
  } finally {
    console.log("UPDATE purchase selesai");
  }
};

export const deletePurchase = async id => {
  try {
    const response = await api.delete(`/purchases/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal hapus pembelian");
  } finally {
    console.log("DELETE purchase selesai");
  }
};
