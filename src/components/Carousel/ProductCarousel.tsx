import React from 'react';
import {FeaturedProduct, IFeaturedProduct} from 'src/components/FeaturedProduct/FeaturedProduct'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, SwiperOptions} from 'swiper';
import styled from 'styled-components';
import {themedBreakpoints} from 'src/theme/breakpoints';
import {Box} from '@market-ui/falcon-ui';

SwiperCore.use([Navigation, Pagination]);

export interface IProductCarousel {
  products: IFeaturedProduct[];
  className?: string;
}

const ProductCarouselComponent = (props: IProductCarousel): JSX.Element => {

  const swiperProps: SwiperOptions = {
    spaceBetween: 30,
    navigation: true,
    pagination: true,
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 2
      },
      [themedBreakpoints.sm]: {
        slidesPerView: 4
      },
      [themedBreakpoints.md]: {
        slidesPerView: 5
      },
    }
  };

  return (
    <Box className={props.className}>
      <Swiper
        {...swiperProps}>
           {props.products.map((product: IFeaturedProduct) => {
            return (
              <SwiperSlide key={product.code}>
                <FeaturedProduct code={product.code} title={product.title} url={product.url} price={product.price} media={product.media} />
              </SwiperSlide>
          )})}
      </Swiper>
    </Box>
  )
};

export const ProductCarousel = styled(ProductCarouselComponent)` 
  .swiper-slide  img {
      max-width: 232px;
  }
  
  & div.swiper-container {
     padding-bottom: 30px;
     
    .swiper-wrapper {
      display: flex;
      align-items: top;
    }
    
    .swiper-button-next {
      right: 0;
    }
    
    .swiper-button-prev {
      left: 0;
    }
    
    .swiper-button-prev,
    .swiper-button-next {
      margin-top: 0;
      top: 40%;
      transform: translateY(-50%);
    
      @media(max-width: ${themedBreakpoints.sm}px) {
        
      }
    }
  }
`;