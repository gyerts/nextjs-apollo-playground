import {ThemedComponentPropsWithVariants} from "@market-ui/falcon-ui";


export const themedText: ThemedComponentPropsWithVariants = {
  variants: {
    uppercase: {
      css: {
        textTransform: 'uppercase',
      }
    },
    small: {
      fontSize: 'xxs',
    },
    bold: {
      fontWeight: 'bold',
    }
  }
};
