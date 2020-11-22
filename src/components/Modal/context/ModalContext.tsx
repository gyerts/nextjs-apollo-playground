import React from "react";

export const FUNC_STUB: any = (): null => null;
export type IModalContentProps = {
  closeModal: () => void
};

export const initialContext: IInitialContext = {
  opened: false,
  title: 'Modal',
  Component: FUNC_STUB,
  options: {
    className: '',
    bigContent: false,
  },
  openModal: FUNC_STUB,
  closeModal: FUNC_STUB,
};

export const ModalContext = React.createContext<IInitialContext>(initialContext);

/**
 * TYPE DEFINITION
 */
export interface IInitialContextProps {
  opened?: boolean
  title?: string
  Component?: React.FunctionComponent<IModalContentProps>,
  options?: IModalOptions;
}

export interface IModalOptions {
  className?: string;
  bigContent?: boolean;
}

export interface IInitialContextMethods {
  openModal: (
    title: string,
    Component: React.FunctionComponent<any>,
    options?: IModalOptions
  ) => void
  closeModal: () => void
}
export interface IInitialContext extends IInitialContextProps, IInitialContextMethods {
}
