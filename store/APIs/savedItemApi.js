import { fetcherApi } from "../fetcherApi";

export const savedItemApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      addProductToSavedItem: build.mutation({
        query: (product_id) => ({
          url: `save-product/${product_id}`,
          method: "post",
        }),
        invalidatesTags: ["ForSavedItems", "ForCart"],
      }),
      getSavedItem: build.query({
        query: () => ({
          url: "get-all-saved-items",
        }),
        providesTags: ["ForSavedItems", "ForCart"],
      }),
      removeProductFromSavedItem: build.mutation({
        query: (saved_product_id) => ({
          url: `remove-saved-product/${saved_product_id}`,
          method: "delete",
        }),
        providesTags: ["ForSavedItems"],
      }),
    };
  },
});

export const { useAddProductToSavedItemMutation, useGetSavedItemQuery, use } = savedItemApi;
