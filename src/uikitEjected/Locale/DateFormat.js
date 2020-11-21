import React from 'react';
import PropTypes from 'prop-types';
import { themed, Text } from '@market-ui/falcon-ui';
import { Locale } from './LocaleContext';

const DateFormatInnerDOM = ({ value, formatOptions, ...rest }) => (
  <Locale>{({ dateTimeFormat }) => <Text {...rest}>{dateTimeFormat(value, formatOptions)}</Text>}</Locale>
);
DateFormatInnerDOM.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired
};

export const DateFormat = themed({
  tag: DateFormatInnerDOM,
  defaultProps: {
    formatOptions: undefined
  },
  defaultTheme: {
    price: {
      display: 'block',
      m: 'none'
    }
  }
});
