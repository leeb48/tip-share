import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    mobile: true;
  }
}

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      mobile: 500,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
