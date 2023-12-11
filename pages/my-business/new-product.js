import { getLayout } from "@/components/Layouts/DashboardLayout";
import ProductFormAndPreviewTab from "@/components/PagesComponent/Product/ProductFormAndPreviewTab";
import { AiFillQuestionCircle } from "react-icons/ai";

/**
 * @todo Make colors gradient
 * @todo Add License, change MIT
 */

const NewProduct = () => {
  const initialProductValues = {
    name: "",
    in_stock: "",
    crossed_out_price: "",
    price: "",
    descriptionValue: "",
    selectedBargain: false,
    selectedCategory: {},
    selectedSubCategory: {},
    productImages: [],
  };

  return (
    <div className="flex flex-col lg:px-8 h-full">
      <div className="justify-between w-full flex">
        <div className="font-semibold flex text-lg items-center space-x-2">
          <span className="text-primary-800">New Product</span>
          <AiFillQuestionCircle className="text-secondary-400" />
        </div>
        <button className="hover:text-primary-800 hover:border-primary-800 focus:text-primary-800 focus:border-primary-800 text-secondary-500 border-secondary-400 shadow-sm border px-4 py-1 rounded-button font-semibold text-sm ">
          Go back
        </button>
      </div>
      <p className="my-4 font-semibold text-sm text-secondary-500 md:w-[75%] w-full">
        The most important feature in the product editing section is the product adding part.
        When adding products here, do not ignore to fill in all the required fields completely
        and follow the product adding rules
      </p>

      <ProductFormAndPreviewTab
        initialProductValues={initialProductValues}
        formId="new-product"
      />
    </div>
  );
};

NewProduct.getLayout = getLayout;
export default NewProduct;
