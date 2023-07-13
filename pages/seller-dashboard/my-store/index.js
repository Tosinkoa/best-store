import OneStore from "@/components/GeneralComponent/OneStore";
import { getLayout } from "@/components/Layouts/SellerDashboardLayout";
import { FaTools } from "react-icons/fa";

const MyStore = () => {
  return (
    <div className="relative">
      <OneStore showSetupButton={true} storeOwner />
    </div>
  );
};

MyStore.getLayout = getLayout;
export default MyStore;
