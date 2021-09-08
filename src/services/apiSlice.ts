import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetTVShowsResponse } from "src/pages/views/home/types";
import { RootState } from "src/store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API,
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    //   const sessionId = (getState() as RootState).auth.sessionId;
    //   if (sessionId) {
    //     headers.set("authorization", `Bearer ${sessionId}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    createSessionId: builder.mutation({
      query: (requestToken) => {
        return {
          url: `/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`,
          method: "POST",
          body: {
            request_token: requestToken,
          },
        };
      },
    }),
    getTVShows: builder.query<
      IGetTVShowsResponse,
      { keywords: string; page: number }
    >({
      query: ({ keywords, page }) => {
        return {
          url: keywords
            ? `/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${keywords}&page=${page}`
            : `/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
        };
      },
    }),
  }),
});

export const { useCreateSessionIdMutation, useGetTVShowsQuery } = api;

export default api.reducer;
