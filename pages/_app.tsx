import React from "react";
import {ApolloProvider} from '@apollo/client';
import '../styles/globals.css'
import {CmsProvider} from 'src/components/Cms';
import {ThemeProvider} from "@deity/falcon-ui";
import {deityBlackTheme} from "src/theme";
import {useApollo} from "src/apolloClient";

const getLocalizedTheme = (theme, direction) => {
  return { ...theme, localization: { dir: direction } };
};

function MyApp({ Component, pageProps }) {
  const client = useApollo();
  const theme = getLocalizedTheme(deityBlackTheme, 'rtl');

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        hi
        <CmsProvider>
          <Component {...pageProps} />
        </CmsProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp;
