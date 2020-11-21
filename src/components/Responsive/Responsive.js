import React from 'react';
import MediaQuery from 'react-responsive';
import { withTheme } from '@market-ui/falcon-ui';

const ResponsiveImpl = props => {
  const { theme, width, maxWidth, minWidth, height, ...rest } = props;

  let responsiveProps = {};

  if (width !== undefined) {
    responsiveProps = {
      ...responsiveProps,
      minWidth: theme.breakpoints[width] + 1 || width
    };
  }

  if (minWidth !== undefined) {
    responsiveProps = {
      ...responsiveProps,
      minWidth: theme.breakpoints[minWidth] || minWidth
    };
  }

  if (maxWidth !== undefined) {
    responsiveProps = {
      ...responsiveProps,
      maxWidth: theme.breakpoints[maxWidth]-1 || maxWidth-1
    };
  }

  if (height !== undefined) {
    responsiveProps = {
      ...responsiveProps,
      minHeight: theme.breakpoints[height] || height
    };
  }

  return <MediaQuery {...responsiveProps} {...rest} />;
};

export const Responsive = withTheme(ResponsiveImpl);
