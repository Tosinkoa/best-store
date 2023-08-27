import { fetcherApi } from "../fetcheApi";

export const authenticationApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      registerUser: build.mutation({
        query: (body) => ({ url: "register", method: "post", body: body }),
      }),
      loginUser: build.mutation({
        query: (body) => ({ url: "login", method: "post", body: body }),
      }),
      getAuth: build.query({
        query: () => ({ url: "auth" }),
      }),
      logoutUser: build.mutation({
        query: () => ({ url: "logout" }),
      }),
    };
  },
});

export const { useGetAuthQuery, useLogoutUserMutation, useRegisterUserMutation, useLoginUserMutation } = authenticationApi;
