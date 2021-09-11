import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    isOpenSidebar: false,
  },
  reducers: {
    setIsOpenSidebar: (state, { payload }) => {
      state.isOpenSidebar = payload;
    },
  },
});

export const { setIsOpenSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;

export const selectIsOpenSidebar = (state: RootState) =>
  state.layout.isOpenSidebar;
