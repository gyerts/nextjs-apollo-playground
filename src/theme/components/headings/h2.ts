import {ThemedComponentPropsWithVariants} from "@deity/falcon-ui";


export const themedH2: ThemedComponentPropsWithVariants = {
  color: 'black',
  css: ({theme}) => ({
    fontSize: theme.fontSizes.xl,
    fontWeight: 900,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.31,
    letterSpacing: 0.96,
    [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.fontSizes.xxl,
    }
  }),
  variants: {
    upper: {
      css: ({theme}) => ({
        textTransform: 'uppercase'
      })
    }
  }
};
