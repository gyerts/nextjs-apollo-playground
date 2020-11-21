import {ThemedComponentPropsWithVariants} from "@deity/falcon-ui";


export const themedH7: ThemedComponentPropsWithVariants = {
  color: 'black',
  css: ({theme}) => ({
    fontSize: theme.fontSizes.md,
    fontWeight: 900,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.42,
    letterSpacing: 0.36,
    [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.fontSizes.xxs,
    }
  }),
};
//export const themedFontSizes: ThemeFontSizes = {
//   xxs: 12,
//   xs: 14,
//   sm: 15,
//   md: 16,
//   lg: 18,
//   xl: 20,
//   xxl: 32,
//   xxxl: 40,
// };
