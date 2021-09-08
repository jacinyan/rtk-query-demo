import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// repeat default values simply for my own convenience
const breakpoints = createBreakpoints({
  sm: "480px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
});

export const myTheme = extendTheme({
  breakpoints,
  fonts: {
    body: "Roboto Condensed",
  },
  styles: {
    global: {
      body: {
        fontSize: "clamp(12px, 2.25vw, 14px)",
      },
      h1: {
        fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
        fontFamily: "Yantramanav",
      },
      h2: {
        fontSize: "clamp(1.5rem, 4vw, 2rem)",
        fontFamily: "Yantramanav",
      },
      h3: {
        fontSize: "clamp(1.2rem, 3.5vw, 1.75rem)",
        fontFamily: "Yantramanav",
      },
      h4: {
        fontSize: "clamp(1rem, 3vw, 1.125rem)",
        fontFamily: "Yantramanav",
      },
      h5: {
        fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
        fontFamily: "Yantramanav",
      },
    },
  },
});
