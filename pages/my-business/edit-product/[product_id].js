import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import ProductFormAndPreviewTab from "@/components/Product/ProductFormAndPreviewTab";
import useSetProductInitialValue from "@/components/ReusableHooks/ProductHooks/useSetProductInitialValue";
import { useRouter } from "next/router";
import { AiFillQuestionCircle } from "react-icons/ai";

const ProductEditor = ({ product_id }) => {
  const { isOneProductDataLoading, initialProductValues } =
    useSetProductInitialValue(product_id);

  return (
    <div className="flex flex-col p-4 lg:px-8 py-4  h-full">
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
      {!isOneProductDataLoading && (
        <ProductFormAndPreviewTab
          initialProductValues={initialProductValues}
          newProductValue={false}
          formId="edit-product"
          product_id={product_id}
        />
      )}
    </div>
  );
};

const EditProduct = () => {
  const router = useRouter();
  const { product_id } = router.query;

  return <>{product_id && <ProductEditor product_id={product_id} />}</>;
};

export default AuthorizeHOC(EditProduct, getLayout);
