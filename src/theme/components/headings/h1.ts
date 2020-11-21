import {ThemedComponentPropsWithVariants} from "@deity/falcon-ui";


export const themedH1: ThemedComponentPropsWithVariants = {
  color: 'black',
  css: ({theme}) => ({
    fontSize: 24,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.25,
    letterSpacing: 2,
    [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.fontSizes.xxxl,
    }
  }),
};
