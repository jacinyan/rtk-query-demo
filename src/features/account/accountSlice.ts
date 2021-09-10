import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: {},
  },
  reducers: {
    setAccount: (state, { payload: account }) => {
      state.account = account;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;

export const selectSessionId = (state: RootState) => state.auth.sessionId;
