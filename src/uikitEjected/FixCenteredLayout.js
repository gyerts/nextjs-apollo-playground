import { Box, themed } from '@market-ui/falcon-ui';

export const FixCenteredLayout = themed({
  tag: Box,
  defaultProps: {
    maxWidth: '70%'
  },
  defaultTheme: {
    fixCenteredLayout: {
      css: ({ maxWidth }) => ({
        maxWidth,
        width: '100%',
        margin: '0 auto'
      })
    }
  }
});
