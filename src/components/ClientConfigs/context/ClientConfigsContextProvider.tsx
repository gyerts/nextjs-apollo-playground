import React from "react";
import {IClientConfig} from "src/types";
import {useQuery} from "@apollo/client";
import {GET_CONFIG} from "src/uikitEjected/Config";

export const ClientConfigsContext = React.createContext<IClientConfig>(null);

export const ClientConfigsContextProvider = ({children}: any) => {
  const {error, loading, data: {getConfig: config}} = useQuery(GET_CONFIG);

  if (loading || error) {
    return null;
  }

  return (
    <ClientConfigsContext.Provider value={config}>
      {children}
    </ClientConfigsContext.Provider>
  );
};
