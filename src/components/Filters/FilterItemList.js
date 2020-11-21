import { List, themed } from '@market-ui/falcon-ui';

export const FilterItemList = themed({
  tag: List,
  defaultTheme: {
    filterItemList: {
      css: {
        listStyle: 'none'
      }
    }
  }
});
