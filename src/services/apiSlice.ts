import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetTVShowsResponse } from "src/features/home/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API,
  }),
  tagTypes: ["WatchList"],
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
    getTVShowWatchList: builder.query<
      IGetTVShowsResponse,
      { accountId: number | null; sessionId: string | null }
    >({
      query: ({ accountId, sessionId }) => {
        return {
          url: `/account/${accountId}/watchlist/tv?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
        };
      },
      providesTags: ["WatchList"],
    }),
    updateTVShowWatchList: builder.mutation({
      query: ({ accountId, sessionId, itemId, watchList }) => {
        return {
          url: `/account/${accountId}/watchlist?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionId}`,
          method: "POST",
          body: {
            media_type: "tv",
            media_id: itemId,
            watchlist: watchList,
          },
        };
      },
      invalidatesTags: ["WatchList"],
    }),
  }),
});

export const {
  useCreateSessionIdMutation,
  useGetTVShowsQuery,
  useUpdateTVShowWatchListMutation,
  useGetTVShowWatchListQuery,
} = api;

export default api.reducer;
