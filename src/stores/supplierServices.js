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

export const getSuppliers = async () => {
  try {
    const response = await api.get("/suppliers");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data supplier");
  } finally {
    console.log("GET suppliers selesai");
  }
};

export const createSupplier = async supplierData => {
  try {
    const response = await api.post("/suppliers", supplierData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal menambah supplier");
  } finally {
    console.log("CREATE supplier selesai");
  }
};

export const updateSupplier = async (id, supplierData) => {
  try {
    const response = await api.put(`/suppliers/${id}`, supplierData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal update supplier");
  } finally {
    console.log("UPDATE supplier selesai");
  }
};

export const deleteSupplier = async id => {
  try {
    const response = await api.delete(`/suppliers/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal hapus supplier");
  } finally {
    console.log("DELETE supplier selesai");
  }
};
