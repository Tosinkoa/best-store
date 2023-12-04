import { useGetAllCategoriesQuery } from "@/store/APIs/productApi";
import { useEffect, useState } from "react";

const useGetCategories = () => {
  const [isCategoriesSorting, setIsCartoriesSorting] = useState(true);
  const [categoryOption, setCategoryOption] = useState(null);
  const {
    data: categoriesData,
    isLoading: isCategoriesDataLoading,
    isError: isCartegoryError,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    const newCategoryArray = [{ id: "select_id", name: "-- Select Category --", value: "" }];

    if (!isCategoriesDataLoading && categoriesData?.data?.length > 0) {
      for (let i = 0; i < categoriesData?.data?.length; i++) {
        const eachCategory = categoriesData?.data[i];
        const newCategoryObj = {
          id: eachCategory.id,
          value: eachCategory.id,
          name: eachCategory.name,
        };
        newCategoryArray.push(newCategoryObj);
      }
      setCategoryOption(newCategoryArray);
      setIsCartoriesSorting(false);
    }
    if (
      (!isCategoriesDataLoading &&
        (categoriesData?.data?.length < 1 || !categoriesData?.data)) ||
      isCartegoryError
    )
      setCategoryOption([]);
    setIsCartoriesSorting(false);
  }, [categoriesData, isCategoriesDataLoading]);

  return {
    categoryOption,
    isCategoriesDataLoading,
    isCategoriesSorting,
  };
};

export default useGetCategories;
