import React from 'react';
import styled from "styled-components";
import {SharedRatingProps} from './Rating';

export type StarComponentProps = SharedRatingProps & {
    selected: boolean;
}

export const StarIcon: React.FC<any> = ({fill, width, height}) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        viewBox="0 0 18 17">
        <path d="M9 0l2.781 5.6L18 6.5l-4.5 4.349L14.562 17 9 14.096l-5.562 2.9L4.5 10.849 0 6.493l6.219-.9z"/>
    </svg>
)

export const StyledStar = styled(StarIcon)`
    display: block;
`;

export const Star: React.FC<StarComponentProps> = ({selected, activeFill, inactiveFill, size}) => {
    return <StarIcon 
                width={size} 
                height={size} 
                fill={selected ? activeFill : inactiveFill}
            />
}