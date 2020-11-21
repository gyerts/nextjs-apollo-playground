import {colorsFromDesign, themedColors} from "src/theme/colors";
import { ICssObject } from "src/common/models";

export const getBgFullWidth = (styles: ICssObject = {}): ICssObject => ({
  ':before': {
    content: '""',
    width: '200vw',
    height: '100%',
    background: themedColors.primary,
    position: 'absolute',
    right: '-50vw',
    top: 0,
    zIndex: -1,
    ...styles,
  }
});
