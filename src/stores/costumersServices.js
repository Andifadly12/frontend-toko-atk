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

export const getCustomers = async () => {
  try {
    const response = await api.get("/customers");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data customer");
  } finally {
    console.log("GET customers selesai");
  }
};

export const createCustomer = async customerData => {
  try {
    const response = await api.post("/customers", customerData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal menambah customer");
  } finally {
    console.log("CREATE customer selesai");
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await api.put(`/customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal update customer");
  } finally {
    console.log("UPDATE customer selesai");
  }
};

export const deleteCustomer = async id => {
  try {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal hapus customer");
  } finally {
    console.log("DELETE customer selesai");
  }
};
