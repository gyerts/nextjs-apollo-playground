import React from 'react';
import { themed, Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem, Box } from '@market-ui/falcon-ui';
import { I18n } from '@market-ui/falcon-i18n';
import { BackendConfigQuery, SetLocaleMutation } from '../BackendConfig';

export const LanguageSection = themed({
  tag: Box,
  defaultTheme: {
    languageSection: {
      bgFullWidth: 'secondaryLight',
      py: 'md',
      css: {
        maxWidth: 190,
        margin: '0 auto',
        zIndex: 2
      }
    }
  }
});

export const LocaleSwitcherDropdown = ({ items, value, onChange }) => (
  <Dropdown onChange={onChange}>
    <DropdownLabel>{value.name}</DropdownLabel>
    <DropdownMenu variant="above">
      {items.map(x => (
        <DropdownMenuItem key={x.code} value={x}>
          {x.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

export const addCimodeLocale = locales => {
  if (process.env.NODE_ENV === 'development') {
    if (!locales.find(x => x === 'he')) {
      locales.unshift('he');
    }
  }

  return locales;
};

export const LocaleSwitcher = ({ children }) => (
  <I18n>
    {(t, i18n) => (
      <SetLocaleMutation>
        {setLocale => (
          <BackendConfigQuery passLoading>
            {({ backendConfig: { locales, activeLocale } }) => {
              const items = addCimodeLocale(locales).map(x => ({ code: x, name: t(`languages.${x}`) }));
              const value = { code: activeLocale, name: t(`languages.${activeLocale}`) };
              const onChange = x =>
                setLocale({ variables: { locale: x.code } }).then(({ data }) => {
                  i18n.changeLanguage(data.setLocale.activeLocale);
                });

              return children && children({ items, value, onChange });
            }}
          </BackendConfigQuery>
        )}
      </SetLocaleMutation>
    )}
  </I18n>
);
