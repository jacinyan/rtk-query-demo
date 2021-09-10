import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

export const watchListSlice = createSlice({
  name: "tvShows",
  initialState: {
    showsInList: [],
  },
  reducers: {
    addToList: (state, { payload: item }) => {
      // const selectedShow = { something: "" };
      // @ts-ignore
      state.showsInList.push(item);
    },
    removeFromList: (state, { payload: id }) => {
      const selectedShow = { something: "" };
      // @ts-ignore
      state.showsInList.pop(selectedShow);
    },
  },
});

export const { addToList } = watchListSlice.actions;

export default watchListSlice.reducer;

export const selectShowsInList = (state: RootState) =>
  state.watchList.showsInList;
