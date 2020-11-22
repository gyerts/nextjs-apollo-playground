import {Swiper, SwiperSlide} from "swiper/react";
import Link from 'next/link';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import {ResponsiveImage} from "../ResponsiveImage/ResponsiveImage";
import React from "react";
import styled from "styled-components";
import {swiperStyles} from "./SwiperStyles";

SwiperCore.use([Navigation, Pagination]);

interface CarouselProps {
    slides: Array<any>;
    slidesPerView?: number;
    pagination?: boolean;
    navigation?: boolean;
    className?: string;
}

interface SlideContent {
    link: string;
    src: string;
    alt: string;
    mime?: string;
    source: {
        srcset: string;
        media: string;
        alt: string;
    }[];

}

const SwiperCarousel =  (props: CarouselProps) => {
    const swiperProps = {
        slidesPerView: props.slidesPerView || 1,
        loop: true
    };
    return (
        <div className={props.className}>
            <Swiper
                navigation={!!props.navigation}
                pagination={!!props.pagination}
                {...swiperProps}
            >
                {props.slides.map((slideContent: SlideContent) => {

                    const imageProps = {
                        src: slideContent.src,
                        source: slideContent.source,
                        alt: slideContent.alt
                    }

                    return (<SwiperSlide key={slideContent.src}>
                        <Link href={slideContent.link}>
                            <ResponsiveImage {...imageProps} />
                        </Link>
                    </SwiperSlide>
                    )})}
            </Swiper>
        </div>
    );
};

export const StyledSwiperCarousel = styled(SwiperCarousel)`${swiperStyles}`;
