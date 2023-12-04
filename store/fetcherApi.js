import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const fetcherApi = createApi({
  reducerPath: "fetcherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BackendURL,
    credentials: "include",
  }),
  tagTypes: [
    "ForProduct",
    "ForSellerAccount",
    "ForUserAccount",
    "ForCart",
    "ForAuth",
    "ForSavedItems",
  ],
  endpoints(build) {
    return {};
  },
});
