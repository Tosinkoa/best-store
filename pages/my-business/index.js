import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import OneStore from "@/components/GeneralComponent/OneStore";
import { getLayout } from "@/components/Layouts/DashboardLayout";

const MyBusiness = () => {
  return (
    <div className="relative">
      <OneStore showEditProductButton={true} />
    </div>
  );
};

export default AuthorizeHOC(MyBusiness, getLayout);
