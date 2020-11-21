import React from 'react';
import { BlogPostQuery, BlogPost } from 'src/uikitEjected';

const Post = ({ path }) => (
  <BlogPostQuery variables={{ path }}>{postProps => <BlogPost {...postProps} />}</BlogPostQuery>
);

export default Post;
