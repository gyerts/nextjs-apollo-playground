import {Theme} from "@market-ui/falcon-ui";
import {genButtonCss} from "../helpers";


export const grayedVariant = {
  css: ({theme}: {theme: Theme}) => ({
    ...genButtonCss(theme, theme.colors.primary, theme.colors.black),
  }),
} as any;
