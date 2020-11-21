import {themed} from "@market-ui/falcon-ui";


export const UlStyled = themed({
  tag: 'ul',
  defaultTheme: {
    ulLayout: {
      m: 'none',

      css: ({theme}) => ({
        paddingInlineStart: +theme.spacing.sm + 4,

        'li': {
          listStyleType: 'unset',
          fontSize: +theme.fontSizes.xl + 1,
          textAlign: 'start',
        }
      })
    }
  }
});
