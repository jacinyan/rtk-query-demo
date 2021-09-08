import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API,
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
  }),
});

export const { useCreateSessionIdMutation } = api;

export default api.reducer;
