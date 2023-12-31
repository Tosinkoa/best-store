import AuthorizeHOC from "@/HOC/AuthorizeHOC";
import PaginationButtons from "@/components/01Utils/PaginationButtons";
import TableComponent from "@/components/01Utils/TableComponent";
import { getLayout } from "@/components/Layouts/DashboardLayout";
import { SaleHistoryColumn } from "@/components/PagesComponent/SaleHistory/SaleHistoryColumn";
import usePaginationFunction from "@/components/ReusableHooks/usePaginationFunction";
import {
  useGetSellerHistoriesQuery,
  useGetSellerSalesHistoryQuery,
} from "@/store/APIs/saleHistoryApi";

const SaleHistory = () => {
  const {
    data_offset,
    dataToFetchPerRequest,
    dataOffsetDecrementHandler,
    dataOffsetIncrementHandler,
  } = usePaginationFunction();
  const { data: sellerSalesHistory, isLoading: isSellerSalesHistoryLoading } =
    useGetSellerSalesHistoryQuery({ data_amount: dataToFetchPerRequest, data_offset });

  return (
    <div className="w-full mx-auto relative">
      {!isSellerSalesHistoryLoading && sellerSalesHistory?.data?.length > 0 && (
        <>
          <TableComponent column={SaleHistoryColumn} data={sellerSalesHistory?.data} />
          <PaginationButtons
            paginationButtonID="sales-histories"
            dataOffsetDecrementHandler={dataOffsetDecrementHandler}
            dataOffsetIncrementHandler={dataOffsetIncrementHandler}
          />
        </>
      )}
    </div>
  );
};

export default AuthorizeHOC(SaleHistory, getLayout);
