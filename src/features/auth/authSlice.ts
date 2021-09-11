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
    removeSessionId: (state) => {
      state.sessionId = "";
    },
  },
});

export const { setSessionId, removeSessionId } = authAlice.actions;

export default authAlice.reducer;

export const selectSessionId = (state: RootState) => state.auth.sessionId;
