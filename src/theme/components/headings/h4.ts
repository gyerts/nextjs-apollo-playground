import {ThemedComponentPropsWithVariants} from "@deity/falcon-ui";


export const themedH4: ThemedComponentPropsWithVariants = {
  color: 'black',
  css: ({theme}) => ({
    fontSize: theme.fontSizes.xs,
    fontWeight: 900,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.44,
    letterSpacing: 0.16,
    [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.fontSizes.md,
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
