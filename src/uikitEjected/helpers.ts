import {repeatStr} from 'src/common/utils'

export const toGridTemplate = (items: any) => {
  const columnTemplate = items.shift();
  if (!columnTemplate) {
    return '';
  }

  const gridAreas = items
    .map((item: any) => {
      const rowTemplate = item.length > columnTemplate.length ? item.pop() : '';
      return `"${item.join(' ')}" ${rowTemplate}`;
    })
    .join(' ');

  return `${gridAreas} / ${columnTemplate.join(' ')}`;
};

export const repeatFrames = (breakpoints: any[], fraction: string, times: number) => {
  return breakpoints.reduce((obj: any, key: string) => {
    switch (key) {
      case 'xs':
        obj[key] = repeatStr(fraction, times);
        break;
      case 'sm':
        obj[key] = repeatStr(fraction, times  + 1);
        break;
      case 'md':
      case 'lg':
      case 'xl':
        obj[key] = repeatStr(fraction, times * 2);
        break;
    }
    return obj
  }, {})
}

export const prettyScrollbars = (theme: any) => ({
  overflowY: ['auto', 'overlay'],
  WebkitOverflowScrolling: 'touch',
  paddingRight: 10,
  marginRight: 6,

  '::-webkit-scrollbar': {
    width: 3,
    backgroundColor: theme.colors.secondaryLight,
    borderRadius: theme.borderRadius.medium
  },

  '::-webkit-scrollbar-thumb': {
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.secondaryDark
  }
});
