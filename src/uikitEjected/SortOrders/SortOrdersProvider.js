import React from 'react';
import {I18nContext} from '@market-ui/falcon-i18n';
import { SortOrdersQuery, AreSortOrderInputsEqual } from './SortOrdersQuery';
import { SearchConsumer } from '../Search';

export const SortOrdersProvider = ({ children }) => {
  const {t} = React.useContext(I18nContext);
  
  return <SortOrdersQuery>
    {({ sortOrders }) => {
      const sortLocaleOrders = sortOrders.map(z => Object.assign({}, z, {name: t(`sort.price.${z.value.direction}`)}));

      return <SearchConsumer>
        {({ state: { sort }, setSortOrder }) =>
          children({
            items: sortLocaleOrders,
            value: sort,
            onChange: x => setSortOrder(x.value)
          })
        }
      </SearchConsumer>
    }
  }
  </SortOrdersQuery>
};
