import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

export const paginationSlice = createSlice({
  name: "auth",
  initialState: {
    sessionId: "",
  },
  reducers: {
    setSessionId: (state, { payload: sessionId }) => {
      state.sessionId = sessionId;
    },
    removeSessionId: (state) => {
      state.sessionId = "";
    },
  },
});

export const { setSessionId, removeSessionId } = paginationSlice.actions;

export default paginationSlice.reducer;

export const selectSessionId = (state: RootState) => state.auth.sessionId;
