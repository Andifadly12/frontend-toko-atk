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

export const getSummaryReport = async () => {
  try {
    const response = await api.get("/report/summary");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan summary");
  }
};

export const getSalesReport = async () => {
  try {
    const response = await api.get("/report/sales");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan penjualan");
  }
};

export const getStockReport = async () => {
  try {
    const response = await api.get("/report/stock");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan stok");
  }
};

export const getStockMovementsReport = async () => {
  try {
    const response = await api.get("/report/stock-movements");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan pergerakan stok");
  }
};
