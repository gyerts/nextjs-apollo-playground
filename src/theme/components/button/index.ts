import {ThemedComponentPropsWithVariants} from "@deity/falcon-ui";
import {loaderVariant} from "./variants/loader";
import {iconVariant} from "./variants/icon";
import {disabledButtonCss, genButtonCss} from "./helpers";
import {inverseVariant} from "./variants/inverse";
import {linkVariant} from "./variants/link";
import {linkUnderlinedVariant} from "./variants/linkUnderlined";
import {grayedVariant} from "./variants/grayed";
import {normalGrayedVariant} from "./variants/normalGrayed";


export const themedButton: ThemedComponentPropsWithVariants = {
  height: 'xl',

  css: ({theme}: any) => ({
    transitionProperty: 'all',
    textTransform: 'capitalize',
    ...disabledButtonCss(theme),
    ...genButtonCss(theme, theme.colors.black, theme.colors.white),
  }),

  variants: {
    inverse: inverseVariant,
    icon: iconVariant,
    link: linkVariant,
    'link-underlined': linkUnderlinedVariant,
    loader: loaderVariant,
    grayed: grayedVariant,
    'normal-grayed': normalGrayedVariant,
  }
};
