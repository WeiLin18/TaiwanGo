import { useEffect } from "react";
import Head from "next/head";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import "styles/reset.css";
import { AppProvider } from "contexts/AppContext";
import themeConfig from "configs/theme";

function MyApp({ Component, pageProps }) {
  const theme = createTheme(themeConfig);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>TaiwanGo</title>
        <meta name="description" content="Taiwan travel information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
}

export default MyApp;
