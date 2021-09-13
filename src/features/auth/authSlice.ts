import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

type AuthState = {
  sessionId: string | null;
  accountId: number | null;
};

export const authAlice = createSlice({
  name: "auth",
  initialState: {
    sessionId: null,
    accountId: null,
  } as AuthState,
  reducers: {
    setAuthInfo: (state, { payload: { sessionId, accountId } }) => {
      state.sessionId = sessionId;
      state.accountId = accountId;
    },
    removeAuthInfo: (state) => {
      state.sessionId = null;
      state.accountId = null;
    },
  },
});

export const { setAuthInfo, removeAuthInfo } = authAlice.actions;

export default authAlice.reducer;

export const selectAuthInfo = (state: RootState) => state.auth;
