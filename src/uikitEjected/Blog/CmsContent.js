import React from 'react';
import { Box } from '@market-ui/falcon-ui';

const cmsContentTheme = {
  cmsContent: {
    fontSize: 'md',
    css: ({ theme }) => ({
      maxWidth: 740,
      margin: '0 auto',

      p: {
        margiTop: 0,
        marginBottom: theme.spacing.md
      },
      img: {
        objectFit: 'contain',
        maxWidth: '100%'
      },
      figure: {
        marginBottom: theme.spacing.xxl
      }
    })
  }
};

export const CMSContent = ({ html }) => (
  <Box defaultTheme={cmsContentTheme} dangerouslySetInnerHTML={{ __html: html }} />
);
