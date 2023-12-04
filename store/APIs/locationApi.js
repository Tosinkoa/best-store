import { fetcherApi } from "../fetcherApi";

export const locationApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      getStatesInNigeria: build.query({
        query: (body) => ({ url: "get-states-in-nigeria" }),
      }),
    };
  },
});

export const { useGetStatesInNigeriaQuery } = locationApi;
