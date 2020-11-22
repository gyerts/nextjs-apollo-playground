import React from "react";
import '../styles/globals.css'
import {CmsProvider} from 'src/components/Cms';
import {ThemeProvider} from "@deity/falcon-ui";
import {deityBlackTheme} from "src/theme";
import {AppContext} from "next/app";

const getLocalizedTheme = (theme, direction) => {
  return { ...theme, localization: { dir: direction } };
};

function MyApp({ Component, pageProps }) {
  const theme = getLocalizedTheme(deityBlackTheme, 'rtl');

  return (
    <ThemeProvider theme={theme}>
      <CmsProvider pageConfig={pageProps.pageConfig} page={pageProps.page}>
        <Component {...pageProps} />
      </CmsProvider>
    </ThemeProvider>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // isServer();
//   return {
//     pageProps: {
//     },
//   }
// };

export default MyApp;
