import {useEffect} from "react";
import {IAvailableMedia} from "../../ResponsiveIf";


interface IProps {
  layoutIn: (layout: IAvailableMedia, reverse?: boolean) => void
  layoutOut: (layout: IAvailableMedia, reverse?: boolean) => void
  name: IAvailableMedia

  // this option is required due to difference of entrance to the layout
  // if we make size of window bigger then xs, xs will 'exit' from prev mode
  // if we make size of window bigger then sm, sm will 'enter' to next mode
  // and vice versa
  reverse?: boolean
}
export const Logger = ({name, layoutIn, layoutOut, reverse}: IProps): null => {
  useEffect(function () {
    layoutIn(name, reverse);
    return () => layoutOut(name, reverse);
  }, []);

  return null;
};
