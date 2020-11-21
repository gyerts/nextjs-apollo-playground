import React from "react";

import {FlexLayout, Text, Box} from "@market-ui/falcon-ui";
import {I18n, T} from "@market-ui/falcon-i18n";

import {CloseIcon} from "src/styling";

interface IProps {
  msg: string|JSX.Element
  items?: number
  onClose?: () => void
  gridArea?: string
}
export const MiniCartTitle = ({msg, items, onClose, gridArea}: IProps) => {
  return (
    <FlexLayout
      alignItems='center'
      justifyContent={(onClose || !items) ? 'flex-end' : 'space-between'}
      p='sm'
      bg='secondaryLight'
      gridArea={gridArea}
    >
      <span style={{
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 1.65,
        letterSpacing: 0.18,
        marginTop: onClose ? 5 : 1,
      }}>{msg}</span>

      {onClose && (
        <I18n>{(_t, i18n) => (
          <Box {...{[i18n.dir() === 'ltr' ? 'mr' : 'ml']: 'xs'}} >
            <CloseIcon onClick={onClose} />
          </Box>
        )}</I18n>
      )}

      {Boolean(items) && (
        <Text>{items} {items > 1 ? <T id="miniCart.items" /> : <T id="miniCart.item" />}</Text>
      )}
    </FlexLayout>
  );
};
