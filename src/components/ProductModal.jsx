import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);

const ProductForm = ({ onSubmit, onClose, submitLoading, modalOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", description: "", price: "", image: "" },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onClose={handleClose}
      size="537px"
      title="Add Contact"
      titleCustomClass={"text-2xl"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-[35vw]">
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Title"
              required="true"
              errorMessage={errors.title?.message}
            />
          )}
        />

        <div className="mt-5 flex gap-3">
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <Input
                {...field}
                label="Description"
                customClassName="w-96"
                required="true"
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
                label="Price"
                required="true"
                customClassName="flex-grow"
                errorMessage={errors.price?.message}
              />
            )}
          />
        </div>

        <div className="mt-5 border-2 p-3 rounded-md border-gray-300">
          <Controller
            name="image"
            control={control}
            rules={{ required: "Product image is required" }}
            render={({ field }) => (
              <FilePond
                credits="false"
                files={field.value}
                onupdatefiles={(fileItems) =>
                  field.onChange(fileItems.map((fileItem) => fileItem.file))
                }
                allowMultiple={false}
                acceptedFileTypes={["image/*"]}
                labelIdle='Drag & Drop your product image or <span class="filepond--label-action">Browse</span>'
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-5 mt-5 mb-4">
          <Button onClick={handleClose} label="Close" />
          <Button
            disabled={submitLoading}
            label={submitLoading ? "Submitting..." : "Submit"}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;
