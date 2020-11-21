import React, {useEffect} from "react";
import {IAvailableMedia, ResponsiveIf} from "../../ResponsiveIf";
import {Logger} from "./Logger";


interface IProps {
  layoutIn: (layout: IAvailableMedia, reverse?: boolean) => void
  layoutOut: (layout: IAvailableMedia, reverse?: boolean) => void
  name: IAvailableMedia

  maxWidth?: IAvailableMedia
  minWidth?: IAvailableMedia

  // this option is required due to difference of entrance to the layout
  // if we make size of window bigger then xs, xs will 'exit' from prev mode
  // if we make size of window bigger then sm, sm will 'enter' to next mode
  // and vice versa
  reverse?: boolean
}
export const LayoutListener = ({layoutIn, layoutOut, maxWidth, minWidth, name, reverse}: IProps) => {
  useEffect(function () {
    if (reverse) {
      layoutIn(name);
    }
  }, [reverse]);

  return (
    <ResponsiveIf maxWidth={maxWidth} minWidth={minWidth}>
      {reverse ? (
        <Logger name={name} layoutIn={layoutOut} layoutOut={layoutIn} reverse />
      ) : (
        <Logger name={name} layoutIn={layoutIn} layoutOut={layoutOut} />
      )}
    </ResponsiveIf>
  );
};
