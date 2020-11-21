import {ThemedComponentPropsWithVariants} from "@market-ui/falcon-ui";

// TODO: add colors to custom local interface/type

export const themedBreadcrumb: ThemedComponentPropsWithVariants = {
  css: ({theme}) => ({
    '::after': {
      content: '" / "',
      margin: '0 8px',
    },
    color: (theme.colors as any).grey,
    ':last-child': {
      pointerEvents: 'none',
      fontWeight: theme.fontWeights.regular,
      color: (theme.colors as any).disabledTextDark,
      '::after': {
        display: 'none'
      }
    }
  })
};
