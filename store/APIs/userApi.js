import { fetcherApi } from "../fetcherApi";

export const userApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      setupProfile: build.mutation({
        query: (body) => ({ url: "setup-profile", method: "put", body }),
        invalidatesTags: ["ForUserAccount"],
      }),
      getLoggedInUser: build.query({
        query: () => ({ url: "get-logged-in-user" }),
        providesTags: ["ForUserAccount"],
      }),
    };
  },
});

export const { useGetLoggedInUserQuery, useSetupProfileMutation } = userApi;
