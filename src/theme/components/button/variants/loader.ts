export const loaderVariant = {
  size: 'xl',
  borderRadius: 'round',
  border: 'bold',
  borderColor: 'primary',
  p: 'none',
  css: ({theme}: any) => ({
    animation: `${theme.keyframes.loader} .8s linear infinite`,
    borderRightColor: theme.colors.white,
    background: 'none',
    fontSize: 0,
    whiteSpace: 'nowrap',
    cursor: 'default',
    overflow: 'hidden',

    ':hover': {
      borderColor: theme.colors.primaryLight,
      borderRightColor: theme.colors.white
    }
  })
} as any;
