import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import TableComponent from "@/components/03Helper/TableComponent";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import { SaleHistoryColumn } from "@/components/SaleHistory/SaleHistoryColumn";

const SaleHistory = () => {
  return (
    <div className="md:w-11/12 w-[96%] md:my-4 my-2 mx-auto relative">
      <TableComponent column={SaleHistoryColumn} data={[{ product: "ipad" }]} />
    </div>
  );
};

export default AuthorizeHOC(SaleHistory, getLayout);
