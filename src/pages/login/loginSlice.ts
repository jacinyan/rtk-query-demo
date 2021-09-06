import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    token: "",
  },
  reducers: {
    setAuthInfo: (state, { payload: { token, user } }) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setAuthInfo } = loginSlice.actions;

export default loginSlice.reducer;

export const selectCurrentUserFirstName = (state: RootState) =>
  state.login.first_name;
export const selectCurrentToken = (state: RootState) => state.login.token;

export const selectRegisteredEmail = (state: RootState) =>
  state.login.registeredEmail;
