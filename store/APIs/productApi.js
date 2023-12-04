import { fetcherApi } from "../fetcherApi";

export const locationApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      getAllProducts: build.query({
        query: ({ data_amount, data_offset }) => ({
          url: `get-all-products/${data_amount}?data_offset=${data_offset}`,
        }),
        invalidatesTags: ["ForProduct"],
      }),
      getAllSuggestedProducts: build.query({
        query: ({ data_amount, data_offset, sub_category_id }) => ({
          url: `get-all-products/${data_amount}?data_offset=${data_offset}&sub_category_id=${sub_category_id}`,
        }),
        invalidatesTags: ["ForProduct"],
      }),
      createNewProduct: build.mutation({
        query: (body) => ({ url: "create-new-product", method: "post", body }),
        invalidatesTags: ["ForProduct"],
      }),
      editProduct: build.mutation({
        query: ({ body, product_id }) => ({
          url: `/edit-product/${product_id}`,
          method: "put",
          body,
        }),
        invalidatesTags: ["ForProduct"],
      }),
      getAllCategories: build.query({
        query: () => ({ url: "get-all-categories" }),
      }),
      getAllSubCategories: build.query({
        query: (category_id) => ({ url: `get-all-sub-categories/${category_id}` }),
      }),
      getASellerProducts: build.query({
        query: ({ data_amount, data_offset }) => ({
          url: `/get-a-seller-products/${data_amount}?data_offset=${data_offset}`,
        }),
        providesTags: ["ForProduct"],
      }),
      getASellerProducts: build.query({
        query: ({ data_amount, data_offset }) => ({
          url: `/get-a-seller-products/${data_amount}?data_offset=${data_offset}`,
        }),
        providesTags: ["ForProduct"],
      }),
      getOneProduct: build.query({
        query: (product_id) => ({
          url: `get-a-product/${product_id}`,
        }),
        providesTags: ["ForProduct"],
      }),
    };
  },
});

export const {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useCreateNewProductMutation,
  useEditProductMutation,
  useGetASellerProductsQuery,
  useGetOneProductQuery,
  useGetAllProductsQuery,
  useGetAllSuggestedProductsQuery,
} = locationApi;
