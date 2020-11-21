import {Box, FlexLayout, Theme, withTheme} from '@deity/falcon-ui';
import React from 'react';
import {Carousel} from 'src/components/Carousel/Carousel';
import {PromoBannerComponent, PromoSectionBanner} from "../../PromoSectionBanner/PromoSectionBanner";
import {ResponsiveIf} from "../../ResponsiveIf";

interface IPromoSectionBannerProps {
  components: PromoBannerComponent[];
  slideLimit: number;
  theme: Theme;
}

export const PromoSectionBannerContainer = withTheme((props: IPromoSectionBannerProps): JSX.Element => {
  return (
    <Box mt={{'xs': 'none', 'sm':'lg'}} mb={{'xs': 'sm', 'sm':'lg'}}>
      <ResponsiveIf minWidth='md'>
        <FlexLayout justifyContent='space-evenly' flexWrap='nowrap'>
        {props.components.slice(0, (props.slideLimit || 3)).map((comp: PromoBannerComponent) => {
            const bannerProps = {
              uid: comp.uid,
              url: comp.url,
              image: comp.image,
              text: comp.text,
              theme: props.theme
            };

            return (
                <PromoSectionBanner key={comp.uid} {...bannerProps}/>
              )
          })}
        </FlexLayout>
      </ResponsiveIf>
      <ResponsiveIf maxWidth='md'>
        <Carousel type='promo' bannersList = {props.components} />
      </ResponsiveIf>
    </Box>
  )
})
