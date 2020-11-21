import {ApolloClient, InMemoryCache, HttpLink, NormalizedCache} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCache>;

function createApolloClient(): any {
  return new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
    }),
    cache: new InMemoryCache()
  });
}

function initializeApollo() {
  return apolloClient || createApolloClient();
}

export function useApollo () {
  return initializeApollo();
}
