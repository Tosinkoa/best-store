import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import LoadingUICart from "@/components/01Utils/LoadingUICart";
import ProductList from "@/components/GeneralComponent/ProductList";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import { useGetAllProductsQuery } from "@/store/APIs/productApi";
import { useState } from "react";

const Product = () => {
  const [dataAmountToFetch, setDataAmountToFetch] = useState(50);
  const [dataAmountToOffset, setDataAmountToOffset] = useState(0);

  const { data: allProductData, isLoading: isAllProductDataLoading } = useGetAllProductsQuery({
    data_amount: dataAmountToFetch,
    data_offset: dataAmountToOffset,
  });

  return (
    <div>
      {isAllProductDataLoading && <LoadingUICart />}
      {!isAllProductDataLoading && allProductData?.data?.length > 0 && (
        <ProductList productData={allProductData} />
      )}
      {!isAllProductDataLoading &&
        (allProductData?.data?.length < 1 || !allProductData?.data) && (
          <p>No product found!</p>
        )}
    </div>
  );
};

Product.getLayout = getLayout;
export default Product;
