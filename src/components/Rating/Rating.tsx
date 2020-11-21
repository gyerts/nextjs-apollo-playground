import React from 'react'
import {colorsFromDesign} from 'src/theme/colors'
import {Star} from './Star'
import {FlexLayout, List, ListItem, themed} from '@market-ui/falcon-ui'

export interface SharedRatingProps {
  activeFill?: string
  inactiveFill?: string
  size: number | string
}

export type RatingProps = SharedRatingProps & {
  starsCount?: number
  value: number
  onChange: (newStar: number) => void
  editable?: boolean
  spacing?: number | string
  hideInactive?: boolean
}

export const StarList = themed({
  tag: List,
  defaultTheme: {
    starList: {
      p: 'none',
      m: 'none',
      color: 'black',
      css: {
        listStyle: 'none',
        display: 'flex',
      },
    },
  },
})

export const StarListItem = themed({
  tag: ListItem,
  defaultTheme: {
    starListItem: {
      mr: 'none',
      css: {
        cursor: 'pointer',
        position: 'relative',
      },
    },
  },
});

export const Rating: React.FC<RatingProps> = ({
  starsCount = 5,
  value = 0,
  onChange,
  activeFill = colorsFromDesign.Black,
  inactiveFill = colorsFromDesign.LightGrey,
  size = 18,
  editable = true,
  spacing = 4,
  hideInactive = false,
}) => (
  <FlexLayout>
    <StarList css={{color: inactiveFill}}>
        {Array(hideInactive ? value : starsCount)
          .fill(null)
          .map((_, i) => i + 1)
          .map((starNumber) => (
            <StarListItem 
                css={{marginRight: starNumber !== starsCount ? spacing : 0}} 
                key={starNumber}
                onClick={() => {
                    if (onChange && editable) onChange(starNumber)
                }}>
                <Star
                    selected={starNumber <= value}
                    activeFill={activeFill}
                    inactiveFill={inactiveFill}
                    size={size}
                />
            </StarListItem>
          ))}
    </StarList>
  </FlexLayout>
);