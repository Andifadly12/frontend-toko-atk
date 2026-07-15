import api from "../services/api";

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
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal mengambil data kategori");
  } finally {
    console.log("GET categories selesai");
  }
};

export const createCategory = async categoryData => {
  try {
    const response = await api.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal menambah kategori");
  } finally {
    console.log("CREATE category selesai");
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal update kategori");
  } finally {
    console.log("UPDATE category selesai");
  }
};

export const deleteCategory = async id => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Gagal hapus kategori");
  } finally {
    console.log("DELETE category selesai");
  }
};
