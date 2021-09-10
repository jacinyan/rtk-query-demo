import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

export const authAlice = createSlice({
  name: "auth",
  initialState: {
    sessionId: "",
    accountId: "",
  },
  reducers: {
    setSessionId: (state, { payload: sessionId }) => {
      state.sessionId = sessionId;
    },
    setAccountId: (state, { payload: accountId }) => {
      state.sessionId = accountId;
    },
  },
});

export const { setSessionId } = authAlice.actions;

export default authAlice.reducer;

export const selectSessionId = (state: RootState) => state.auth.sessionId;
