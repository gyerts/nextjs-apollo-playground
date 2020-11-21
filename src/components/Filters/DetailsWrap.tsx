import React, {RefObject, useCallback, useEffect, useRef} from 'react';
import {Details, PropsWithTheme, Summary, themed} from '@deity/falcon-ui';
import {themedBreakpoints} from "src/theme/breakpoints";

export const FilterSummary = themed({
  tag: Summary,
  defaultTheme: {
    filterSummary: {
      display: 'flex',
      alignItems: 'center',
      bg: 'transparent',
      m: 'none',
      px: 'none'
    }
  }
});

interface IDetailsWrapPropsWithTheme extends PropsWithTheme {
  open: boolean;
}

interface IDetailsWrapProps {
  children: (props: { on: boolean, toggle: (e: React.MouseEvent) => void }) => any;
  on: boolean;
  toggle: (e: React.MouseEvent) => void;
  set: (on: boolean) => void;
}

const useOutsideAlerter = (
  ref: RefObject<HTMLDivElement>,
  set: (on: boolean) => void
) => {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!ref.current.contains(event.target as Node) && window.innerWidth > themedBreakpoints.md) {
      set(false);
    } else if ((event.target as HTMLElement).classList.contains('filter-summary-wrap') && window.innerWidth <= themedBreakpoints.md) {
      set(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const DetailsWrap = (props: IDetailsWrapProps) => {
  const {children, on, toggle, set} = props;
  const onToggle = useCallback((e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    toggle(e);
  }, []);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, set);

  return (
    <Details ref={wrapperRef}
             open={on}
             defaultTheme={{
               filterDetails: {
                 display: 'flex',
                 flexDirection: 'column',
                 css: (props: IDetailsWrapPropsWithTheme) => ({
                   '> :not(summary, style)': {
                     display: props.open ? 'block' : 'none',
                     flex: props.open ? '1' : 0
                   },

                   '> summary::-webkit-details-marker': {
                     display: 'none'
                   },

                   '> summary:after': {
                     display: 'block',
                     // content: props.open ? '"-"' : '"+"',
                     marginLeft: props.theme.spacing.sm,
                     fontSize: props.theme.fontSizes.md,
                     lineHeight: 0.6,
                     fontWeight: props.theme.fontWeights.bold,
                     color: props.theme.colors.primary
                   }
                 })
               }
             }}
    >
      {children({
        on,
        toggle: onToggle
      })}
    </Details>
  )
};

