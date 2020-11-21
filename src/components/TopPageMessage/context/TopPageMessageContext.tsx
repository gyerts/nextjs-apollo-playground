import React from "react";

export const initialContext: IInitialContext = {
  title: null,
  opened: false,
  message: null,
  options: {
    isError: false,
    closable: false,
    autoClose: true,
  },
  openMessage: () => {},
  closeMessage: () => {},
};

export const TopPageMessageContext = React.createContext<IInitialContext>(initialContext);

/**
 * TYPE DEFINITION
 */
export interface IInitialContextProps {
  title?: string|null
  opened: boolean
  message?: string|null
  options?: {
    isError?: boolean
    closable?: boolean,
    autoClose?: boolean,
  }
}
export interface IInitialContextMethods {
  openMessage: (
    title: IInitialContextProps['title'],
    message: IInitialContextProps['message'],
    options: IInitialContextProps['options'],
  ) => void
  closeMessage: () => void
}
export interface IInitialContext extends IInitialContextProps, IInitialContextMethods {
}
