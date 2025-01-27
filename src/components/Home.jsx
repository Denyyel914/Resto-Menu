import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import Modal from "./Modal";
import Input from "./Input";
import { useFavorites } from "../context/FavoriteContext";
import { showToast } from "./Toastify";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clearFavorites, favoriteData, columns } = useFavorites();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      image: "",
    },
  });
  useEffect(() => {
    const getData = async () => {
      const cachedData = localStorage.getItem("products");
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          setLoading(true); // Start loading
          const res = await axios.get("https://fakestoreapi.com/products");

          if (res.status === 200) {
            setData(res.data);
            localStorage.setItem("products", JSON.stringify(res.data));
            showToast("Data fetched successfully", "success");
          } else {
            throw new Error(`Unexpected status code: ${res.status}`);
          }
        } catch (error) {
          console.error(error);
          if (error.response) {
            const status = error.response.status;
            if (status === 404) {
              showToast("Data not found (404)", "warning");
            } else if (status === 500) {
              showToast("Server error (500)", "error");
            } else {
              showToast(`Error: ${error.message}`, "error");
            }
          } else {
            showToast("Network error. Please try again.", "error");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleClear = () => {
    if (favoriteData.length > 0) {
      clearFavorites();
      localStorage.removeItem("products");
      showToast("Favorites cleared", "info");
    } else {
      showToast("There are no favorites at the moment.", "info");
    }
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const submitForm = async (values) => {
    try {
      setSubmitLoading(true);
      const res = await axios.post("https://fakestoreapi.com/products", values);
      console.log("res", res.data);
      if (res.status === 200 || res.status == 201) {
        setData((prev) => [...prev, res.data]);
        showToast("Data posted successfully.", "success");
        closeModal();
        reset();
      }
    } catch {
      showToast("Error.", "danger");
      reset();
      closeModal;
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-3 md:mt-5 lg:mt-8">
        <h3 className="text-3xl mb-4">List of Products</h3>
        <div className="flex gap-4">
          <button
            disabled={loading || data.length === 0}
            className="bg-[#0077D4] text-lg px-2 py-2 cursor-pointer rounded-md text-white hover:opacity-90 focus:outline-none"
            onClick={handleClear}
          >
            Clear favorites
          </button>
          <button
            disabled={loading}
            className="bg-[#0077D4] text-lg px-2 py-2 cursor-pointer rounded-md text-white hover:opacity-90 focus:outline-none"
            onClick={modalOpen}
          >
            Add product
          </button>
        </div>
      </div>

      <Table
        data={data}
        columns={columns}
        loading={loading}
        showFavorites={true}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size="537px"
        title="Add Contact"
        titleCustomClass={"text-2xl"}
      >
        <div className="w-[35vw]">
          <form onSubmit={handleSubmit(submitForm)}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Title"
                  required="true"
                  label="Title"
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <div className="mt-5 flex  gap-3">
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Description"
                    required="true"
                    label="Description"
                    customClassName="w-96"
                    errorMessage={errors.description?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                rules={{ required: "Price is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    customClassName="flex-grow"
                    placeholder="Price"
                    required="true"
                    label="Price"
                    errorMessage={errors.price?.message}
                  />
                )}
              />
            </div>
            <div className="border-2 border-gray-300 rounded-md p-2 mt-5">
              <Controller
                name="image"
                control={control}
                rules={{ required: "Product image is required" }}
                render={({ field }) => (
                  <FilePond
                    credits="false"
                    files={field.value}
                    onupdatefiles={(fileItems) => {
                      field.onChange(
                        fileItems.map((fileItem) => fileItem.file)
                      ); // Pass the file
                    }}
                    allowMultiple={false}
                    maxFiles={3}
                    acceptedFileTypes={["image/*"]}
                    labelIdle='Drag & Drop your product image or <span class="filepond--label-action">Browse</span>'
                  />
                )}
              />
            </div>

            <div className="flex justify-end gap-5 mt-5 mb-4">
              <button
                className="bg-[#0077D4] text-lg px-4  cursor-pointer rounded-md text-white hover:opacity-90 focus:outline-none"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                disabled={submitLoading}
                className="bg-[#0077D4] text-lg px-4 py-2 cursor-pointer rounded-md text-white hover:opacity-90 focus:outline-none"
              >
                {submitLoading && (
                  <span>
                    <Loader2 className="animate-spin text-gray-500" size={40} />
                  </span>
                )}
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
