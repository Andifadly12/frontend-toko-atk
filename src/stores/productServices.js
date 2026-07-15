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

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data produk");
  } finally {
    console.log("GET products selesai");
  }
};

export const createProduct = async productData => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal menambah produk");
  } finally {
    console.log("CREATE product selesai");
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal update produk");
  } finally {
    console.log("UPDATE product selesai");
  }
};

export const deleteProduct = async id => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal hapus produk");
  } finally {
    console.log("DELETE product selesai");
  }
};
