import { css } from "@emotion/react";

export const customStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }

  #nprogress .bar {
    height: 0.25rem;
    background: #00b4e1 !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;
