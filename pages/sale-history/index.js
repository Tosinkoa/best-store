import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import TableComponent from "@/components/01Utils/TableComponent";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import { SaleHistoryColumn } from "@/components/PagesComponent/SaleHistory/SaleHistoryColumn";

const SaleHistory = () => {
  return (
    <div className="w-full mx-auto relative">
      <TableComponent column={SaleHistoryColumn} data={[{ product: "ipad" }]} />
    </div>
  );
};

export default AuthorizeHOC(SaleHistory, getLayout);
