import React from "react";

export const FUNC_STUB: any = (): null => null;

export const initialContext: IInitialContext = {
  routes: undefined,
  menuItems: undefined,
  addRoute: FUNC_STUB,
  addMenuItem: FUNC_STUB,
};

export const TabsContext = React.createContext<IInitialContext>(initialContext);

/**
 * TYPE DEFINITION
 */
export interface IInitialContextProps {
  routes?: React.ReactElement[]
  menuItems?: ITabLink[]
}
export interface IInitialContextMethods {
  addRoute: (route: React.ReactElement) => void
  addMenuItem: (menuItem: ITabLink) => void
}
export interface IInitialContext extends IInitialContextProps, IInitialContextMethods {
}
export interface ITabLink {
  to: string|string[]
  collapsible?: boolean
  children: (active: boolean) => React.ReactElement
}
