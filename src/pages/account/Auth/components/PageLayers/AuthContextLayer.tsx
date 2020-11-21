import React from 'react';
import {TopPageMessageContextProvider} from "../../../../../components/TopPageMessage/context";


export const AuthContextLayer = ({children}: any) => (
  <TopPageMessageContextProvider>
    {children}
  </TopPageMessageContextProvider>
);
