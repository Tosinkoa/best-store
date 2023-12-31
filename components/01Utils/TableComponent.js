import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import { IoIosArrowBack, IoIosArrowForward, IoMdSearch } from "react-icons/io";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import TableFilter from "./TableFilter";

const TableComponent = ({ column, data, dontShowSearchFilter }) => {
  const tableInstance = useTable(
    { columns: column, data: data },
    useGlobalFilter,
    usePagination
  );

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
    <div className="h-full bg-white border rounded-lg md:rounded-xl">
      <div className="justify-between text-sm h-20 p-3 flex font-semibold items-center border-b">
        {dontShowSearchFilter ? (
          ""
        ) : (
          <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}

        <div className="flex space-x-2 h-10">
          <button
            className="border rounded-md text-2xl px-1"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="border rounded-md px-2 py-1 font-medium"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="border rounded-md px-2 py-1 font-medium"
          >
            Next
          </button>
          <button
            className="border rounded-md text-2xl px-2"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <div
        className={`${
          data.length < 1 ? "h-fit" : "h-[85%] overflow-y-auto"
        }  full mx-auto justify-center perspective overflow-hidden overflow-x-auto`}
      >
        <table className="table" {...getTableProps()}>
          <thead className="table_head">
            {headerGroups.map((headerGroup) => (
              <tr className="table_row" key={data?.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    scope="col"
                    key={data?.id}
                    className="table_head_row"
                    {...column.getHeaderProps()}
                  >
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
                        <td
                          className="table_data min-w-min w-fit mx-auto "
                          key={data?.id}
                          {...cell.getCellProps()}
                        >
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
            <h1 className="absolute h-20  text-center right-0 left-0  font-semibold text-lg md:text-2xl p-4">
              No record found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
