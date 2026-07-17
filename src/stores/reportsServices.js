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

export const getDashboardReport = async () => {
  try {
    const response = await api.get("/reports/dashboard");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan dashboard");
  }
};

export const getSalesReport = async (params = {}) => {
  try {
    const response = await api.get("/reports/sales", {
      params,
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan penjualan");
  }
};

export const getStockReport = async () => {
  try {
    const response = await api.get("/reports/stock");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan stok");
  }
};

export const getLowStockReport = async () => {
  try {
    const response = await api.get("/reports/low-stock");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan stok menipis");
  }
};

export const getBestSellingProductsReport = async (params = {}) => {
  try {
    const response = await api.get("/reports/best-selling-products", {
      params,
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan produk terlaris");
  }
};

export const getProfitReport = async (params = {}) => {
  try {
    const response = await api.get("/reports/profit", {
      params,
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil laporan keuntungan");
  }
};
