import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

export const authAlice = createSlice({
  name: "auth",
  initialState: {
    sessionId: "",
  },
  reducers: {
    setSessionId: (state, { payload: sessionId }) => {
      state.sessionId = sessionId;
    },
  },
});

export const { setSessionId } = authAlice.actions;

export default authAlice.reducer;

export const selectSessionId = (state: RootState) => state.auth.sessionId;
