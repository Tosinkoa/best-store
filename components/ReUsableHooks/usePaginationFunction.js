import { useState } from "react";

const usePaginationFunction = () => {
  const dataToFetchPerRequest = 20;
  const [data_offset, setData_offset] = useState(0);

  const dataOffsetIncrementHandler = () =>
    setData_offset((prev) => prev + dataToFetchPerRequest);

  const dataOffsetDecrementHandler = () => {
    if (data_offset < 1) return;
    setData_offset((prev) => prev - dataToFetchPerRequest);
  };

  return {
    dataToFetchPerRequest,
    data_offset,
    dataOffsetIncrementHandler,
    dataOffsetDecrementHandler,
  };
};

export default usePaginationFunction;
