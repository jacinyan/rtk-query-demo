import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  Reducer,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "../services/apiSlice";
import { httpMiddleware } from "../services/httpMiddleware";

import authReducer from "src/features/auth/authSlice";
import layoutReducer from "src/layout/layoutSlice";
import { RESET_STATE_ACTION_TYPE } from "./actions";

const authInfoFromLocalStorage = JSON.parse(
  localStorage.getItem("__TMDB_AUTHINFO__") || "{}"
);

const preloadedState = {
  auth: {
    sessionId: authInfoFromLocalStorage.sessionId,
    accountId: authInfoFromLocalStorage.accountId,
  },
};

const reducers = {
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  layout: layoutReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware).concat(httpMiddleware);
  },
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch);
