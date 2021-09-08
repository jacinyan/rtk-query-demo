import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();
/**
 * Log a warning and show a toast!
 */
export const errorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
    if (isRejectedWithValue(action)) {
      if (action.payload.originalStatus >= 500) {
        console.warn("error logs -- 5xx", action);
        toast({
          description:
            "The server is busy at the moment, please try again later",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }

      if (action.payload.status >= 400 && action.payload.status < 500) {
        console.warn("error logs -- 4xx", action);

        const finalMessage = action.payload.data.status_message
          ? action.payload.data.status_message
          : action.payload.error.message;

        toast({
          title: "Error encountered",
          description: finalMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    return next(action);
  };
