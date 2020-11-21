import React, {useEffect, useState, useCallback, useRef} from 'react';
import {MenuQuery} from 'src/uikitEjected';
import {HeaderNavigation} from "./headerNavigation/headerNavigation";
import {Searchbar} from "./Searchbar/Searchbar";
import {Banner} from "./Banner/Banner";
import Sticky from "react-stickynode";
import _ from 'lodash';
import {useLayoutListenerContext} from "../LayoutIndicator/context";
import {themedBreakpoints} from "src/theme/breakpoints";

let body;
if (typeof document !== "undefined") {
  body = document.body;
}

const useIsStickyEnabled = () => {
  const [isSubStickyDisabled, setSubStickyDisabled] = useState(true);
  const [isStickyEnabled, setIsStickyEnabled] = useState(true);
  const prevWindowScrollYRef = useRef(window.scrollY);
  const { layout } = useLayoutListenerContext();

  useEffect(function () {
    setIsStickyEnabled(['xs', 'sm', 'md'].includes(layout));
  }, [layout]);

  const handleScroll = useCallback(_.throttle(() => {
    if (window.scrollY < 5) {
      body.classList.remove('scrolling-up');
      body.classList.remove('scrolling-down');
      setSubStickyDisabled(true);
    } else {
      if (prevWindowScrollYRef.current > window.scrollY) {
        body.classList.add('scrolling-up');
        body.classList.remove('scrolling-down');
      }
      if (prevWindowScrollYRef.current < window.scrollY) {
        body.classList.remove('scrolling-up');
        body.classList.add('scrolling-down');
      }
      setSubStickyDisabled(prevWindowScrollYRef.current > window.scrollY);
    }
    setIsStickyEnabled( window.innerWidth <= themedBreakpoints.md );
    prevWindowScrollYRef.current = window.scrollY;
  }, 100), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {isStickyEnabled, isSubStickyDisabled};
};

export const Header = () => {
  const {isStickyEnabled, isSubStickyDisabled} = useIsStickyEnabled();

  return <header className='header' style={{zIndex: 20, position: 'relative'}}>
    <Sticky
      className='header-navigation-sticky-mobile'
      enabled={isStickyEnabled}
      top={0}
      bottomBoundary={'footer'}
    >
      <Banner/>

      <MenuQuery>{({menu}) => (
        <React.Fragment>
          <Searchbar items={menu} isSubStickyDisabled={isSubStickyDisabled} />
          <HeaderNavigation items={menu} />
        </React.Fragment>
      )}
      </MenuQuery>
    </Sticky>
  </header>
};
