import React, {useCallback, useEffect} from "react";
import {FlexLayout, Text, Button} from "@market-ui/falcon-ui";
import {ResponsiveIf} from "../../../../components/ResponsiveIf";
import {T} from "@market-ui/falcon-i18n";
import {useCheckoutPageContext} from "../context";
import {Price} from "src/uikitEjected/Locale";
import {getCartData} from "src/common";


interface IProps {
  collapsed: boolean
  collapsible?: boolean
  setCollapsed: (collapsed: boolean) => void
}
export const SummaryHeader = ({collapsed, setCollapsed, collapsible = true}: IProps) => {
  const { cart } = useCheckoutPageContext();
  const { total } = getCartData(cart.totals);

  useEffect(function () {
    setCollapsed(collapsible);
  }, []);

  const onShow = useCallback(function () {
    setCollapsed(false);
  }, []);

  const onHide = useCallback(function () {
    setCollapsed(true);
  }, []);

  return (
    <React.Fragment>
      <ResponsiveIf mobile>
        <FlexLayout justifyContent='space-between'>

          {collapsible && (
            <React.Fragment>
              {collapsed ? (
                <React.Fragment>
                  <Button fontSize='xxs' variant='link-underlined' mx='xs' onClick={onShow}><T id='words.view' /></Button>
                  {total && <Text fontSize='sm'><b><T id='checkout.sections.summary.summary' />: <Price value={total.value} /></b></Text>}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button fontSize='xxs' variant='link-underlined' mx='xs' onClick={onHide}><T id='words.hide' /></Button>
                  <Text variant='small'><b><T id='words.caps.items' /> ({cart.itemsQty})</b></Text>
                </React.Fragment>
              )}
            </React.Fragment>
          )}

          {!collapsible && (
            <Text variant='small'><b><T id='words.caps.items' /> ({cart.itemsQty})</b></Text>
          )}

        </FlexLayout>
      </ResponsiveIf>

      <ResponsiveIf desktop>
        <FlexLayout justifyContent='space-between'>
          <Text variant='small'><b><T id='words.caps.items' /> ({cart.itemsQty})</b></Text>
          {total && <Text fontSize='sm' display='flex' flexWrap='nowrap'>
            <b><T id='checkout.sections.summary.summary' />:</b>&nbsp;<b><Price value={total.value} /></b></Text>}
        </FlexLayout>
      </ResponsiveIf>

    </React.Fragment>
  )
};
