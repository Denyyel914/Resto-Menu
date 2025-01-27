import Table from "../components/Table";
import ProductForm from "../components/ProductModal";
import Button from "../components/Button";
import { useFavorites } from "../context/FavoriteContext";
import useProducts from "../hooks/useProduct";

const Home = () => {
  const { columns } = useFavorites();
  const {
    data,
    loading,
    submitLoading,
    handleClear,
    submitForm,
    isModalOpen,
    ModalOpen,
    ModalClose,
  } = useProducts();

  return (
    <div>
      <div className="flex justify-between items-center mt-3 md:mt-5 lg:mt-8">
        <h3 className="text-3xl mb-4">List of Products</h3>
        <div className="flex gap-4">
          <Button
            disabled={loading}
            onClick={handleClear}
            label="Clear Favorites"
          />

          <Button disabled={loading} onClick={ModalOpen} label="Add Product" />
        </div>
      </div>

      <Table
        data={data}
        columns={columns}
        loading={loading}
        showFavorites={true}
      />

      <ProductForm
        onSubmit={submitForm}
        submitLoading={submitLoading}
        modalOpen={isModalOpen}
        onClose={ModalClose}
        close
      />
    </div>
  );
};

export default Home;
