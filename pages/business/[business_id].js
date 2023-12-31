import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import LoadingUICart from "@/components/01Utils/LoadingUICart";
import OneStore from "@/components/GeneralComponent/OneStore";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import usePaginationFunction from "@/components/ReusableHooks/usePaginationFunction";
import { useGetASellerQuery } from "@/store/APIs/bussinessApi";
import {
  useGetASellerProductsQuery,
  useGetProductsBySellerIdQuery,
} from "@/store/APIs/productApi";
import { useRouter } from "next/router";
import { useState } from "react";

const SingleBusinessComp = ({ seller_id }) => {
  const {
    data_offset,
    dataToFetchPerRequest,
    dataOffsetDecrementHandler,
    dataOffsetIncrementHandler,
  } = usePaginationFunction();
  const { data: sellerAccountSetupData, isLoading: isSellerAccountSetupDataLoading } =
    useGetASellerQuery(seller_id);
  const { data: sellerProductsData, isLoading: isSellerProductsLoading } =
    useGetProductsBySellerIdQuery(
      {
        seller_id,
        data_amount: dataToFetchPerRequest,
        data_offset,
      },
      { refetchOnMountOrArgChange: data_offset }
    );

  return (
    <div className="relative">
      {!isSellerProductsLoading && !isSellerAccountSetupDataLoading && (
        <OneStore
          showEditProductButton={true}
          sellerAccountSetupData={sellerAccountSetupData}
          sellerProductsData={sellerProductsData}
          paginationButtonID="random_seller"
          dataOffsetIncrementHandler={dataOffsetIncrementHandler}
          dataOffsetDecrementHandler={dataOffsetDecrementHandler}
          dataToFetchPerRequest
        />
      )}
      {(isSellerProductsLoading || isSellerAccountSetupDataLoading) && <LoadingUICart />}
    </div>
  );
};

const SingleBusiness = () => {
  const router = useRouter();
  const { business_id } = router.query;

  return <>{business_id && <SingleBusinessComp seller_id={business_id} />}</>;
};

export default AuthorizeHOC(SingleBusiness, getLayout);
