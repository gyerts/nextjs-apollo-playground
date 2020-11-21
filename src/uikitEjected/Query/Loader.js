import React from 'react';
import { Icon, Box, themed } from '@market-ui/falcon-ui';
import { colorsFromDesign } from 'src/theme/colors';

const LoaderInnerDOM = props => (
  <Box {...props}>
    <Icon src="loader" css={{fill: colorsFromDesign.Pink}}/>
  </Box>
);

export const Loader = themed({
  tag: LoaderInnerDOM,
  defaultTheme: {
    loader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      css: {
        height: '100vh',
        width: '100%'
      },
      variants: {
        overlay: {
          position: 'absolute',
          css: {
            background: 'rgba(255, 255, 255, 0.7)',
            height: '100%',
            width: '100%',
            zIndex: 1
          }
        }
      }
    }
  }
});
