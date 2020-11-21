import React from "react";
import {IAvailableMedia} from "../../ResponsiveIf";

export const initialContext: IInitialContext = {
  layout: 'xl',
  set: () => {},
  isMobile: () => false,
};

export const LayoutIndicatorContext = React.createContext<IInitialContext>(initialContext);

/**
 * TYPE DEFINITION
 */
export interface IInitialContextProps {
  layout: IAvailableMedia
}
export interface IInitialContextMethods {
  set: ( layout: IAvailableMedia ) => void
  isMobile: ( layout: IAvailableMedia ) => boolean
}
export interface IInitialContext extends IInitialContextProps, IInitialContextMethods {
}
