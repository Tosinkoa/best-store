import { fetcherApi } from "../fetcherApi";

export const cartApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      getSellerSalesHistory: build.query({
        query: ({ data_amount, data_offset }) => ({
          url: `/get-seller-sales-history/${data_amount}&data_offset=${data_offset}`,
        }),
      }),
    };
  },
});

export const { useGetSellerSalesHistoryQuery } = cartApi;
