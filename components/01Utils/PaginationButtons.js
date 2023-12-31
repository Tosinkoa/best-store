const PaginationButtons = ({
  paginationButtonID,
  dataOffsetDecrementHandler,
  dataOffsetIncrementHandler,
}) => {
  return (
    <div
      className="ml-auto flex w-fit mb-10 mt-5 space-x-5 shadow-sm"
      key={paginationButtonID}
    >
      <button
        onClick={dataOffsetDecrementHandler}
        className="bg-primary-700 px-5 py-2 rounded-button text-neutral-50"
      >
        Prev
      </button>
      <button
        onClick={dataOffsetIncrementHandler}
        className="shadow-sm bg-primary-700 px-5 py-2 rounded-button text-neutral-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
