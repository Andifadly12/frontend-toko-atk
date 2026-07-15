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

export const getSales = async () => {
  try {
    const response = await api.get("/sales");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data penjualan");
  } finally {
    console.log("GET sales selesai");
  }
};

export const getSaleById = async id => {
  try {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil detail penjualan");
  } finally {
    console.log("GET sale detail selesai");
  }
};

export const createSale = async saleData => {
  try {
    const response = await api.post("/sales", saleData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal menambah transaksi penjualan");
  } finally {
    console.log("CREATE sale selesai");
  }
};

export const updateSale = async (id, saleData) => {
  try {
    const response = await api.put(`/sales/${id}`, saleData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal update penjualan");
  } finally {
    console.log("UPDATE sale selesai");
  }
};

export const deleteSale = async id => {
  try {
    const response = await api.delete(`/sales/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal hapus penjualan");
  } finally {
    console.log("DELETE sale selesai");
  }
};
