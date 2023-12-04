import { fetcherApi } from "../fetcherApi";

export const bussinessApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      setupSellerAccount: build.mutation({
        query: (body) => ({ url: "setup-seller-account", method: "post", body }),
        invalidatesTags: ["ForSellerAccount"],
      }),
      getLoggedInSeller: build.query({
        query: () => ({ url: "get-logged-in-seller" }),
        providesTags: ["ForSellerAccount"],
      }),
    };
  },
});

export const { useSetupSellerAccountMutation, useGetLoggedInSellerQuery } = bussinessApi;
