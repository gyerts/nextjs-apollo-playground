import React from 'react';
import {Box, H2} from '@market-ui/falcon-ui';
import {Carousel} from 'src/components/Carousel/Carousel';
import {Component} from "../common/interfaces";

interface ICategoryProductDetailsProps {
  name: string;
  components: Component[];
}

export const CategoryProductDetailsContainer = (props: ICategoryProductDetailsProps) => {
  return (
    <Box pb={{'xs': 'sm', 'sm':'lg'}} bgFullWidth='primary'>
      <H2 css={{
          textAlign: 'center'
        }}
          mb={{'xs': 'sm', 'sm':'lg'}}
      >
        {props.name}
      </H2>
      {props.components.map((comp: Component, index: number) => (
        <Carousel type='product' products={comp.products} key={`${comp.uid}-${index.toString()}`}/>
      ))}
    </Box>
  )
};