import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  const ReactTable = require("react-table");
  whyDidYouRender(React, {
    trackAllPureComponents: false,
    trackExtraHooks: [[ReactTable, "useTable"]],
  });
}
