import {FlexLayout, Text, Button} from "@market-ui/falcon-ui";
import React from "react";
import {T} from "@market-ui/falcon-i18n";
import {Price} from "../../../../../uikitEjected/Locale";
import {Link as RouterLink} from "react-router-dom";
import {mobileOnly} from "../../../../../styling/cssHelper";
import {useLayoutListenerContext} from "src/components/LayoutIndicator";

export const ColOrderSummary = ({gridArea, subtotal, total, discount}) => {
  const { isMobile, layout } = useLayoutListenerContext();

  return (
    <FlexLayout
      gridArea={gridArea}
      css={{width: '100%'}}
      justifyContent='flex-end'
      py={mobileOnly('sm')}
      bgFullWidth={isMobile(layout) && 'secondary'}
    >
      <FlexLayout css={{textAlign: 'start', width: isMobile(layout) ? '100%' : 250}} flexDirection='column'>
        <Text fontSize='sm' mb='xs' fontWeight='bold'><T id='cart.orderSummary' /></Text>
        {subtotal && (
          <FlexLayout justifyContent='space-between'>
            <Text fontSize='xs'><T id='cart.subtotal' /></Text>
            <Price value={subtotal} fontSize='xs' />
          </FlexLayout>
        )}
        {discount !== 0 && discount && (
          <FlexLayout justifyContent='space-between'>
            <Text color='errorText' fontSize='xs'><T id='cart.discount' /></Text>
            <Price color='errorText' value={discount} fontSize='xs' />
          </FlexLayout>
        )}
        {total && (
          <FlexLayout justifyContent='space-between' mt='xs'>
            <Text fontWeight='bold' fontSize='sm'><T id='cart.total' /></Text>
            <Price value={total} fontSize='sm' fontWeight="bold" />
          </FlexLayout>
        )}

        <Text fontSize='xxs' mb='xs'><T id='cart.summaryNotification' /></Text>
        <Button fontWeight='bold' as={RouterLink} to='/checkout'><T id='cart.checkout' /></Button>
      </FlexLayout>
    </FlexLayout>
  );
};
