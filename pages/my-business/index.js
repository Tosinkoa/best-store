import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import OneStore from "@/components/GeneralComponent/OneStore";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import { useGetASellerProductsQuery } from "@/store/APIs/productApi";

const MyBusiness = () => {
  const { data: sellerProductsData, isLoading: isSellerProductsDataLoading } =
    useGetASellerProductsQuery();

  return (
    <div className="relative">
      <OneStore isLoggedInSellerProduct={true} />
    </div>
  );
};

export default AuthorizeHOC(MyBusiness, getLayout);
