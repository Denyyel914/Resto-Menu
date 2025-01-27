import { useEffect, useState } from "react";
import { fetchProducts, createProduct } from "../utils/api";
import { useFavorites } from "../context/FavoriteContext";
import { showToast } from "../components/Toastify";

const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clearFavorites, favoriteData } = useFavorites();

  const ModalOpen = () => setIsModalOpen(true);
  const ModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        setData(products);
        showToast("Data fetched successfully", "success");
      } catch (error) {
        showToast("Failed to fetch data", "error");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleClear = () => {
    if (favoriteData.length > 0) {
      clearFavorites();
      localStorage.removeItem("products");
      showToast("Favorites cleared", "info");
    } else {
      showToast("No favorites to clear", "info");
    }
  };

  const submitForm = async (values) => {
    try {
      setSubmitLoading(true);
      const newProduct = await createProduct(values);
      setData((prev) => [...prev, newProduct]);
      showToast("Product added successfully", "success");
      setIsModalOpen(false);
    } catch {
      showToast("Failed to add product", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    data,
    loading,
    submitLoading,
    isModalOpen,
    ModalOpen,
    ModalClose,
    setIsModalOpen,
    handleClear,
    submitForm,
  };
};

export default useProducts;
