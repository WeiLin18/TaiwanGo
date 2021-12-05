import { CssBaseline, ThemeProvider } from "@material-ui/core";

import "styles/reset.css";
import "styles/common.css";
import { AppProvider } from "contexts/AppContext";
import theme from "configs/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  );
}

export default MyApp;
