import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import { useGlobalFilter, usePagination, useTable } from "react-table";
// import TableFilter from "./TableFilter";

const TableComponent = ({ column, data, dontShowSearchFilter }) => {
  const tableInstance = useTable({ columns: column, data: data }, useGlobalFilter, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    setPageSize,
    pageCount,
    pageOptions,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div>
      {/* {dontShowSearchFilter ? "" : <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />} */}
      <div id="player-table" className="scroll-mt-24">
        <div
          className={`${
            data.length < 1 ? "h-[150px]" : data.length < 12 ? "h-fit" : "h-[600px] overflow-y-auto"
          } relative full mx-auto justify-center border shadow perspective rounded-md overflow-hidden  overflow-x-auto`}
        >
          <table className="table" {...getTableProps()}>
            <thead className="table_head">
              {headerGroups.map((headerGroup) => (
                <tr className="table_row" key={data?.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th scope="col" key={data?.id} className="table_head_row" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {data && (
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr key={data?.id} className="table_head_row " {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td className="table_data min-w-min w-fit mx-auto " key={data?.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          {data.length < 1 && (
            <div className="flex h-20 w-full">
              <h1 className="absolute h-20  text-center right-0 left-0  font-semibold text-lg md:text-2xl p-4">No record found</h1>
            </div>
          )}
        </div>

        {/*============Table buttons for pagination =============*/}
        {data.length > 12 && (
          <div className="mt-4 ml-6 space-x-0 md:space-x-2 text-sm md:text-base justify-center md:flex flex-col md:flex-row space-y-5 md:space-y-0 font-semibold items-center">
            <div className=" space-y-2 ">
              <div className="flex space-x-2">
                <p>Page</p>
                <strong>
                  {pageIndex + 1} of {pageOptions.length}{" "}
                </strong>
              </div>
              <div className="flex space-x-2">
                <p>Go to page:</p>
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(pageNumber);
                  }}
                  className="border border-gray-600 rounded-sm ml-1 w-2/5 h-8 px-2"
                />
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-2">
              <button className="text-green-700 text-2xl " onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <ImArrowLeft />
              </button>
              <button onClick={() => previousPage()} disabled={!canPreviousPage} className="border rounded-md px-2 bg-[#81b341]  py-1">
                Previous
              </button>
              <button onClick={() => nextPage()} disabled={!canNextPage} className="border rounded-md px-2 bg-[#81b341]  py-1 ">
                Next
              </button>
              <button className="text-green-700 text-2xl " onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <ImArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
