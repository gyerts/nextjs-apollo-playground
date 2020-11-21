import {Label, themed} from "@market-ui/falcon-ui";


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
