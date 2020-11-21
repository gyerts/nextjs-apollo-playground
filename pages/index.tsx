import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useQuery, gql, ApolloProvider} from '@apollo/client';
import React from "react";

const TestQuery = gql`
  query {
    name
  }
`;

export default function Home() {
  // const {data, error, loading} = useQuery(TestQuery);

  return (
    <div className={styles.container}>
      <Head>
        <title>wow london</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      ad
      {/*{!error && !loading && data.name}*/}
    </div>
  )
}
