import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import TableComponent from "@/components/03Helper/TableComponent";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import { SaleHistoryColumn } from "@/components/PagesComponent/SaleHistory/SaleHistoryColumn";

const SaleHistory = () => {
  return (
    <div className="w-[96%] mx-auto relative">
      <TableComponent column={SaleHistoryColumn} data={[{ product: "ipad" }]} />
    </div>
  );
};

export default AuthorizeHOC(SaleHistory, getLayout);
