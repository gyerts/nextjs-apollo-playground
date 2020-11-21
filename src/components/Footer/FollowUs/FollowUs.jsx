import React from 'react';
import {Box, FlexLayout, Link, themed} from '@deity/falcon-ui';
import styled from "styled-components";
import {iconSpriteUrl} from "../../../theme/variables";

export const FollowUsLayout = themed({
    tag: Box,
    defaultTheme: {
        followUsLayout: {
            p: 'md',
            color: 'white',
            fontSize: 'xs',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            bgFullWidth: 'black',
            fontWeight: 'bold',
            css: {
                textAlign: 'center',
            }
        }
    }
});

export const FollowUsInner = (props) => (
    <div className={props.className}>
        <FollowUsLayout>
            <FlexLayout justifyContent='center'>
                <Link mr='sm'
                      href='https://www.instagram.com/wow.cosmetics.israel'
                      target='_blank'
                      className='icon-instagram' />
                <Link href='https://www.facebook.com/wow.israel'
                      target='_blank'
                      className='icon-facebook' />
            </FlexLayout>
        </FollowUsLayout>
    </div>
);

export const FollowUs = styled(FollowUsInner) `
    a[class^='icon-'] {
      background-image: url(${iconSpriteUrl});
      background-repeat: no-repeat;
      width: 15px;
      height: 15px;
      display: inline-block;
    }
    
    .icon-instagram {
      background-position-x: -224px;
      background-position-y: -261px;
    }
    
    .icon-facebook {
      background-position-x: -255px;
      background-position-y: -261px;
    }
`;
