import React from 'react';
import {BannerCarousel, SlideContent} from './BannerCarousel';
import {ProductCarousel} from './ProductCarousel';
import {PromoCarousel} from './PromoCarousel';
import styled from 'styled-components';
import {iconSpriteUrl} from 'src/theme/variables';
import {Theme, withTheme, Box} from '@deity/falcon-ui';
import {IFeaturedProduct} from 'src/components/FeaturedProduct/FeaturedProduct';
import {PromoBannerComponent} from "../PromoSectionBanner/PromoSectionBanner";

type CarouselType = 'product' | 'banner' | 'promo';
type bannerList = SlideContent[] & PromoBannerComponent[];

interface ICarouselFactoryProps {
  className: string;
  type: CarouselType;
  theme: Theme;
  products?: IFeaturedProduct[];
  bannersList?: bannerList;

}

const CarouselFactory = (props: ICarouselFactoryProps): JSX.Element => {
  switch(props.type) {
    case 'product':
      return (
        <Box className={props.className}>
          <ProductCarousel products={props.products} theme={props.theme} />
        </Box>
      );
    case 'banner':
      return (
        <Box className={props.className} mt='sm'>
          <BannerCarousel slides = {props.bannersList} navigation pagination/>
        </Box>
      );
    case 'promo':
      return (
          <Box className={props.className}>
            <PromoCarousel slides = {props.bannersList} theme={props.theme} />
          </Box>
      );
  }
}

export const Carousel = withTheme((props: any) => (
    <StyledCarousel {...props} />
));


export const StyledCarousel = styled(CarouselFactory) `
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  /* Fix of Webkit flickering */
  z-index: 1;
}
.swiper-container-vertical > .swiper-wrapper {
  flex-direction: column;
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}
.swiper-container-android .swiper-slide,
.swiper-wrapper {
  transform: translate3d(0px, 0, 0);
}
.swiper-container-multirow > .swiper-wrapper {
  flex-wrap: wrap;
}
.swiper-container-multirow-column > .swiper-wrapper {
  flex-wrap: wrap;
  flex-direction: column;
}
.swiper-container-free-mode > .swiper-wrapper {
  transition-timing-function: ease-out;
  margin: 0 auto;
}
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
}
.swiper-slide img {
    max-width: 100%;
}
.swiper-slide-invisible-blank {
  visibility: hidden;
}
/* Auto Height */
.swiper-container-autoheight {
  &,
  .swiper-slide {
    height: auto;
  }

  .swiper-wrapper {
    align-items: flex-start;
    transition-property: transform, height;
  }
}

/* 3D Effects */
.swiper-container-3d {
  perspective: 1200px;
  .swiper-wrapper,
  .swiper-slide,
  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right,
  .swiper-slide-shadow-top,
  .swiper-slide-shadow-bottom,
  .swiper-cube-shadow {
    transform-style: preserve-3d;
  }
  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right,
  .swiper-slide-shadow-top,
  .swiper-slide-shadow-bottom {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  }
  .swiper-slide-shadow-left {
    background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }
  .swiper-slide-shadow-right {
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }
  .swiper-slide-shadow-top {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }
  .swiper-slide-shadow-bottom {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }
}

/* CSS Mode */
.swiper-container-css-mode {
  > .swiper-wrapper {
    overflow: auto;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  > .swiper-wrapper > .swiper-slide {
    scroll-snap-align: start start;
  }
}
.swiper-container-horizontal.swiper-container-css-mode {
  > .swiper-wrapper {
    scroll-snap-type: x mandatory;
  }
}
.swiper-container-vertical.swiper-container-css-mode {
  > .swiper-wrapper {
    scroll-snap-type: y mandatory;
  }
}

/* NAVIGATIOM */

:root {
  --swiper-navigation-size: 30px;
}
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  color: var(--swiper-navigation-color, var(--swiper-theme-color));
  &.swiper-button-disabled {
    opacity: 0.35;
    cursor: auto;
    pointer-events: none;
  }
  &:after {
    font-family: swiper-icons;
    font-size: var(--swiper-navigation-size);
    text-transform: none !important;
    letter-spacing: 0;
    text-transform: none;
    font-variant: initial;
    line-height: 1;
  }
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-next {
  &:after {
    content: '';
    background: url('${iconSpriteUrl}') -334px -144px;
    width: 14px;
    height: 32px;
  }
  right: 10px;
  left: auto;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-prev {
  &:after {
    content: '';
    background: url('${iconSpriteUrl}') -366px -144px;
    width: 14px;
    height: 32px;
  }
  left: 10px;
  right: auto;
}

/* PAGINATION */

.swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 300ms opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  &.swiper-pagination-hidden {
    opacity: 0;
  }
}
/* Common Styles */
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 10px;
  left: 0;
  width: 100%;
}
/* Bullets */
.swiper-pagination-bullets-dynamic {
  overflow: hidden;
  font-size: 0;
  .swiper-pagination-bullet {
    transform: scale(0.33);
    position: relative;
  }
  .swiper-pagination-bullet-active {
    transform: scale(1);
  }
  .swiper-pagination-bullet-active-main {
    transform: scale(1);
  }
  .swiper-pagination-bullet-active-prev {
    transform: scale(0.66);
  }
  .swiper-pagination-bullet-active-prev-prev {
    transform: scale(0.33);
  }
  .swiper-pagination-bullet-active-next {
    transform: scale(0.66);
  }
  .swiper-pagination-bullet-active-next-next {
    transform: scale(0.33);
  }
}
.swiper-pagination-bullet {
  width: 16px;
  height: 2px;
  display: inline-block;
  background: #d5d5d5;
  @at-root button#{&} {
    border: none;
    margin: 0;
    padding: 0;
    box-shadow: none;
    appearance: none;
  }
  .swiper-pagination-clickable & {
    cursor: pointer;
  }
}
.swiper-pagination-bullet-active {
  width: 24px;
  background-color: #000;
}

.swiper-container-vertical {
  > .swiper-pagination-bullets {
    right: 10px;
    top: 50%;
    transform: translate3d(0px, -50%, 0);
    .swiper-pagination-bullet {
      margin: 6px 0;
      display: block;
    }
    &.swiper-pagination-bullets-dynamic {
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      .swiper-pagination-bullet {
        display: inline-block;
        transition: 200ms transform, 200ms top;
      }
    }
  }
}
.swiper-container-horizontal {
  > .swiper-pagination-bullets {
    .swiper-pagination-bullet {
      margin: 0 4px;
    }
    &.swiper-pagination-bullets-dynamic {
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      .swiper-pagination-bullet {
        transition: 200ms transform, 200ms left;
      }
    }
  }
  &.swiper-container-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
    transition: 200ms transform, 200ms right;
  }
}
/* Progress */
.swiper-pagination-progressbar {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
  .swiper-pagination-progressbar-fill {
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: scale(0);
    transform-origin: left top;
  }
  .swiper-container-rtl & .swiper-pagination-progressbar-fill {
    transform-origin: right top;
  }
  .swiper-container-horizontal > &,
  .swiper-container-vertical > &.swiper-pagination-progressbar-opposite {
    width: 100%;
    height: 4px;
    left: 0;
    top: 0;
  }
  .swiper-container-vertical > &,
  .swiper-container-horizontal > &.swiper-pagination-progressbar-opposite {
    width: 4px;
    height: 100%;
    left: 0;
    top: 0;
  }
}
`
