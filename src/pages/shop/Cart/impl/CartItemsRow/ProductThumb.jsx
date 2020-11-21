import React from "react";
import {Box, FlexLayout, Image, Link} from "@market-ui/falcon-ui";
import {Link as RouterLink} from "react-router-dom";

export const ProductThumb = ({gridArea, url, sku, ...props}) => {
  return (
    <FlexLayout gridArea={gridArea} justifyContent='start' {...props}>
      <Link as={RouterLink} to={`/p/${sku}`}><Box as={Image} src={url} /></Link>
    </FlexLayout>
  )
};

