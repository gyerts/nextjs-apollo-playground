import React from 'react';
import {Box, extractThemableProps, themed, ThemedComponentProps} from "@market-ui/falcon-ui";
import {bothResolutions} from "src/styling/cssHelper";
const Pace = require('src/libs/pace.min');

interface IProps extends ThemedComponentProps {
  children: any
  id?: string
  loading?: boolean
}
export function Card (props: IProps) {
  const { themableProps } = extractThemableProps(props);
  return (
    <Box id={props.id} position='relative' {...themableProps}>
      <Box css={{position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1}}>
        {props.loading && <Pace color="#2e2e2e" height={2} />}
      </Box>
      <CardInner {...themableProps} variant={props.loading && 'loading'}>
        {props.children}
      </CardInner>
    </Box>
  );
}

const CardInner = themed({
  tag: Box,
  defaultTheme: {
    cardTheme: {
      p: bothResolutions('xs', 'lg'),
      bg: 'white',
      css: {
        height: 'fit-content',
      },
      variants: {
        grow: {
          css: {
            height: 'unset',
          }
        },
        loading: {
          css: {
            backgroundColor: '#e7e7fd',
          }
        }
      }
    },
  }
});
