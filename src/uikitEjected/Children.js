import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Breadcrumbs as BreadcrumbsLayout, Link, Text, themed} from '@market-ui/falcon-ui';


export const Child = themed({
  tag: 'li',

  defaultTheme: {
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',

      css: ({ theme }) => ({
        color: '#7b7b7b',
        '::after': {
          content: '" "',
          color: '#4e4e4e',
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs,
          display: 'block'
        },
        ':last-child': {
          color: '#000000',
          '::after': {
            display: 'none'
          }
        }
      })
    }
  }
});

export const Children = ({ children }) => (
  <BreadcrumbsLayout className={'children'}>
    {children.map((child, i) => (
      <Child className={'child'} key={child.name} css={{
        marginLeft: 10,
        marginRight: 10,
        '::after': {
          content: '""',
        },
        ':last-child': {
          color: '#7b7b7b !important'
        },
        ':hover': {
          cursor: 'pointer',
          color: '#000 !important'
        }
      }}>
        {child.urlPath ? (
          <Link as={RouterLink}
                to={child.urlPath}
                css={{
                  color: children.length-1 === i ? '#000000' : '#4e4e4e',
                  fontSize: '14px',
                  fontWeight: 400,
                }}>
            {child.name}
          </Link>
        ) : (
          <Text>{child.name}</Text>
        )}
      </Child>
    ))}
  </BreadcrumbsLayout>
);
