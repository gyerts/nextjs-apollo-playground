import {ThemedComponentPropsWithVariants} from "@deity/falcon-ui";

export const themedMenu: ThemedComponentPropsWithVariants = {
  css: ({theme}) => ({
  }),
  variants: {
    "tabs": {
      css: ({theme}) => ({
        backgroundColor: 'transparent',
      }),
    }
  }
};
