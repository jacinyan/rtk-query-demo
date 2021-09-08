import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./services/apiSlice";
import { errorLogger } from "./services/errorLogger";

import authReducer from "src/pages/auth/authSlice";
import tvShowsReducer from "src/pages/views/home/tvShowsSlice";

const sessionIdFromLocalStorage = (
  localStorage.getItem("sessionId") ? localStorage.getItem("sessionId") : ""
) as string;

const preloadedState = {
  auth: {
    sessionId: sessionIdFromLocalStorage,
  },
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    tvShows: tvShowsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware).concat(errorLogger);
  },
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch);
