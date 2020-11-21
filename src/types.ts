import { DataProxy } from '@apollo/client';

export type ApolloClientReducer<T> = (_: any, variables: T, {cache}: {cache: DataProxy}) => null;

/**
 * This type uses for representation of dict, like
 *
 * type IColor = 'red'|'green';
 * const someDict: Dictionary<IColor, string> = {
 *   red: 'this is red color',
 *   green: 'this is green color',
 *   yellow: 'this is yellow color', <- compilation error, now yellow in IColor
 * }
 */
export type Dictionary<T extends string | symbol | number, U> = {
  [K in T]?: U;
};

export type IBackendConfigResponse = {
  backendConfig: {
    locales: any[]
    activeLocale: string
    shop: {
      activeCurrency: string
    }
  }
}

export type IClientConfig = {
  apolloClient: any,
  appName: string
  graphqlUrl: string
  i18n: any
  logLevel: string
  port: number
  serverSideRendering: boolean

  /**
   * Here should be added custom settings, this settings mirrors wow-client/config folder
   * please add more types here when you add configs
   */
  googleTagManager: {
    type: string,
    generated: boolean,
    id: string,
    typename: string
  }
  googleApiKey: string
}
