import { useGetStatesInNigeriaQuery } from "@/store/APIs/locationApi";
import { useEffect } from "react";
import { useState } from "react";

const useGetStatesInNigeria = () => {
  const [isStateSorting, setIsStateSorting] = useState(true);
  const [stateOption, setStateOption] = useState(null);
  const { data: stateInNigeriaData, isLoading: isNigeriaStateDataLoading } =
    useGetStatesInNigeriaQuery();

  useEffect(() => {
    const newStatesArray = [{ id: "select_id", name: "--Select State--", value: "" }];

    if (!isNigeriaStateDataLoading && stateInNigeriaData?.data?.length > 0) {
      for (let i = 0; i < stateInNigeriaData?.data?.length; i++) {
        const eachState = stateInNigeriaData?.data[i];
        const newStateObj = {
          id: eachState.id,
          value: eachState.name,
          name: eachState.name,
        };
        newStatesArray.push(newStateObj);
      }
      setStateOption(newStatesArray);
      setIsStateSorting(false);
    }
    if (
      !isNigeriaStateDataLoading &&
      (stateInNigeriaData?.data?.length < 1 || !stateInNigeriaData?.data)
    )
      setIsStateSorting(false);
  }, [stateInNigeriaData, isNigeriaStateDataLoading]);

  return {
    stateOption,
    isNigeriaStateDataLoading,
    isStateSorting,
  };
};

export default useGetStatesInNigeria;
