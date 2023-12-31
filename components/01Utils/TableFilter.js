import { IoMdSearch } from "react-icons/io";

const TableFilter = ({ filter, setFilter }) => {
  return (
    <div className="relative lg:w-[28%]">
      <IoMdSearch className="absolute text-2xl inset-y-0 my-auto left-2 " />
      <input
        type="search"
        onChange={(e) => setFilter(e.target.value)}
        value={filter || ""}
        placeholder="Search for anything..."
        className="h-10 border-gray-300 rounded-md w-full font-medium pl-10 placeholder:font-semibold placeholder:text-gray-400"
      />
    </div>
  );
};

export default TableFilter;
