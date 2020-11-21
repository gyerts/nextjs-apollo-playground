import {Theme, ThemedComponentPropsWithVariants} from "@market-ui/falcon-ui";

export const underlineCss = (theme: Theme) => ({
  textDecoration: 'underline !important',
  // textUnderlineOffset: '0.1em !important',
  // textUnderlinePosition: 'under !important',
  // textDecorationColor: `${theme.colors.secondaryText} !important`,
});

export const themedLink: ThemedComponentPropsWithVariants = {
  fontSize: 'md',

  css: ({theme}) => ({
    lineHeight: 1.5,
    letterSpacing: 0.48,
  }),

  variants: {
    'underlined': {
      css: ({theme}) => ({
        ...underlineCss(theme),
      }),
    },
    'small': {
      fontSize: 'xxs',
    },
    'small-underlined': {
      fontSize: 'xxs',
      css: ({theme}) => ({
        ...underlineCss(theme),
      }),
    },
    'nav-special': {
      fontSize: 'sm',
      css: ({theme}: any) => ({
        color: theme.colors.menuSpecialLink,
        fontWeight: 800,
      })
    },
    'nav': {
      fontSize: 'sm',
      css: ({theme}: any) => ({
        ':hover, :active, :focus': {
          color: theme.colors.secondaryText,
        },
      })
    },
    'nav-selected': {
      fontSize: 'sm',
      css: ({theme}) => ({
        fontWeight: 'bold',
        ...underlineCss(theme),
      }),
    },
  },
};
