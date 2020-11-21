import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Breadcrumbs as BreadcrumbsLayout, Link, Text, themed} from '@market-ui/falcon-ui';


export const Breadcrumb = themed({
  tag: 'li',

  defaultTheme: {
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',

      css: ({ theme }) => ({
        '::after': {
          content: '"/"',
          color: '#4e4e4e',
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs,
          display: 'block'
        },

        ':last-child': {
          pointerEvents: 'none',
          '::after': {
            display: 'none'
          }
        }
      })
    }
  }
});


export const Breadcrumbs = ({ breadcrumbs }) => (
  <BreadcrumbsLayout>
    {breadcrumbs.map((breadcrumb, i) => (
      <Breadcrumb key={breadcrumb.name}>
        {breadcrumb.urlPath ? (
          <Text
                css={{
                  color: breadcrumbs.length-1 === i ? '#1b1c1d' : '#4e4e4e',
                  fontSize: '14px',
                  fontWeight: 400
                }}>
            {breadcrumb.name}
          </Text>
        ) : (
          <Text>{breadcrumb.name}</Text>
        )}
      </Breadcrumb>
    ))}
  </BreadcrumbsLayout>
);
