import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Icon } from '@market-ui/falcon-ui';
import { T } from '@market-ui/falcon-i18n';

const blogPostsPaginatorLayout = {
  blogPostsPaginatorLayout: {
    display: 'flex',
    my: 'xxxl'
  }
};

export const BlogPostsPaginator = ({ pagination, blogUrlBase }) => (
  <Box defaultTheme={blogPostsPaginatorLayout} justifyContent={!pagination.prevPage ? 'flex-end' : 'space-between'}>
    {pagination.prevPage && (
      <Link
        display="flex"
        lineHeight="small"
        fontSize="md"
        as={RouterLink}
        to={`${blogUrlBase}/${pagination.prevPage}`}
      >
        <Icon size="md" mr="xs" src="prevPage" /> <T id="blog.newerEntries" />
      </Link>
    )}
    {pagination.nextPage && (
      <Link
        display="flex"
        lineHeight="small"
        fontSize="md"
        as={RouterLink}
        to={`${blogUrlBase}/${pagination.nextPage}`}
      >
        <T id="blog.olderEntries" /> <Icon ml="xs" size="md" src="nextPage" />
      </Link>
    )}
  </Box>
);

BlogPostsPaginator.defaultProps = {
  blogUrlBase: '/blog'
};
