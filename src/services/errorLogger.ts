import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";
import NProgress from "nprogress";

const toast = createStandaloneToast();

export const errorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    NProgress.configure({ showSpinner: false });
    try {
      if (action.meta && action.meta.requestStatus === "pending") {
        NProgress.start();
      }
    } finally {
      if (action.meta && action.meta.requestStatus === "fulfilled") {
        NProgress.done();
      }
    }

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
