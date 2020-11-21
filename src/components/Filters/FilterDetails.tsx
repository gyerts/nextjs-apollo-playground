import React from 'react';
import { Toggle } from 'react-powerplug';
import { CSSObject, Summary, themed } from '@market-ui/falcon-ui';
import {DetailsWrap} from "./DetailsWrap";

export const FilterSummary = themed({
  tag: Summary,
  defaultTheme: {
    filterSummary: {
      display: 'flex',
      alignItems: 'center',
      bg: 'transparent',
      m: 'none',
      mr: 'xs',
      ml: 'xs',
      px: 'none'
    },
  }
});

interface IFilterDetailsProps {
  initiallyOpen: boolean;
  children: (props: {on: boolean, toggle: (e: React.MouseEvent) => void}) => any;
  css?: CSSObject
}

export const FilterDetails = (props: IFilterDetailsProps) => {

  const { initiallyOpen, children } = props;

  return <Toggle initial={initiallyOpen}>
    {({on, toggle, set}) => (
      <DetailsWrap
        on={on}
        set={set}
        children={children}
        toggle={toggle}
      />
    )}
  </Toggle>
};

FilterDetails.defaultProps = {
  initiallyOpen: false
};
