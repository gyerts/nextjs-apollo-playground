import React, {useContext} from "react";
import PropTypes from "prop-types";

import {FlexLayout, Text} from "@market-ui/falcon-ui";
import {I18nContext, T} from "@market-ui/falcon-i18n";

import {mobileOnly, bothResolutions} from "src/styling/cssHelper";
import {Price} from "src/uikitEjected";
import {ResponsiveIf} from "src/components";


export const SubtotalPrice = ({value, ...props}) => {
  const context = useContext(I18nContext);

  return (
    <FlexLayout
      my={mobileOnly('xs')}
      justifyContent={bothResolutions(context.dir === 'rtl' ? 'end' : 'flex-end', context.dir === 'rtl' ? 'flex-end' : 'end')}
      css={{
        flexDirection: context.dir === 'rtl' ? 'row-reverse' : 'row',
      }}
      {...props}
    >
      <ResponsiveIf mobile>
        <FlexLayout
          css={{
            flexDirection: context.dir === 'rtl' ? 'row-reverse' : 'row'
          }}
        >
          <Text fontWeight='bold'><T id='cart.thSubtotal' /></Text>
          <Text>:</Text>
          <Text>&nbsp;&nbsp;&nbsp;</Text>
        </FlexLayout>
      </ResponsiveIf>

      <Price value={value} fontWeight="bold" css={{textAlign: 'start'}} />
    </FlexLayout>
  )
};

SubtotalPrice.propTypes = {
  value: PropTypes.number.isRequired,
};
