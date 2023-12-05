import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import ViewOneProductComponent from "@/components/Product/ViewOneProductComponent";
import useSetProductInitialValue from "@/components/ReusableHooks/ProductHooks/useSetProductInitialValue";
import { useRouter } from "next/router";

const ViewProductComponent = ({ product_id }) => {
  const { isOneProductDataLoading, initialProductValues } =
    useSetProductInitialValue(product_id);

  const productValues = {
    name: initialProductValues.name,
    in_stock: initialProductValues.in_stock,
    crossed_out_price: initialProductValues.crossed_out_price,
    price: initialProductValues.price,
    descriptionValue: initialProductValues.descriptionValue,
    productImages: initialProductValues.productImages,
    sub_category_id: initialProductValues.selectedSubCategory.id,
  };

  return (
    <div className="mx-auto w-[95%] md:h-[80vh] mt-4">
      {!isOneProductDataLoading && (
        <ViewOneProductComponent product_id={product_id} productValues={productValues} />
      )}
    </div>
  );
};

const ViewProduct = () => {
  const router = useRouter();
  const { product_id } = router.query;

  return <>{product_id && <ViewProductComponent product_id={product_id} />}</>;
};

export default AuthorizeHOC(ViewProduct, getLayout);
