import {Box, Label, themed} from "@deity/falcon-ui";

export const FormFieldError = themed({
  tag: Box,
  defaultProps: {
  },
  defaultTheme: {
    formFieldError: {
      color: 'error',
      fontSize: 'xxs',
      css: {
        pointerEvents: 'none',
        justifySelf: 'start'
      }
    }
  }
});
