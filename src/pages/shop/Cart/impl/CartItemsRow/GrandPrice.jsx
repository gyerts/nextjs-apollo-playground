import React, {useContext} from "react";
import PropTypes from "prop-types";

import {FlexLayout, Text} from "@market-ui/falcon-ui";
import {I18nContext, T} from "@market-ui/falcon-i18n";

import {mobileOnly} from "src/styling/cssHelper";
import {Price} from "src/uikitEjected";
import {ResponsiveIf} from "src/components";


export const GrandPrice = ({value, ...props}) => {
  const context = useContext(I18nContext);

  return (
    <FlexLayout
      mt={mobileOnly('xs')}
      alignItems={mobileOnly('flex-end')}
      css={{
        flexDirection: context.dir === 'rtl' ? 'row-reverse' : 'row',
        justifyContent: context.dir === 'rtl' ? 'flex-end' : 'end',
      }}
      {...props}
    >
      <ResponsiveIf mobile>
        <FlexLayout
          css={{
            flexDirection: context.dir === 'rtl' ? 'row-reverse' : 'row'
          }}
        >
          <Text fontWeight='bold'><T id='cart.thPrice' /></Text>
          <Text>:</Text>
          <Text>&nbsp;&nbsp;&nbsp;</Text>
        </FlexLayout>
      </ResponsiveIf>
      <Price value={value} fontWeight="bold" css={{textAlign: 'start'}} />
    </FlexLayout>
  )
};

GrandPrice.propTypes = {
  value: PropTypes.number.isRequired,
};
