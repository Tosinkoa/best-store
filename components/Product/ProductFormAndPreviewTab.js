import { Tab } from "@headlessui/react";
import ProductForm from "./ProductForm";
import ViewOneProductComponent from "./ViewOneProductComponent";
import { useEffect, useRef, useState } from "react";
import useGetSubCategories from "../ReusableHooks/useGetSubCategories";
import useGetCategories from "../ReusableHooks/useGetCategories";
import { MdOutlineEventNote } from "react-icons/md";
import { useFormik } from "formik";
import { useCreateNewProductMutation, useEditProductMutation } from "@/store/APIs/productApi";
import { productFormValidator } from "../01Utils/Validators/productFormValidator";
import { toast } from "react-toastify";
import CustomToast from "../01Utils/CustomToast";
import { useRouter } from "next/router";
import { ErrorGetter } from "../01Utils/ErrorGetter";

/**
 * @Checkpoint Rework formik validation
 */
const toastSettings = {
  position: "top-right",
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  isLoading: false,
};
const classNames = (...classes) => classes.filter(Boolean).join(" ");

//--- ProductFormAndPreviewTab
const ProductFormAndPreviewTab = ({
  initialProductValues,
  formId,
  product_id,
  newProductValue = true,
}) => {
  const router = useRouter();
  /**@Note Initial Product Field Values */
  const [productValues, setProductValues] = useState({
    name: initialProductValues.name,
    in_stock: initialProductValues.in_stock,
    crossed_out_price: initialProductValues.crossed_out_price,
    price: initialProductValues.price,
    descriptionValue: initialProductValues.descriptionValue,
    selectedBargain: initialProductValues.selectedBargain,
    selectedCategory: initialProductValues.selectedCategory,
    selectedSubCategory: initialProductValues.selectedSubCategory,
    productImages: initialProductValues.productImages,
  });

  const { categoryOption, isCategoriesDataLoading, isCategoriesSorting } = useGetCategories();
  const { subCategoryOption, isSubCategoriesDataLoading, isSubCategoriesSorting } =
    useGetSubCategories(productValues.selectedCategory.id);

  /**
   * @Note Set Inital Category and SubCategory values to the first option in the data array if user is creating a new product
   * If user is editing product, set the initial value to what we recieved from database
   * First option for category --> "-- Select Category --"
   * First option for sub ategory --> "-- Select Sub-Category --"
   */
  useEffect(() => {
    if (categoryOption?.length > 0) {
      setProductValues((prevValues) => ({
        ...prevValues,
        selectedCategory: newProductValue
          ? categoryOption[0]
          : initialProductValues?.selectedCategory,
      }));
    }
  }, [categoryOption]);

  useEffect(() => {
    if (subCategoryOption?.length > 0) {
      setProductValues((prevValues) => ({
        ...prevValues,
        selectedSubCategory: newProductValue
          ? subCategoryOption[0]
          : initialProductValues?.selectedSubCategory,
      }));
    }
  }, [subCategoryOption]);

  const productToastID = useRef(null);
  const [categoryError, setCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [createNewProduct, { isLoading: isCreatingNewProduct, data: newProductData }] =
    useCreateNewProductMutation();
  const [editProduct, { isLoading: isEditingProduct, data: editProductData }] =
    useEditProductMutation();

  /**@Note Save product values by making a request to the server */
  const addNewProductHandler = async () => {
    if (!productValues?.selectedCategory?.value)
      return setCategoryError("Cartegory is required");
    if (productValues?.descriptionValue.length > 3000)
      return setDescriptionError("Description is to long");
    if (productValues?.productImages.length < 3)
      return toast.warning("Min of 3 images is required.", { isLoading: false });
    if (productValues?.productImages.length > 8)
      return toast.warning("Product images cannot be more than 8.", { isLoading: false });

    const formData = new FormData();
    formData.append("name", productValues.name);
    formData.append("in_stock", productValues.in_stock || 0);
    formData.append("crossed_out_price", productValues.crossed_out_price);
    formData.append("price", productValues.price);
    formData.append("description", productValues.descriptionValue);
    formData.append("bargain", productValues.selectedBargain);
    formData.append("category_id", productValues.selectedCategory.id);
    formData.append("sub_category_id", productValues.selectedSubCategory.id);
    productValues?.productImages.map((eachImageData) =>
      formData.append("product_image", eachImageData.imageFile)
    );

    const body = formData;
    const result = await createNewProduct(body);
    // Show result error if there is any
    if (result.error) {
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);

      toast.update(productToastID.current, {
        render: ErrorGetter(errorResult),
        type: "error",
        ...toastSettings,
      });
    } else {
      // Display a successful message if the request was successful!
      toast.update(productToastID.current, {
        render: result?.data?.message,
        type: "success",
        ...toastSettings,
      });
      setTimeout(() => {
        router.push("/my-business");
      }, 1000);
    }
  };

  const editProductHandler = async () => {
    const formData = new FormData();
    if (productValues.name) formData.append("name", productValues.name);
    if (productValues.in_stock) formData.append("in_stock", productValues.in_stock);
    if (productValues.crossed_out_price)
      formData.append("crossed_out_price", productValues.crossed_out_price);
    if (productValues.price) formData.append("price", productValues.price);
    if (productValues.descriptionValue)
      formData.append("description", productValues.descriptionValue);
    if (productValues.selectedBargain)
      formData.append("bargain", productValues.selectedBargain);
    if (productValues.selectedCategory.id)
      formData.append("category_id", productValues.selectedCategory.id);
    if (productValues.selectedSubCategory.id)
      formData.append("sub_category_id", productValues.selectedSubCategory.id);
    if (productValues?.productImages?.length > 1) {
      const allNewImages = productValues?.productImages?.filter(
        (eachImage) => eachImage.image_key === null
      );

      allNewImages?.map((eachImageData) =>
        formData.append("product_image", eachImageData.imageFile)
      );
    }

    const body = formData;
    const result = await editProduct({ body, product_id });
    if (result.error) {
      // Show result error if there is any
      const { error } = result.error.data;
      const errorResult = ErrorGetter(error);

      toast.update(productToastID.current, {
        render: ErrorGetter(errorResult),
        type: "error",
        ...toastSettings,
      });
    } else {
      // Display a successful message if the request was successful!
      toast.update(productToastID.current, {
        render: result?.data?.message,
        type: "success",
        ...toastSettings,
      });
      setTimeout(() => {
        router.push("/my-business");
      }, 1000);
    }
  };

  useEffect(() => {
    if (productValues?.selectedCategory?.value) setCategoryError("");
  }, [productValues?.selectedCategory]);

  // --- Show toast when saving product
  useEffect(() => {
    if (isCreatingNewProduct) productToastID.current = toast.loading("Saving product...");
    if (isEditingProduct) productToastID.current = toast.loading("Updating product...");
  }, [isCreatingNewProduct, isEditingProduct]);

  /**@Note Set all product values accordinly */
  const updateProductField = (fieldName, value) => {
    setProductValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const onChangeBargain = (value) => {
    updateProductField("selectedBargain", value);
  };

  const onChangeCategory = (value) => {
    updateProductField("selectedCategory", value);
  };

  const onChangeSubCategory = (value) => {
    updateProductField("selectedSubCategory", value);
  };

  const onChangeDescription = (value) => {
    updateProductField("descriptionValue", value);
  };

  // ---- onChange handler for product images
  const handleImageChange = async (event) => {
    let newProductImages = [];
    await Promise.all(
      [...event.target.files].map((fileData) => {
        const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
        // ---- image_key will be present for newly added images, this will helps with knowing if the
        // ---- image in the array is new.
        newProductImages.push({
          id: uniqueId,
          image_key: null,
          imageFile: fileData,
          imageURL: URL.createObjectURL(fileData),
        });
      })
    );

    setProductValues((prevProductValues) => ({
      ...prevProductValues,
      productImages: [...prevProductValues.productImages, ...newProductImages],
    }));
  };

  /**@Note Remove product image */
  const handleImageDelete = (incomingImageID) => {
    const updatedImages = productValues.productImages.filter(
      (image) => image.id !== incomingImageID
    );
    setProductValues((prevValues) => ({
      ...prevValues,
      productImages: updatedImages,
    }));
  };

  /**@Note formik function */
  const formik = useFormik({
    initialValues: {
      name: productValues.name,
      in_stock: productValues.in_stock,
      crossed_out_price: productValues.crossed_out_price,
      price: productValues.price,
    },
    onSubmit: newProductValue ? addNewProductHandler : editProductHandler,
    validationSchema: newProductValue ? productFormValidator : false,
  });

  /**@Note Update productValues for formik value changes */

  const formikValues = formik.values;
  useEffect(() => {
    const { name, in_stock, crossed_out_price, price } = formik.values;
    updateProductField("name", name);
    updateProductField("in_stock", in_stock);
    updateProductField("crossed_out_price", crossed_out_price);
    updateProductField("price", price);
  }, [formikValues]);

  return (
    <>
      <Tab.Group as="div" className="flex flex-col w-full my-4 mb-0">
        <Tab.List className="border-b w-full flex space-x-6">
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 text-sm font-semibold outline-none",
                selected
                  ? "border-primary-800 text-primary-800  border-b-2"
                  : "text-secondary-500"
              )
            }
          >
            Product Setup
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "py-2 text-sm font-semibold flex space-x-1 items-center outline-none",
                selected
                  ? "border-primary-800 text-primary-800  border-b-2"
                  : "text-secondary-500"
              )
            }
          >
            <MdOutlineEventNote />
            <span>Preview</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ProductForm
              formId={formId}
              productValues={productValues}
              handleImageChange={handleImageChange}
              onChangeBargain={onChangeBargain}
              onChangeCategory={onChangeCategory}
              onChangeSubCategory={onChangeSubCategory}
              handleImageDelete={handleImageDelete}
              onChangeDescription={onChangeDescription}
              categoryOption={categoryOption}
              isCategoriesDataLoading={isCategoriesDataLoading}
              isCategoriesSorting={isCategoriesSorting}
              subCategoryOption={subCategoryOption}
              isSubCategoriesDataLoading={isSubCategoriesDataLoading}
              isSubCategoriesSorting={isSubCategoriesSorting}
              formik={formik}
              categoryError={categoryError}
              descriptionError={descriptionError}
              isCreatingNewProduct={isCreatingNewProduct}
            />
          </Tab.Panel>
          <Tab.Panel className="md:h-fit w-full flex mt-4">
            <ViewOneProductComponent
              productValues={productValues}
              isProductModiification={true}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <CustomToast />
    </>
  );
};

export default ProductFormAndPreviewTab;
