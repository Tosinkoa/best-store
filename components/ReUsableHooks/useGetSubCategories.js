import { useGetAllSubCategoriesQuery } from "@/store/APIs/productApi";
import { useEffect, useState } from "react";

const useGetSubCategories = (category_id) => {
  const [isSubCategoriesSorting, setIsSubCategoriesSorting] = useState(true);
  const [subCategoryOption, setSubCategoryOption] = useState(null);
  const {
    data: subCategoriesData,
    isLoading: isSubCategoriesDataLoading,
    isError: isSubCartegoryError,
  } = useGetAllSubCategoriesQuery(category_id, { refetchOnMountOrArgChange: category_id });

  useEffect(() => {
    const newSubCategoryArray = [
      { id: "select_id", name: "-- Select Category --", value: "" },
    ];
    if (!isSubCategoriesDataLoading && subCategoriesData?.data?.length > 0) {
      for (let i = 0; i < subCategoriesData?.data?.length; i++) {
        const eachSubCategory = subCategoriesData?.data[i];
        const newSubCategoryObj = {
          id: eachSubCategory.id,
          value: eachSubCategory.id,
          name: eachSubCategory.sub_cat_names,
        };
        newSubCategoryArray.push(newSubCategoryObj);
      }
      setSubCategoryOption(newSubCategoryArray);
      setIsSubCategoriesSorting(false);
    }
    if (
      (!isSubCategoriesDataLoading &&
        (subCategoriesData?.data?.length < 1 || !subCategoriesData?.data)) ||
      isSubCartegoryError
    )
      setSubCategoryOption([]);
    setIsSubCategoriesSorting(false);
  }, [subCategoriesData, isSubCategoriesDataLoading, category_id]);

  return {
    subCategoryOption,
    isSubCategoriesDataLoading,
    isSubCategoriesSorting,
  };
};

export default useGetSubCategories;
