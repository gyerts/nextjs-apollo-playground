import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, H1, Breadcrumbs, Breadcrumb, Link } from '@market-ui/falcon-ui';
import { T } from '@market-ui/falcon-i18n';
import { DateFormat } from '../Locale';
import { CMSContent } from './CmsContent';

const blogPostLayout = {
  blogPostLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mb: 'xxxl'
  }
};

export const BlogPost = ({ blogPost }) => (
  <Box as="article" defaultTheme={blogPostLayout}>
    <Breadcrumbs my="md" alignSelf="flex-start">
      <Breadcrumb key="index">
        <Link to="/blog" as={RouterLink}>
          <T id="blog.title" />
        </Link>
      </Breadcrumb>
      <Breadcrumb key="post">{blogPost.title}</Breadcrumb>
    </Breadcrumbs>
    <H1>{blogPost.title}</H1>
    <DateFormat mb="xl" value={blogPost.date} />
    <CMSContent html={blogPost.content} />
  </Box>
);
