import {CSSObject, ThemedComponentPropsWithVariants} from "@market-ui/falcon-ui";
import {underlineCss} from "./link";

const commonCss = (theme: any): CSSObject => ({
  backgroundColor: 'transparent',
  fontWeight: 'normal',
  lineHeight: 1.2,
  color: theme.colors.black,
  borderTop: theme.borders.regular,
  borderColor: theme.colors.secondaryDark,

  // when we add borderBottom we have an extra 1px to the borderTop of the next child,
  // we need to hide it by negative margin,
  // so will join 1st::borderBottom and 2nd::borderTop to 1px line, instead of 2px
  borderBottom: theme.borders.regular,
  marginBottom: -1,
});

const aHoveredCss = (theme: any): CSSObject => ({
  ':hover': {
    'a': {
      ...underlineCss(theme),
      color: theme.colors.black,
      backgroundColor: 'transparent',
    }
  },
  'a:focus': {
    color: theme.colors.black,
  },
});

export const themedMenuItem: ThemedComponentPropsWithVariants = {
  variants: {
    "tab-active": {
      css: ({theme}) => ({
        ...commonCss(theme),
        backgroundColor: theme.colors.primaryDark,
        borderLeft: `4px solid ${theme.colors.black}`,
        fontWeight: 'bold',
        ...aHoveredCss(theme)
      }),
    },
    "tab": {
      css: ({theme}) => ({
        borderLeft: `4px solid transparent!important`,
        ...commonCss(theme),
        ...aHoveredCss(theme),
      }),
    }
  }
};
