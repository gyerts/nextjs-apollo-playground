import React from 'react';
import {Box, Image, themed} from '@deity/falcon-ui';
import Link from 'next/link';
import {Component} from "../common/interfaces";
import {toGridTemplate} from "../../../uikitEjected/helpers";

interface IOurSecretsBannersComponentProps {
  components: Component[];
}
const bannerArea = {
  left: 'left',
  right: 'right'
}

const OurSecretsBannersLayout = themed({
  tag: Box,
  defaultTheme: {
    OurSecretsBannersLayout: {
      display: 'grid',
      pt: {xs: 'sm', sm: 'lg'},
      gridColumnGap: {xs: 'sm', md: 'md'},
      gridRowGap: {xs: 'sm', md: 'md'},
      gridTemplate: {
        xs: toGridTemplate([
          ['1fr'],
          [bannerArea.left],
          [bannerArea.right]
        ]),
        sm: toGridTemplate([
          ['1fr', '1fr'],
          [bannerArea.left, bannerArea.right]
        ])
      }
    }
  }
});

export const OurSecretsBannersComponent = (props: IOurSecretsBannersComponentProps)=>{
  return (
    <OurSecretsBannersLayout>
      {props.components.map((item: Component, index: number)=>(
        <Box css={{'width': '100%'}} key={index}>
          <Link to={item.urlLink}>
            <Image css={{'width': '100%'}} src={item.media.url} alt={item.media.altText} />
          </Link>
        </Box>
      ))}
    </OurSecretsBannersLayout>
    );
};
