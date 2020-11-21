import React from 'react';
import { BackendConfigQuery } from '../BackendConfig';

const LocaleContext = React.createContext({});

export const LocaleProvider = ({ children, priceFormatOptions = {}, dateTimeFormatOptions = {}, ...props }) => (
  <BackendConfigQuery>
    {({ backendConfig }) => {
      const { activeLocale, shop } = backendConfig;

      const locale = activeLocale || 'en';
      const localeFallback = 'en';
      const currency = props.currency || shop.activeCurrency || 'EUR';

      return (
        <LocaleContext.Provider
          value={{
            locale,
            localeFallback,
            currency,
            priceFormat: priceFormatFactory([priceFormatOptions.locale, locale, localeFallback], {
              currency,
              ...priceFormatOptions
            }),
            dateTimeFormat: dateTimeFormatFactory([dateTimeFormatOptions.locale, locale, localeFallback], {
              ...dateTimeFormatOptions
            })
          }}
        >
          {children}
        </LocaleContext.Provider>
      );
    }}
  </BackendConfigQuery>
);

export const Locale = ({ children }) => (
  <LocaleContext.Consumer>{({ localeFallback, ...props }) => children({ ...props })}</LocaleContext.Consumer>
);

/**
 * Price Format function factory based on Intl api
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 * @param {string[]} localeCodes localization codes
 * @param {PriceFormatOptions} options formatting options
 * @returns {ReturnType<typeof priceFormatFactory>} price formatter
 */
export function priceFormatFactory(localeCodes, options) {
  const getPriceFormatter = (locales, numberFormatOptions) =>
    new Intl.NumberFormat(locales.filter(x => x), { ...numberFormatOptions, style: 'currency' });

  const memoizedFormatter = getPriceFormatter([options.locale, ...localeCodes], options);

  function priceFormat(value, overrides) {
    return overrides
      ? getPriceFormatter([overrides.locale, options.locale, ...localeCodes], {
          ...options,
          ...overrides
        }).format(value)
      : memoizedFormatter.format(value);
  }

  return priceFormat;
}

export function dateTimeFormatFactory(localeCodes, options) {
  const getDateTimeFormatter = (locales, dateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locales.filter(x => x), { ...dateTimeFormatOptions });

  const memoizedFormatter = getDateTimeFormatter([options.locale, ...localeCodes], options);

  function dateTimeFormat(value, overrides) {
    return overrides
      ? getDateTimeFormatter([overrides.locale, options.locale, ...localeCodes], {
          ...options,
          ...overrides
        }).format(new Date(value))
      : memoizedFormatter.format(new Date(value));
  }

  return dateTimeFormat;
}
