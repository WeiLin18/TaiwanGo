import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import "styles/reset.css";
import { AppProvider } from "contexts/AppContext";
import theme from "configs/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
