import {
  MiddlewareAPI,
  isRejectedWithValue,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/**
 * Log a warning and show a toast!
 */
export const errorLogger =
  (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
    if (isRejectedWithValue(action)) {
      console.log(action);
      if (action.payload.originalStatus >= 500) {
        toast.warning(
          "The server is busy at the moment, please try again later"
        );
      }
      if (action.payload.status >= 400 && action.payload.status < 500) {
        const finalMessage = action.payload.data.message
          ? action.payload.data.message
          : action.payload.data.error;

        toast.error(finalMessage);
      }
    }

    return next(action);
  };
