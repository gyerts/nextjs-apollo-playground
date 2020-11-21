import {ThemeColors} from "@deity/falcon-ui";

export const colorsFromDesign = {
  /**
   * https://app.zeplin.io/project/5f10358f95f8319efc97669f/screen/5f1838ee1f71da697b8e9cb0
   */
  BrightBlue: '#4ED9F0',
  BluePurple: '#6E9BF7',
  Blue: '#2971c5',          // no color in design
  BrightPurple: '#774EEE',
  Purple: '#A17AE7',
  Mint: '#ADFEC4',
  MintGreen: '#90D39C',
  AquaGreen: '#39B9B0',
  BrightGreen: '#21BA45',
  Green: '#D9F633',
  AcidYellow: '#F4FD37',
  Yellow: '#F6E432',
  BrightRed: '#FD0D1B',
  LightRed: '#FD471D',
  OrangeRed: '#FD471D',     // no color in design
  Ochre: '#CE8822',
  FairPink: '#FFECE8',      // no color in design
  Pink: '#FDDAD4',
  DuckyPink: '#F3C0B6',
  DarkPink: '#F2B0A4',
  BrightPink: '#F2B1DB',
  Black: '#000000',
  BluishBlack: '#1B1C1D',
  DarkGrey: '#4E4E4E',
  Grey: '#7B7B7B',
  MidGrey: '#B0B0B0',
  Alto: '#D1D1D1',          // no color in design
  LighterGrey: '#e3e3e6',
  LightGrey: '#E0E1E2',
  Lilac: '#B6B7D1',
  LightBlue: '#CAE7F8',
  Ottoman: '#E8F8EC',       // no color in design
  OffWhite: '#F8F5F0',
  White: '#FFFFFF',
  LightBorder: '#DEDEDF',   // no color in design
  DarkBorder: '#DEDED1',
  LightBrown: '#f8f5f0', //todo: this is duplicate of OffWhite and this is a primary color. need to replace usage of this on
};

export const themedColors: any & ThemeColors = {
  primary: colorsFromDesign.OffWhite,
  primaryLight: colorsFromDesign.Green,
  white: colorsFromDesign.White,
  black: colorsFromDesign.Black,
  secondaryDark: colorsFromDesign.BluishBlack,
  copyrightText: colorsFromDesign.MidGrey,
  footerPrimaryColor: colorsFromDesign.Pink,
  primaryText: colorsFromDesign.Black,
  selectedText: colorsFromDesign.DarkPink,
  primaryDark: colorsFromDesign.Pink,
  secondary: colorsFromDesign.OffWhite,

  grey: colorsFromDesign.Grey,

  successBg: colorsFromDesign.Ottoman,
  successText: colorsFromDesign.BrightGreen,

  errorText: colorsFromDesign.LightRed,
  errorBg: colorsFromDesign.FairPink,
  hr: colorsFromDesign.LightGrey,

  disabledBg: colorsFromDesign.LightGrey,
  disabledText: colorsFromDesign.MidGrey,

  hrDark: colorsFromDesign.Alto,
  darkLink: colorsFromDesign.DarkGrey,
  lightBorder: colorsFromDesign.LightBorder,
  darkBorder: colorsFromDesign.DarkBorder,
  disabledTextDark: colorsFromDesign.DarkGrey,

  buttonDisabledText: colorsFromDesign.Grey,
  buttonDisabledBg: colorsFromDesign.LightGrey,

  link: colorsFromDesign.Blue,
  loader: colorsFromDesign.Pink,
  menuSpecialLink: colorsFromDesign.OrangeRed,
} as any;
