import {Theme} from "@deity/falcon-ui";

export const linkUnderlinedVariant = {
  css: ({theme}: {theme: Theme}) => ({
    border: 'unset',
    color: 'unset',
    borderRadius: 'unset',
    backgroundColor: 'unset !important',
    height: 'unset',
    textDecoration: 'underline !important',
    padding: 0,
    width: 'fit-content',
  }),
} as any;
