import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const global = {
  "#__next": {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  "body::-webkit-scrollbar": {
    display: "none",
  },
};

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global,
  },
  fonts,
  breakpoints,
});

export default theme;
