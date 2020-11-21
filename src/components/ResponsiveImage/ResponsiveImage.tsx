import React from 'react';

interface ResponsiveImageProps {
    src: string;
    alt?: string;
    source?: {
        srcset: string;
        media: string;
    }[];
    class?: string;
}

export const ResponsiveImage = (props: ResponsiveImageProps) => {
    return (
        <picture className={props.class}>
            {props.source.map((item: any, index: number) => (
                <source key={item.src + index.toString()} srcSet={item.srcset} media={item.media}/>
            ))}

            <img src={props.src} alt={props.alt} />
        </picture>
    )
};