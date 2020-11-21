import React from "react";
import {Link as RouterLink} from "react-router-dom";

import {T} from "@market-ui/falcon-i18n";
import {Box, Button, FlexLayout, Text} from "@market-ui/falcon-ui";
import {LocaleProvider, Price, prettyScrollbars} from "src/uikitEjected";
import {MiniCartMessage, MiniCartTitle} from "../../components";
import {MiniCartProducts} from "../products";
import {area} from ".";
import {IMiniCartState} from "../../graphql/client/MiniCartClientInitialData";
import {GQLCart} from "src/graphql-types";
import {IMiniCartReducer} from "./MiniCartDataContainer";
import {getCartData} from "src/common";


const getTitle = (data: {cart?: GQLCart}, state: IMiniCartState, reducer: IMiniCartReducer) => {
  if (!data.cart || !data.cart.items.length) {
    return <MiniCartTitle msg={<T id='miniCart.emptyTitle' />} gridArea={area.title} />;
  }
  if (state.eventType === 'user') {
    return <MiniCartTitle msg={<T id="miniCart.normalTitle" />} items={data.cart.itemsQty} gridArea={area.title} />;
  } else {
    return <MiniCartTitle msg={<T id="miniCart.addedTitle" />} onClose={reducer.close} gridArea={area.title} />;
  }
};

interface IProps {
  state: IMiniCartState
  reducer: IMiniCartReducer
  data: {cart?: GQLCart}
}
export const MiniCartImpl = ({state, reducer, data}: IProps) => {
  if (!data.cart) {
    return getTitle(data, state, reducer);
  }

  const { subTotal, total } = getCartData(data.cart.totals);

  return (
    <React.Fragment>
      {getTitle(data, state, reducer)}

      {data.cart && !data.cart.items.length && (
        <MiniCartMessage
          msg={<T id={state.messageId} />}
          opened={!!state.messageId}
          success={!state.isMessageError}
        />
      )}

      {data.cart && !!data.cart.items.length && (
        <React.Fragment>
          <LocaleProvider currency={data.cart.quoteCurrency}>
            <Box>
              <Box css={{
                overflowX: 'hidden',
                overflowY: 'auto',
              }}>
                <MiniCartMessage
                  msg={<T id={state.messageId} />}
                  opened={!!state.messageId}
                  success={!state.isMessageError}
                />

                <Box pr='sm' pl='sm' css={({theme}: any) => ({
                    ...prettyScrollbars(theme) as any,
                    marginLeft: '0!important',
                    marginRight: '0!important',
                    maxHeight: 400,
                    overflowX: 'hidden',
                  })}
                >
                  <MiniCartProducts products={data.cart.items} />
                </Box>
              </Box>

              <FlexLayout flexDirection='column' bg='secondaryLight' p='xs'>
                {subTotal && (
                  <FlexLayout justifyContent='space-between' mb='xs'>
                    <Text><T id='miniCart.subtotal' />:</Text>
                    <Price value={subTotal.value} />
                  </FlexLayout>
                )}
                {total && (
                  <FlexLayout justifyContent='space-between' mb={'xxs' as any}>
                    <Text fontWeight='bold'><T id='miniCart.total' /></Text>
                    <Price fontWeight='bold' value={total.value} />
                  </FlexLayout>
                )}
                <FlexLayout justifyContent='end'>
                  <Text fontSize='xxs' color='secondaryText' ><T id='miniCart.totalNote' /></Text>
                </FlexLayout>
              </FlexLayout>


              <FlexLayout gridArea={area.cta}>
                <Button as={RouterLink} to="/checkout" onClick={reducer.close} flex={1} m='xs' height="xl">
                  <Text fontSize='xs'><T id="miniCart.checkout" /></Text>
                </Button>
              </FlexLayout>

              <FlexLayout gridArea={area.cta}>
                <Button
                  as={RouterLink} to="/cart"
                  onClick={reducer.close}
                  flex={1}
                  mb='xs'
                  mx='xs'
                  variant='inverse'
                >
                  <T id="miniCart.viewCart" />
                </Button>
              </FlexLayout>
            </Box>
          </LocaleProvider>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
