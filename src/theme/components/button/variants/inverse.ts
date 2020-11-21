import {Theme} from "@deity/falcon-ui";
import {genButtonCss} from "../helpers";


export const inverseVariant = {
  css: ({theme}: {theme: Theme}) => ({
    ...genButtonCss(theme, theme.colors.white, theme.colors.black),
  }),
} as any;
