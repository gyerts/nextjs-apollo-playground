import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, SwiperOptions} from 'swiper';
import styled from 'styled-components';
import {themedBreakpoints} from 'src/theme/breakpoints';
import {Box, Theme} from '@deity/falcon-ui';
import {PromoBannerComponent, PromoSectionBanner} from '../PromoSectionBanner/PromoSectionBanner';

SwiperCore.use([Navigation, Pagination]);

interface IProductCarouselProps {
  slides: PromoBannerComponent[];
  theme: Theme;
  className?: string;
}

const PromoCarouselComponent = (props: IProductCarouselProps): JSX.Element => {

  const swiperProps: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 'auto',
    navigation: true,
    pagination: false,
    loop: true
  };

  return (
    <Box className={props.className}>
      <Swiper {...swiperProps}>
        {props.slides.map((comp: PromoBannerComponent, index: number) => {
          const bannerProps = {
            url: comp.url,
            image: comp.image,
            text: comp.text,
            theme: props.theme
          }
          return (
              <SwiperSlide key={`${comp.url}-${index.toString()}`}>
                <PromoSectionBanner  {...bannerProps}/>
              </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
};

export const PromoCarousel = styled(PromoCarouselComponent)` 
  & .swiper-wrapper .swiper-slide {
    width: auto;
    
    img {
      @media(max-width: ${themedBreakpoints.sm}px) {
          max-width: 220px;
        }
    }
  }
  & .swiper-container {
    .swiper-wrapper {
      display: flex;
      align-items: center;
      margin-top: ${({theme}) => theme.spacing.sm}px;
      margin-bottom: 0;
    }
  }
`;
