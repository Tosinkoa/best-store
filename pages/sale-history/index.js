import TableComponent from "@/components/Helper/TableComponent";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import { SaleHistoryColumn } from "@/components/SellerComponent/SaleHistory/SaleHistoryColumn";

const SaleHistory = () => {
  return (
    <div className="md:w-11/12 w-[96%] md:my-4 my-2 mx-auto relative">
      <TableComponent column={SaleHistoryColumn} data={[{ product: "ipad" }]} />
    </div>
  );
};

SaleHistory.getLayout = getLayout;
export default SaleHistory;
