import React from "react";
import {ApolloProvider} from '@apollo/client';
import '../styles/globals.css'
import {useApollo} from "../src/apolloClient";
import {CmsProvider} from 'src/components/Cms';

function MyApp({ Component, pageProps }) {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <CmsProvider>
        <Component {...pageProps} />
      </CmsProvider>
    </ApolloProvider>
  )
}

export default MyApp;
