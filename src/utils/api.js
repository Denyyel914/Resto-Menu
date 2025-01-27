import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async () => {
  const cachedData = localStorage.getItem("products");
  if (cachedData) return JSON.parse(cachedData);

  const res = await axios.get(API_URL);
  if (res.status === 200) {
    localStorage.setItem("products", JSON.stringify(res.data));
    return res.data;
  }
  throw new Error(`Unexpected status code: ${res.status}`);
};

export const createProduct = async (productData) => {
  const res = await axios.post(API_URL, productData);
  if (res.status === 200 || res.status === 201) return res.data;
  throw new Error("Failed to create product");
};
