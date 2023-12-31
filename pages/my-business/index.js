import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import LoadingUICart from "@/components/01Utils/LoadingUICart";
import OneStore from "@/components/GeneralComponent/OneStore";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import usePaginationFunction from "@/components/ReusableHooks/usePaginationFunction";
import { useGetLoggedInSellerQuery } from "@/store/APIs/bussinessApi";
import { useGetASellerProductsQuery } from "@/store/APIs/productApi";

const MyBusiness = () => {
  const {
    data_offset,
    dataToFetchPerRequest,
    dataOffsetDecrementHandler,
    dataOffsetIncrementHandler,
  } = usePaginationFunction();
  const { data: sellerAccountSetupData, isLoading: isSellerAccountSetupDataLoading } =
    useGetLoggedInSellerQuery();
  const { data: sellerProductsData, isLoading: isSellerProductsLoading } =
    useGetASellerProductsQuery(
      {
        data_amount: dataToFetchPerRequest,
        data_offset: data_offset,
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
          paginationButtonID="logged_in_seller"
          dataOffsetIncrementHandler={dataOffsetIncrementHandler}
          dataOffsetDecrementHandler={dataOffsetDecrementHandler}
        />
      )}
      {(isSellerProductsLoading || isSellerAccountSetupDataLoading) && <LoadingUICart />}
    </div>
  );
};

export default AuthorizeHOC(MyBusiness, getLayout);
