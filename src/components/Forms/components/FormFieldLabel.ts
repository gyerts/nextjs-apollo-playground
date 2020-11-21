import {Label, themed} from "@deity/falcon-ui";


export const FormFieldLabel = themed({
  tag: Label,
  defaultProps: {
    css: {
      textAlign: 'start',
      fontWeight: 'normal',
      margin: '5px 0',
    }
  },
});
