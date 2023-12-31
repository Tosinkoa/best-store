import { fetcherApi } from "../fetcherApi";

export const bussinessApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      setupSellerAccount: build.mutation({
        query: (body) => ({ url: "setup-seller-account", method: "post", body }),
        invalidatesTags: ["ForSeller"],
      }),
      getLoggedInSeller: build.query({
        query: () => ({ url: "get-logged-in-seller" }),
        providesTags: ["ForSeller"],
      }),
      getAllSeller: build.query({
        query: ({ data_amount, data_offset }) => ({
          url: `get-all-seller/${data_amount}?data_offset=${data_offset}`,
        }),
        providesTags: ["ForSeller"],
      }),
      getASeller: build.query({
        query: (seller_id) => ({ url: `get-a-seller/${seller_id}` }),
        providesTags: ["ForSeller"],
      }),
    };
  },
});

export const {
  useSetupSellerAccountMutation,
  useGetLoggedInSellerQuery,
  useGetAllSellerQuery,
  useGetASellerQuery,
} = bussinessApi;
