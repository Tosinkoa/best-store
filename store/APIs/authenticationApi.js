import { fetcherApi } from "../fetcherApi";

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
        query: () => ({ url: "check-user-auth" }),
      }),
      logoutUser: build.mutation({
        query: () => ({ url: "logout-user", method: "post" }),
      }),
      validateUserOtp: build.mutation({
        query: (body) => ({ url: "validate-user-otp", method: "post", body }),
      }),
      createUserOtp: build.query({
        query: () => ({ url: "create-user-otp" }),
      }),
    };
  },
});

export const {
  useGetAuthQuery,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useValidateUserOtpMutation,
  useCreateUserOtpQuery,
} = authenticationApi;
