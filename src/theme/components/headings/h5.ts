import {ThemedComponentPropsWithVariants} from "@market-ui/falcon-ui";


export const themedH5: ThemedComponentPropsWithVariants = {
  color: 'black',
  css: ({theme}) => ({
    fontSize: theme.fontSizes.xs,
    fontWeight: 900,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.53,
    letterSpacing: 0.45,
    [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.fontSizes.sm,
    }
  }),
};
