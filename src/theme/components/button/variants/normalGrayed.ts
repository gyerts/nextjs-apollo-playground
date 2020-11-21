import {Theme} from "@deity/falcon-ui";
import {genButtonCss} from "../helpers";


export const normalGrayedVariant = {
  css: ({theme}: {theme: Theme}) => ({
    ...genButtonCss(theme, theme.colors.black, theme.colors.primary),
  }),
} as any;
