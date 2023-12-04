import { fetcherApi } from "../fetcherApi";

export const cartApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      getBuyerCart: build.query({
        query: () => ({
          url: `get-buyer-cart`,
        }),
        providesTags: ["ForCart", "ForSavedItems"],
      }),
      addProductToCart: build.mutation({
        query: ({ body, product_id }) => ({
          url: `add-product-to-cart/${product_id}`,
          method: "post",
          body,
        }),
        invalidatesTags: ["ForCart", "ForSavedItems"],
      }),
      removeProductFromCart: build.mutation({
        query: ({ body, cart_id }) => ({
          url: `remove-product-from-cart/${cart_id}`,
          method: "put",
          body,
        }),
        invalidatesTags: ["ForCart"],
      }),
    };
  },
});

export const {
  useGetBuyerCartQuery,
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
} = cartApi;
