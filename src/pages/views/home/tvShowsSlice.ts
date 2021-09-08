import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

export const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState: {
    markedTVShows: [],
  },
  reducers: {
    markTVShows: (state, { payload: markedTVShows }) => {
      state.markedTVShows = markedTVShows;
    },
  },
});

export const { markTVShows } = tvShowsSlice.actions;

export default tvShowsSlice.reducer;

export const selectTVShows = (state: RootState) => state.tvShows.markedTVShows;
