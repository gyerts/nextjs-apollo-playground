import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {FlexLayout, Image, Link, H3, Box} from '@market-ui/falcon-ui';
import {DangerousText} from "src/components";


export interface IFeaturedProduct {
  code: string;
  title: string;
  url: string;
  price: string;
  media: {
    altText: string;
    mime: string;
    url: string;
  }
}

export const FeaturedProduct = (props: IFeaturedProduct) => {
  return (
    <Link as={RouterLink} to={props.url}>
      <FlexLayout flexDirection='column' alignItems='center' justifyContent='center' flexWrap='nowrap'>
        <Image src={props.media.url} alt={props.media.altText} />
        <H3 fontWeight='regular'
            fontSize={{'sm': 'sm', 'md': 'sm'}}
            borderTop='regular'
            mt='lg'
            css={{
              'width': '100%',
              'WebkitLineClamp': 2,
              'overflow': 'hidden',
              'display': '-webkit-box',
              'WebkitBoxOrient': 'vertical'
            }}
            title={props.title}
        >
          <DangerousText>{props.title}</DangerousText>
        </H3>
        <Box fontWeight='bold' css={{width:'100%'}}>
          {props.price}
        </Box>
      </FlexLayout>
    </Link>
  )
};
