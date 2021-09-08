import React from "react";
import ReactDOM from "react-dom";

import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { myTheme } from "src/styles/theme";
import App from "./App";

import "@fontsource/roboto-condensed/400.css";
import "@fontsource/yantramanav/700.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={myTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
