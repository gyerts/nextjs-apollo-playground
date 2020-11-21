import React from 'react';
import styled from 'styled-components';
import { Theme } from '@deity/falcon-ui';
import { themedBreakpoints } from 'src/theme/breakpoints';
import { Box, Image, Link, H4 } from '@deity/falcon-ui';

export interface PromoBannerComponent {
    url: string;
    text: string;
    image: {
        altText: string;
        url: string;
        code: string;
        mime?: string;
    };
    typeCode?: string;
    className?: string;
    uid?: string;
    theme?: Theme;
}

const PromoSectionBannerComponent = (props: PromoBannerComponent) => {
    return (
        <Box className={props.className}>
            <Link href={props.url}>
                <Image src={props.image.url} alt={props.image.altText}/>
                <H4 css={{textAlign: 'center'}}>{props.text}</H4>
            </Link>
        </Box>
    )
}

export const PromoSectionBanner = styled(PromoSectionBannerComponent)`
    
    @media (max-width: ${themedBreakpoints.sm}px) {
        margin-right: ${props => props.theme.spacing.xs}px;
    
        &:first-child {
            margin-right: 0;
        }
    }
    
    @media (min-width: ${themedBreakpoints.md}px) and (max-width: ${themedBreakpoints.lg}px) {
          & img {
            width: 300px;
        }
    }
`;
