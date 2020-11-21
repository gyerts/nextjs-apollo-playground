import React from 'react';
import { createTheme } from '@market-ui/falcon-ui';

import {themedIcons} from "./icons";
import {themedColors} from "./colors";
import {themedSpacing} from "./spacing";
import {themedKeyframes} from "./keyframes";
import {themedComponents} from "./components";
import {themedFontSizes} from "./fontSizes";
import {themedFonts} from "./fonts";
import {themedBreakpoints} from "./breakpoints";

export const deityBlackTheme = createTheme({
  colors: themedColors,
  spacing: themedSpacing,
  icons: themedIcons,
  keyframes: themedKeyframes,
  fontSizes: themedFontSizes,
  fonts: themedFonts,
  components: themedComponents,
  breakpoints: themedBreakpoints,

  // fontWeights: ThemeFontWeights;
  // lineHeights: ThemeLineHeights;
  // letterSpacings: ThemeLetterSpacings;
  // borders: ThemeBorders;
  // borderRadius: ThemeBorderRadius;
  // boxShadows: ThemeBoxShadows;
  // easingFunctions: ThemeEasingFunctions;
  // transitionDurations: ThemeTransitionDurations;
  // zIndex: ThemeZIndex;
  // localization: CSSOthersObject;
});

export const globalCss = {
  body: {
    margin: 0
  },
  html: {
    overflowY: 'scroll'
  }
};
