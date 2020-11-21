import React from 'react';
import {H4, DetailsContent, Icon} from '@market-ui/falcon-ui';
import {FilterDetails, FilterSummary} from './FilterDetails';
import {MultipleFilter} from "./MultipleFilter";

interface IFilterTileOption {
  count: number;
  title: string;
  value: string;
}

interface IFilterTileProps {
  title: string;
  initiallyOpen: boolean;
  options: IFilterTileOption[];
  selected: IFilterTileOption[];
  onChange: (x: IFilterTileOption) => void;
}

export const FilterTile = (props: IFilterTileProps) => {
  const {title, initiallyOpen, options, selected, onChange} = props;

  return <FilterDetails
    initiallyOpen={initiallyOpen}
    css={{
      position: 'relative'
    }}
  >
    {(props: { on: boolean, toggle: (e: React.MouseEvent) => void }) => {
      const {on, toggle} = props;
      const onFilterSummaryClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        toggle(e);
      };
      return <>
        <FilterSummary
          position={'relative'}
          onClick={onFilterSummaryClick}
        >
          <div className={'filter-summary-wrap'}>
            <H4 fontSize={'sm'}
                css={{
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '15px !important'
                }}>{title}</H4>
            <Icon src={on ? 'dropdownArrowUp' : 'dropdownArrowDown'} fallback={on ? '▴' : '▾'}/>
          </div>
        </FilterSummary>
        <DetailsContent
          css={{
            zIndex: 2,
            position: 'relative'
          }}
          py={'none'}
          pl={'none'}>
          <MultipleFilter
            options={options}
            selected={selected}
            onChange={onChange}
          />
        </DetailsContent>
      </>
    }}
  </FilterDetails>
};
FilterDetails.defaultProps = {
  initiallyOpen: false
};


