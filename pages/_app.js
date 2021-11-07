import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "styles/reset.css";
import theme from "configs/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
