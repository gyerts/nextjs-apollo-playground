import {ThemedComponentPropsWithVariants} from "@market-ui/falcon-ui";


export const themedH6: ThemedComponentPropsWithVariants = {
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
