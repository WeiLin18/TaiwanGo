import { useEffect } from "react";
import Head from "next/head";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import "styles/reset.css";
import { AppProvider } from "contexts/AppContext";
import themeConfig from "configs/theme";

import { CacheProvider } from "@emotion/react";
import createEmotionCache from "utils/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const theme = createTheme(themeConfig);
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <CacheProvider value={emotionCache}>
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
              <Component {...pageProps} />;
            </AppProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
