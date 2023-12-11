import CustomToast from "@/components/01Utils/CustomToast";
import { MyDialog, MyListbox, MyToggle } from "@/components/01Utils/HeadlessUI";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AiFillDelete, AiFillInfoCircle } from "react-icons/ai";
import { GoImage } from "react-icons/go";
import "react-quill/dist/quill.snow.css";

const ProductForm = ({
  formId,
  formik,
  productValues,
  handleImageChange,
  onChangeBargain,
  onChangeCategory,
  onChangeSubCategory,
  handleImageDelete,
  onChangeDescription,
  subCategoryOption,
  isSubCategoriesDataLoading,
  isSubCategoriesSorting,
  categoryOption,
  isCategoriesDataLoading,
  isCategoriesSorting,
  categoryError,
  descriptionError,
  isCreatingNewProduct,
}) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const [isProductImagesModalOpen, setIsProductImagesModalOpen] = useState(false);
  const router = useRouter();
  const openPictureModal = () => setIsProductImagesModalOpen(true);
  const closePictureModal = () => setIsProductImagesModalOpen(false);

  return (
    <form
      id={formId}
      onSubmit={formik.handleSubmit}
      className="mt-4 w-full grid md:grid-cols-2 gap-x-4 md:gap-x-6 lg:gap-x-10"
    >
      {/* ADD THE DIV HERE */}
      <div className="flex flex-col w-full">
        <div>
          <label htmlFor="name" className="label_style">
            Product Name
          </label>
          <input
            name="name"
            className="input_style"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <div className="form_error">
            {formik?.touched?.name && formik?.errors?.name ? formik?.errors?.name : ""}
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-4 w-full mb-2">
          {/* ======================Category Option========================= */}
          <div className="flex space-y-0 flex-col w-full md:mr-2">
            <label htmlFor="category" className="flex-row items-center space-x-2 label_style">
              <span>Category</span>
              <AiFillInfoCircle className="text-secondary-400 text-base " />
            </label>
            {!isCategoriesSorting &&
              !isCategoriesDataLoading &&
              categoryOption?.length > 0 && (
                <MyListbox
                  options={categoryOption}
                  selected={productValues?.selectedCategory}
                  getSelectedData={onChangeCategory}
                />
              )}

            {(isCategoriesSorting || isCategoriesDataLoading) && (
              <div className=" flex justify-between border-primary-200 h-10 items-center border-2 rounded-md pl-3 pr-1 py-2 w-full">
                <p className="flex truncate cursor-pointer text-sm font-semibold text-primary-500">
                  Fetching Categories...
                </p>
              </div>
            )}
            {!isCategoriesSorting &&
              !isCategoriesDataLoading &&
              categoryOption?.length < 1 && (
                <div className=" flex justify-between border-primary-200 h-10 items-center border-2 rounded-md pl-3 pr-1 py-2 w-full">
                  <p className="flex truncate cursor-pointer text-sm font-semibold text-primary-500">
                    No category.
                  </p>
                </div>
              )}

            <div className="text-sm mb-2 h-3 text-rose-600  font-medium">{categoryError}</div>
          </div>
          {/* ============================================================ */}
          {/* ======================Sub-Category Option=================== */}
          <div className="flex space-y-0 flex-col w-full md:ml-2">
            <label htmlFor="category" className="flex-row items-center space-x-2 label_style">
              <span>Sub Category</span>
            </label>
            {!isSubCategoriesSorting &&
              !isSubCategoriesDataLoading &&
              subCategoryOption?.length > 0 &&
              productValues?.selectedCategory?.value && (
                <>
                  <MyListbox
                    options={subCategoryOption}
                    selected={productValues?.selectedSubCategory}
                    getSelectedData={onChangeSubCategory}
                  />
                </>
              )}
            {!productValues?.selectedCategory?.value && (
              <div className=" flex justify-between border-primary-200 h-10 items-center border-2 rounded-md pl-3 py-2 w-full">
                <p className="flex truncate cursor-pointer text-sm font-semibold text-primary-500">
                  A category must be selected
                </p>
              </div>
            )}

            {(isSubCategoriesSorting || isSubCategoriesDataLoading) &&
              productValues?.selectedCategory?.value && (
                <div className=" flex justify-between border-primary-200 h-10 items-center border-2 rounded-md pl-3 py-2 w-full">
                  <p className="flex truncate cursor-pointer text-sm font-semibold text-primary-500">
                    Fetching Sub-Categories...
                  </p>
                </div>
              )}

            {productValues?.selectedCategory?.value &&
              !isSubCategoriesSorting &&
              !isSubCategoriesDataLoading &&
              subCategoryOption?.length < 1 && (
                <div className=" flex justify-between border-primary-200 h-10 items-center border-2 rounded-md pl-3 pr-1 py-2 w-full">
                  <p className="flex truncate cursor-pointer text-sm font-semibold text-primary-500">
                    No sub-category.
                  </p>
                </div>
              )}
          </div>
          <div className="form_error"></div>

          {/* ============================================================ */}
        </div>

        <div className="flex md:flex-row flex-col md:gap-x-4 md:gap-y-0 gap-y-4 w-full mb-2 items-baseline">
          <div className="w-full flex flex-col">
            <label htmlFor="in_stock" className="label_style">
              In Stock (Optional)
            </label>
            <input
              type="number"
              name="in_stock"
              className="input_style"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.in_stock}
            />
            <div className="form_error">
              {formik?.touched?.in_stock && formik?.errors?.in_stock
                ? formik?.errors?.in_stock
                : ""}
            </div>
          </div>

          <div className="flex w-full">
            <MyToggle
              label="Allow Offers"
              enabled={productValues?.selectedBargain}
              getSelectedData={onChangeBargain}
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <label htmlFor="description" className="label_style">
            Description
          </label>
          <ReactQuill
            theme="snow"
            name="description"
            className=" bg-inherit text-sm text-secondary-500"
            value={productValues?.descriptionValue}
            onChange={(value) => onChangeDescription(value)}
          />
        </div>
        <div className="form_error">{descriptionError}</div>
      </div>

      <div className="flex flex-col space-y-3 h-full">
        <div className="font-semibold flex text-sm items-center space-x-2">
          <span className="label_style">Product Images</span>
          <AiFillInfoCircle className="text-secondary-400 text-base" />
        </div>
        <div className="flex flex-row space-x-4">
          {productValues?.productImages?.length > 0 && (
            <>
              <div onClick={openPictureModal} className="relative h-40 w-40 rounded-md">
                <div className="absolute bg-black opacity-50 inset-0 z-10 rounded-md"></div>
                <p className="font-bold text-6xl absolute z-20 text-white h-fit w-fit inset-0 m-auto">
                  {productValues?.productImages?.length}
                </p>
                <Image
                  src={
                    productValues?.productImages[productValues?.productImages.length - 1]
                      .imageURL
                  } // Turn the last image to valid url
                  alt="product"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              <MyDialog
                isModalOpen={isProductImagesModalOpen}
                closeModal={closePictureModal}
                dialogTitle="Product Images"
              >
                <div className=" flex-col overflow-y-auto w-11/12 mx-auto grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] my-4  gap-2.5 md:gap-3">
                  {productValues?.productImages.map((image) => (
                    <div key={image.id} className="relative h-28 w-28 rounded-md">
                      <div
                        onClick={() => handleImageDelete(image.id)} // Update onClick to call handleImageDelete
                        className="cursor-pointer bg-black bg-opacity-50 h-fit w-fit p-1.5 absolute z-10 rounded-full m-1.5 right-0"
                      >
                        <AiFillDelete className="text-white text-lg" />
                      </div>
                      <Image
                        onClick={() => console.log("Hello")}
                        src={image.imageURL}
                        alt={`Product Image ${image.id}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </MyDialog>
            </>
          )}
          {productValues?.productImages?.length < 1 && (
            <div className="relative bg-primary-100 h-40 w-40 rounded-md flex">
              <p className="inset-0 m-auto font-semibold text-secondary-400">No Image!</p>
            </div>
          )}

          <div className="border-dashed relative border-2 rounded-md border-secondary-400 h-40 w-40 text-center items-center text-sm text-secondary-400 font-semibold px-2 flex">
            <div className="flex flex-col w-full">
              <GoImage className="text-4xl mx-auto" />
              <div className="tracking-tight font-semibold">
                <span className="tracking-tight cursor-pointer text-primary-500">
                  Click to browse
                </span>
              </div>
            </div>
            <input
              className="absolute inset-0 w-full h-full opacity-0"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
        </div>
        <p className="my-4 font-semibold text-sm text-secondary-500">
          You need to add at least 3 images.
        </p>

        <div className="flex md:flex-row flex-col md:gap-x-4 md:gap-y-0 gap-y-4 w-full mb-2">
          <div className="relative w-full">
            <span className="absolute top-[2.40rem] md:top-[2.25rem] left-3 text-secondary-500 font-semibold">
              ₦
            </span>
            <label htmlFor="price" className="label_style">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="input_style !px-6"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            <div className="form_error">
              {formik?.touched?.price && formik?.errors?.price ? formik?.errors?.price : ""}
            </div>
          </div>
          <div className="relative w-full h-fit">
            <label htmlFor="crossed_out_price" className="label_style truncate">
              Crossed Out Price (Optional)
            </label>
            <span className="absolute top-[2.40rem] md:top-[2.25rem] left-3 text-secondary-500 font-semibold">
              ₦
            </span>
            <input
              type="number"
              name="crossed_out_price"
              className="input_style !px-6"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.crossed_out_price}
            />
          </div>
          <div className="form_error">
            {formik?.touched?.crossed_out_price && formik?.errors?.crossed_out_price
              ? formik?.errors?.crossed_out_price
              : ""}
          </div>
        </div>

        <div className="flex w-full justify-between ">
          <button
            type="submit"
            disabled={isCreatingNewProduct}
            className={`${
              isCreatingNewProduct ? "bg-primary-400" : "bg-primary-800"
            }  text-white w-36 lg:w-40 shadow-sm px-2 text-center py-2 rounded-button font-semibold text-sm `}
          >
            {router.pathname.includes("/new-product") ? "Save Product" : "Update Product"}
          </button>
          <button className="border-primary-800 text-primary-800 w-36  border-2   shadow-sm  px-6 lg:px-10 py-2 rounded-button font-semibold text-sm ">
            Cancel
          </button>
        </div>
      </div>
      <CustomToast />
    </form>
  );
};

export default ProductForm;
