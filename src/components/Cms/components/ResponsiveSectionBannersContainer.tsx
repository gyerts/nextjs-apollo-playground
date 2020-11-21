import React from 'react';
import { Carousel } from 'src/components/Carousel/Carousel';
import { withTheme } from '@deity/falcon-ui';
import { ThemeBreakpoints } from '@deity/falcon-ui/dist/theme';
import {
    BannerSource,
    CarouselBanner,
    ResponsiveBannerMedia,
    SimpleResponsiveBannerComponent
} from "../common/interfaces";

function getBreakpointsMap(breakpoints : ThemeBreakpoints): Map<string, string> {
    return new Map([
        ['mobile', `(max-width: ${breakpoints.sm}px)`],
        ['tablet', `'(min-width: ${breakpoints.sm as number + 1}px) and (max-width: ${breakpoints.md as number - 1}px)'`],
        ['desktop', `'(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg}px)'`],
        ['widescreen', `(min-width: ${breakpoints.lg as number + 1}px)`]
    ]);
}

function getBannersList(components: Array<SimpleResponsiveBannerComponent>, breakpoints: ThemeBreakpoints): Array<CarouselBanner> {
    const breakpointsMap = getBreakpointsMap(breakpoints);
    const breakpointsArray = Array.from(getBreakpointsMap(breakpoints).keys());

    return components.map(({media, urlLink} : {media: ResponsiveBannerMedia, urlLink: string}) => ({
            link: urlLink,
            src: media.widescreen.url,
            alt: media.widescreen.altText,
            source: breakpointsArray.map((key: any): BannerSource => (
                {
                    srcset: media[key].url,
                    media: breakpointsMap.get(key),
                    alt: media[key].altText
                }
            ))
        }
    ))
}

export const ResponsiveSectionBannersContainer = withTheme((props: any) => (
    <Carousel type='banner' bannersList = {getBannersList(props.components, props.theme.breakpoints)} />
))
