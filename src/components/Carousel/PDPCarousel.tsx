import React from 'react';
import {ISlide} from "./carousel.models";
import {StyledThumbSwiperCarousel} from "./ThumbSwiperCarousel";
import {Box} from "@market-ui/falcon-ui";
import GlobalStyleForFullscreenModal from "../../pages/shop/PDP/GlobalStylesForFullscreenModal";
import {cssMobileTillMdOnly} from "src/styling/cssHelper";

interface IPDPCarouselProps {
  slides: ISlide[];
  thumbs: ISlide[];
}

export const PDPCarousel = (props: IPDPCarouselProps) => {
  return <Box css={getPDPCarouselStyles()}>
    <GlobalStyleForFullscreenModal />
    <StyledThumbSwiperCarousel
      slides={props.slides}
      thumbs={props.thumbs}
      navigation={true}
    />
  </Box>
}

const PDPCarouselMobileCss = {
  width: '100%',
  maxWidth: 400
}

const getPDPCarouselStyles = (): any => ({
  width: 520,
  ...cssMobileTillMdOnly(PDPCarouselMobileCss)
});


