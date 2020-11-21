import React from 'react';
import PropTypes from 'prop-types';
import { themed, Text } from '@market-ui/falcon-ui';
import { Locale } from './LocaleContext';

const PriceInnerDom = props => {
  const { value, formatOptions, children, ...rest } = props;

  return (
    <Locale>
      {({ priceFormat }) => (
        <Text m="lg" {...rest}>
          {priceFormat(value, formatOptions)}
        </Text>
      )}
    </Locale>
  );
};
PriceInnerDom.propTypes = {
  value: PropTypes.number.isRequired
};

export const Price = themed({
  tag: PriceInnerDom,
  defaultProps: {
    value: 0.0,
    formatOptions: undefined,
    ellipsis: false
  },
  defaultTheme: {
    price: {
      display: 'block',
      m: 'none',
      css: {
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },
      variants: {
        old: {
          css: {
            textDecorationStyle: 'solid',
            textDecorationLine: 'line-through'
          }
        },
        special: {
          fontWeight: 'bold',
          css: {
            color: 'red'
          }
        }
      }
    }
  }
});
