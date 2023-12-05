import { useGetOneProductQuery } from "@/store/APIs/productApi";

const useSetProductInitialValue = (product_id) => {
  const { data: oneProductData, isLoading: isOneProductDataLoading } =
    useGetOneProductQuery(product_id);

  //---- The initial value for product details
  const initialProductValues = {
    name: oneProductData?.data?.name || "",
    in_stock: oneProductData?.data?.in_stock || "",
    crossed_out_price: oneProductData?.data?.crossed_out_price || "",
    price: oneProductData?.data?.price || "",
    descriptionValue: oneProductData?.data?.description || "",
    selectedBargain: oneProductData?.data?.bargain || false,
    selectedCategory: {
      id: oneProductData?.data?.category_id,
      name: oneProductData?.data?.category_name,
      value: oneProductData?.data?.category_id,
    },
    selectedSubCategory: {
      id: oneProductData?.data?.sub_category_id,
      name: oneProductData?.data?.sub_category_name,
      value: oneProductData?.data?.sub_category_id,
    },
    productImages:
      oneProductData?.data?.images?.map((image) => ({
        id: image.image_key,
        image_key: image.image_key,
        imageFile: null,
        imageURL: image.image_url,
      })) || [],
  };

  return {
    isOneProductDataLoading,
    initialProductValues,
  };
};

export default useSetProductInitialValue;
