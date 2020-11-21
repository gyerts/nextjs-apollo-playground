import {CSSObject} from "@deity/falcon-ui";
import {themedBreakpoints} from "src/theme/breakpoints";

export type BreakpointsArray = ('xs' | 'sm' | 'md' | 'lg' | 'xl')[];

export const desktopOnly = (value: any, fillNone=true) => {
  const retVal: any = {
    sm: value,
    md: value,
    lg: value,
    xl: value,
  };
  if (fillNone) {
    retVal.xs = 'none';
  }
  return retVal;
};

export const mobileOnly = (value: any, fillNone=true) => {
  const retVal: any = {
    xs: value,
  };
  if (fillNone) {
    retVal.sm = 'none';
    retVal.md = 'none';
    retVal.lg = 'none';
    retVal.xl = 'none';
  }
  return retVal;
};

export const bothResolutions = <T extends string>(mobile: T, desktop: T) => {
  return {
    xs: mobile,
    sm: desktop,
    md: desktop,
    lg: desktop,
    xl: desktop,
  };
};

// export const useMobileBgFullWidthCss = (): any => {
//   const { layout, isMobile } = useLayoutListenerContext();
//
//   return isMobile(layout) ? {
//     marginLeft: -16,
//     marginRight: -16,
//   } : {};
// };

export const cssMobileOnly = (css: CSSObject): any => {
  return {
    [`@media (min-width: ${breakpoints.xs}px) and (max-width: ${breakpoints.sm - 1}px)`]: css,
  };
};

export const cssMobileTillMdOnly = (css: CSSObject): any => {
  return {
    [`@media (min-width: ${breakpoints.xs}px) and (max-width: ${breakpoints.md}px)`]: css,
  };
};

export const cssNeededResolutions = (bp: BreakpointsArray, css: CSSObject): any => {
  let cssForReturn = {};
  const bpObj = {
    xs: {
      [`@media (min-width: ${breakpoints.xs}px) and (max-width: ${breakpoints.sm - 1}px)`]: css
    },
    sm: {
      [`@media (min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`]: css,
    },
    md: {
      [`@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`]: css,
    },
    lg: {
      [`@media (min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`]: css,
    },
    xl: {
      [`@media (min-width: ${breakpoints.xl}px)`]: css,
    }
  };

  bp.forEach((item) => {
    cssForReturn = {
      ...cssForReturn,
      ...bpObj[item]
    }
  });

  return cssForReturn;
};

export const cssDesktopOnly = (css: CSSObject): any => {
  return {
    [`@media (min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`]: css,
    [`@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`]: css,
    [`@media (min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`]: css,
    [`@media (min-width: ${breakpoints.xl}px)`]: css,
  };
};
export const cssBothResolutions = (mobile: CSSObject, desktop: CSSObject): any => {
  return {
    ...cssMobileOnly(mobile),
    ...cssDesktopOnly(desktop),
  };
};
const breakpoints: any = themedBreakpoints;
