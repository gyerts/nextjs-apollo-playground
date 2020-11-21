import React, {ReactElement} from 'react';
import {H2, withTheme} from '@market-ui/falcon-ui';
import styled from 'styled-components';
import {IShopAllCategoriesComponent, Component} from '../common/interfaces';
import {Box, List, ListItem, Link} from '@market-ui/falcon-ui';
import {bothResolutions} from 'src/styling/cssHelper';

const ShopAllCategories = (props: IShopAllCategoriesComponent): ReactElement => {
  return (
    <Box className={props.className}>
      <H2 variant='upper' >{props.name}</H2>
      <List pt={{'xs': 'sm', 'sm':'lg'}} pb={{'xs': 'sm', 'sm':'lg'}} css={{
        flexDirection: (bothResolutions('column', 'row') as any),
        display: 'flex',
      }}
          m='none'
          p='none'
          className='category-list'
          role='navigation'>
        {props.components.map((comp: Component, index: number): JSX.Element => (
          <ListItem
            className='category-item'
            m='xs'
            key={`${comp.uid}-${index.toString()}`}>
            <Link
              href={comp.url}
              p='xs'
              fontSize='xs'
              color='black'
              bg='primary'
              css={{display: 'block' }}
            >{comp.title}</Link>
          </ListItem>
          )
        )}
      </List>
    </Box>
  )
}

const ShopAllCategoriesComponent = styled(ShopAllCategories)`
    text-align: center;
    
    .category-list {
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }
    
    & .category-item {
        border-radius: 1px;
        width: 100%;
        max-width: 240px;
        font-weight: 900;
        text-decoration: none;
        text-transform: uppercase;
    }
   
`;

export const ShopAllCategoriesContainer = withTheme((props: IShopAllCategoriesComponent): ReactElement => {
  return (
    <ShopAllCategoriesComponent  {...props} />
  )
});