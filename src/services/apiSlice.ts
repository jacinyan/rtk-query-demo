import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "src/store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API,
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    //   // @ts-ignore
    //   const token = (getState() as RootState).auth.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    createReqToken: builder.query({
      query: () => "/authentication/token/new",
    }),
    createSessionId: builder.mutation({
      query: ({ username, password }) => {
        return {
          url: "/",
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          body: `username=${username}&password=${password}`,
        };
      },
    }),
  }),
});

export const { useCreateReqTokenQuery, useCreateSessionIdMutation } = api;

export default api.reducer;
