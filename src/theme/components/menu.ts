import {ThemedComponentPropsWithVariants} from "@market-ui/falcon-ui";

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
