import React from "react";
import {Responsive} from "src/uikitEjected";


export type IAvailableMedia = 'xs'|'sm'|'md'|'lg'|'xl';
interface IProps {
  children: any;
  width?: IAvailableMedia
  minWidth?: IAvailableMedia
  maxWidth?: IAvailableMedia
  mobile?: boolean
  desktop?: boolean
}
export const ResponsiveIf = ({children, ...props}: IProps) => {
  const newProps = { ...props };

  if (props.width === 'xs' || props.minWidth === 'xs') {
    console.warn("You cannot pass xs size, because xs equal to 0, you should use maxWidth='sm' instead, your " +
      "combination has no effect, it always renders children");
  }
  if (props.mobile) {
    newProps.maxWidth = 'sm';
  }
  if (props.desktop) {
    newProps.minWidth = 'sm';
  }
  return (
    <Responsive {...newProps}>{(matches: boolean) => matches ? children : null}</Responsive>
  )
};
