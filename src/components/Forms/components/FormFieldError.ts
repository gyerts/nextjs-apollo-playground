import {Box, Label, themed} from "@market-ui/falcon-ui";

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
