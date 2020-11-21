import React, {useCallback, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, Thumbs} from 'swiper';
import styled from "styled-components";
import {Box, Image} from '@deity/falcon-ui';
import {ISlide} from "./carousel.models";
import {swiperStyles} from "./SwiperStyles";
import {iconSpriteUrl} from "src/theme/variables";
import {FullScreenIcon} from "src/styling";
import {ICssObject} from "src/common/models";
import {useModalContext} from "src/components/Modal/context";
import {themedBreakpoints} from "src/theme/breakpoints";
import {cssMobileTillMdOnly} from "src/styling/cssHelper";

SwiperCore.use([Navigation, Pagination, Thumbs]);

interface CarouselProps {
  slides: Array<ISlide>;
  thumbs: ISlide[];
  slidesPerView?: number;
  pagination?: boolean;
  navigation?: boolean;
  className?: string;
}

const ThumbSwiperCarousel = (props: CarouselProps) => {
  const swiperProps = {
    slidesPerView: props.slidesPerView || 1,
    loop: true,
    pagination: {
      clickable: true
    }
  };
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { openModal } = useModalContext();
  const openFullScreenImageModal = useCallback((slideContent: ISlide) => {
    openModal(null, () => (
      <Box
        display={'flex'}
        justifyContent={'center'}
      >
        <Image
          src={slideContent.bigSrc || slideContent.src}
          alt={slideContent.alt}
        />
      </Box>
    ), {
      className: 'fullScreenImageModal',
      bigContent: true
    });
  }, []);

  return (
    <div className={props.className}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        css={{
          width: 520,
          ...cssMobileTillMdOnly({
            maxWidth: 400,
            width: '100%'
          })
        }}
      >
        <Swiper
          id={'thumbs'}
          navigation
          direction={'vertical'}
          slidesPerView={4}
          onSwiper={setThumbsSwiper}
        >
          {props.thumbs.map((slideContent: ISlide, i: number) => {
            const imageProps = {
              src: slideContent.src,
              alt: slideContent.alt
            }
            return (
              <SwiperSlide key={slideContent.src + i}>
                <Image
                  {...imageProps}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>

        <Swiper
          id="main"
          thumbs={{swiper: thumbsSwiper}}
          navigation={!!props.navigation}
          pagination={!!props.pagination}
          watchSlidesVisibility
          watchSlidesProgress
          {...swiperProps}
        >
          {props.slides.map((slideContent: ISlide, i: number) => {
            return (
              <SwiperSlide
                key={slideContent.src + i}
              >
                <Box
                  onClick={() => openFullScreenImageModal(slideContent)}
                  css={getFullScreenIconStyles()}
                >
                  <FullScreenIcon />
                </Box>
                <Image
                  src={slideContent.src}
                  alt={slideContent.alt}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </div>
  );
};

const getFullScreenIconStyles = (): ICssObject => ({
  display: 'inline-block',
  textAlign: 'center',
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, .5)',
  position: 'absolute',
  width: 18,
  height: 18,
  bottom: 1,
  right: 1
});

const thumbsSwiperStyles: string = `
#main {
  max-width: 400px;
  width: 100%;
  margin: 0;
  .swiper-slide {
    display: flex;
  }
}

#thumbs {
  max-height: 600px;
  width: 90px;
  margin: 0;
  padding-top: 15px;
  
  .swiper-button-prev,
  .swiper-container-rtl .swiper-button-prev {
    top: -11px;
    bottom: auto;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    background: transparent;
    &:after {
      background: url('${iconSpriteUrl}') -221px -144px;
      width: 15px;
    }
  }
  
  .swiper-button-next,
  .swiper-container-rtl .swiper-button-next {
    top: auto;
    bottom: -11px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    background: transparent;
    &:after {
      background: url('${iconSpriteUrl}') -188px -144px;
      width: 15px;
    }
  }
    
}

@media (max-width: ${themedBreakpoints.md}px) {
  #thumbs {
    display: none;
  }
  
  .swiper-button-prev {
    display: none;
  }
  
  .swiper-button-next {
    display: none;
  }
}

@media (min-width: ${themedBreakpoints.md}px) {
  .swiper-pagination {
    display: none;
  }
}
`;

export const StyledThumbSwiperCarousel = styled(ThumbSwiperCarousel)`
${swiperStyles}
${thumbsSwiperStyles}
`;
