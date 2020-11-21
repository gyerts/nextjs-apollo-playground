import {ThemedComponentPropsWithVariants} from "@deity/falcon-ui";

export const themedH3: ThemedComponentPropsWithVariants = {
  color: 'black',
  css: ({theme}) => ({
    fontSize: theme.fontSizes.md,
    fontWeight: 900,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.7,
    letterSpacing: 0.6,
    [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.fontSizes.xl,
    }
  }),
  variants: {
    'small': {
      css: ({theme}) => ({
        textTransform: 'uppercase',
        [`@media screen and (min-width: ${theme.breakpoints.sm}px)`]: {
          fontSize: theme.fontSizes.md,
        }
      })
    }
  },
};
