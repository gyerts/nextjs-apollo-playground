import {CSSObject} from "@market-ui/falcon-ui";

export const genButtonCss = (theme: any, primaryColor: string, hoveredColor: string): CSSObject => ({
  border: `1px solid ${theme.colors.black}`,
  borderRadius: 1,
  backgroundColor: primaryColor,
  color: hoveredColor,
  fontSize: theme.fontSizes.xs,

  ':before': {
    display: 'none',
  },

  ':not(.disabled):not(:disabled):hover': {
    backgroundColor: hoveredColor,
    color: primaryColor,
  },
  ':or(.disabled):or(:disabled):hover': {
    backgroundColor: theme.colors.buttonDisabledBg,
    color: theme.colors.buttonDisabledText,
  },
});

export const disabledButtonCss = (theme: any): CSSObject => ({
  ':disabled, &.disabled': {
    opacity: 'unset',
    backgroundColor: theme.colors.buttonDisabledBg,
    color: theme.colors.buttonDisabledText,
    border: 'unset !important',
    fontWeight: 'bold',
    cursor: 'not-allowed'
  }
});
