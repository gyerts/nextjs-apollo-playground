import { themed } from '@market-ui/falcon-ui';

export const AppLayout = themed({
  tag: 'div',
  defaultTheme: {
    appLayout: {
      px: {
        xs: 'sm',
        md: 'md'
      },
      css: ({theme}) => ({
        margin: '0 auto',
        maxWidth: 1480,
        ...getCssForCheckbox(theme),
        ...getCssForRadio(theme),
      })
    }
  }
});

const getCssForCheckbox = (theme) => ({
  'input[type=checkbox]:hover': {
    backgroundColor: theme.colors.black
  },
  'input[type=checkbox]:checked + .-inner-checkbox-frame': {
    background: theme.colors.black,
    borderColor: theme.colors.black
  },
  'input[type=checkbox]:hover + .-inner-checkbox-frame': {
    borderColor: theme.colors.black
  },
  'input[type=checkbox]:checked:hover + .-inner-checkbox-frame': {
    background: theme.colors.black
  }
});

const getCssForRadio = (theme) => ({
  'input[type=radio]:hover': {
  },
  'input[type=radio] + .-inner-radio-frame': {
    borderColor: theme.colors.disabledText,
    borderWidth: 1,
  },
  'input[type=radio]:checked + .-inner-radio-frame': {
    borderColor: theme.colors.disabledText,
    borderWidth: 1,

    svg: {
      fill: theme.colors.black,
    },
  },
  'input[type=radio]:hover + .-inner-radio-frame': {
    borderColor: theme.colors.disabledText,
    borderWidth: 1,
    svg: {
      fill: theme.colors.black,
    },
  },
  'input[type=radio]:checked:hover + .-inner-radio-frame': {
  }
});
