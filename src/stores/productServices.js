import api from "../config/api";

const getProducts = async () => {
  try {
    const response = await api.get("/products");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Gagal mengambil produk:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

export default getProducts;
