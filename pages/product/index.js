import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import LoadingUICart from "@/components/01Utils/LoadingUICart";
import PaginationButtons from "@/components/01Utils/PaginationButtons";
import ProductList from "@/components/GeneralComponent/ProductList";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import usePaginationFunction from "@/components/ReusableHooks/usePaginationFunction";
import { useGetAllProductsQuery } from "@/store/APIs/productApi";
import { useState } from "react";

const Product = () => {
  const {
    data_offset,
    dataToFetchPerRequest,
    dataOffsetDecrementHandler,
    dataOffsetIncrementHandler,
  } = usePaginationFunction();

  const { data: allProductData, isLoading: isAllProductDataLoading } = useGetAllProductsQuery(
    {
      data_amount: dataToFetchPerRequest,
      data_offset,
    },
    { refetchOnMountOrArgChange: dataToFetchPerRequest }
  );

  console.log(" allProductData?.data?.length:", allProductData?.data?.length);

  return (
    <div>
      {isAllProductDataLoading && <LoadingUICart />}
      {!isAllProductDataLoading && allProductData?.data?.length > 0 && (
        <>
          <ProductList productData={allProductData} />
          <PaginationButtons
            paginationButtonID="sellers"
            dataOffsetDecrementHandler={dataOffsetDecrementHandler}
            dataOffsetIncrementHandler={dataOffsetIncrementHandler}
          />
        </>
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
