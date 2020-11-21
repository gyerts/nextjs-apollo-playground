import {ThemedComponentPropsWithVariants} from "@market-ui/falcon-ui";


export const themedInput: ThemedComponentPropsWithVariants = {
  borderRadius: 'none',

  css: ({invalid, theme}: any) => ({
    width: 'auto', // redefine native Input width 100%, if width 100% Input goes outside of the form

    borderColor: invalid ? theme.colors.error : theme.colors.hr,
    WebkitAppearance: 'none',
    outline: 'none !important',

    ':focus': {
      borderColor: theme.colors.hr
    },
  }),

  variants: {
    grayed: {
      bg: 'primary',
    },
  }
};
