import {FlexLayout, H4, Text} from "@market-ui/falcon-ui";
import React from "react";
import {T} from "@market-ui/falcon-i18n";
import {CouponForm} from "./ApplyCouponForm";
import {ArrowDownMdIcon, ArrowUpMdIcon} from "../../../../../styling";
import {Collapse} from "src/uikitEjected";
import {useLayoutListenerContext} from "src/components/LayoutIndicator";


export const ColPromoCode = ({gridArea, couponCode, ...props}) => {
  const { layout, isMobile } = useLayoutListenerContext();

  return isMobile(layout) ? (
    <ColPromoCodeMobileImpl {...{gridArea, couponCode, ...props}} />
  ) : (
    <ColPromoCodeDesktopImpl {...{gridArea, couponCode, ...props}} />
  );
};

const ColPromoCodeMobileImpl = ({gridArea, couponCode, ...props}) => {
  return (
    <Collapse title={(opened) => (
      <React.Fragment>
        <FlexLayout alignItems='center'>
          <H4 fontWeight="bold" fontSize='xs'><T id='cart.collapseTitle' /></H4>
          {opened ? <ArrowUpMdIcon mr='xs' ml='xs' /> : <ArrowDownMdIcon mr='xs' ml='xs' />}
        </FlexLayout>
      </React.Fragment>
    )}>
      <FlexLayout gridArea={gridArea} justifyContent='start' flexDirection='column' {...props}>
        <Text fontWeight='bold' alignSelf='end'><T id='cart.promoCode' /></Text>
        <Text mb='xs' fontSize='xxxs' css={{width: 250, textAlign: 'start'}} alignSelf='end'><T id='cart.shippingNotification' /></Text>
        <CouponForm couponCode={couponCode} />
      </FlexLayout>
    </Collapse>
  );
};
const ColPromoCodeDesktopImpl = ({gridArea, couponCode, ...props}) => {
  return (
    <FlexLayout gridArea={gridArea} css={{width: '100%'}} justifyContent='flex-start' {...props}>
      <FlexLayout justifyContent='start' css={{height: 100}}>
        <Text ml='xs' fontWeight='bold'><T id='cart.promoCode' /></Text>
        <Text mb='xs' fontSize='xxxs'><T id='cart.shippingNotification' /></Text>
        <CouponForm couponCode={couponCode} />
      </FlexLayout>
    </FlexLayout>
  );
};
