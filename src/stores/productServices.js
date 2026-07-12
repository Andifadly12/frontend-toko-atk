import api from "../config/api";

export const getProduct = async productData => {
  const response = await api.get("/products", productData);
  return response.data;
};
