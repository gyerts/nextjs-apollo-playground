import React from "react";
import {ConfigQuery} from "src/uikitEjected";
import {IClientConfig} from "src/types";

export const ClientConfigsContext = React.createContext<IClientConfig>(null);

export const ClientConfigsContextProvider = ({children}: any) => {
  return (
    <ConfigQuery>{(config: {getConfig: IClientConfig}) => (
      <ClientConfigsContext.Provider value={config.getConfig}>
        {children}
      </ClientConfigsContext.Provider>
    )}</ConfigQuery>
  );
};
