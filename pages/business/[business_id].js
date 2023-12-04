import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import OneStore from "@/components/GeneralComponent/OneStore";
import { getLayout } from "@/components/Layouts/DashboardLayout";

const SingleBusiness = () => {
  return <OneStore />;
};

export default AuthorizeHOC(SingleBusiness, getLayout);
