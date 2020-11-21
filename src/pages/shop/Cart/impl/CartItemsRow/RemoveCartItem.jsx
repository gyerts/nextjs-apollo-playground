import {RemoveCartItemMutation} from "src/api";
import {useCartContext} from "../../CartContext";
import React, {useCallback, useEffect, useRef} from "react";
import {FlexLayout} from "@market-ui/falcon-ui";
import {RemoveItemButton} from "../../components";

export const RemoveCartItem = ({itemId, ...props}) => {
  return (
    <RemoveCartItemMutation>
      {(removeCartItem, { loading }) => (
        <RemoveCartItemImpl
          itemId={itemId}
          loading={loading}
          removeCartItem={removeCartItem}
          {...props}
        />
      )}
    </RemoveCartItemMutation>
  );
};

const RemoveCartItemImpl = ({itemId, loading, removeCartItem, ...props}) => {
  const { openMessage } = useCartContext();
  const loadingRef = useRef(loading);

  useEffect(function () {
    return () => loadingRef.current && openMessage('cart.deleted.title', 'cart.deleted.msg')
  }, []);

  useEffect(function () {
    loadingRef.current = loading;
  }, [loading]);

  const onClick = useCallback(function () {
    removeCartItem({ variables: { input: { itemId } } })
      .catch(() => {
        openMessage('cart.error.title', 'cart.error.msg', true);
      });
  }, [itemId]);

  return (
    <FlexLayout justifyContent='flex-end' {...props}>
      <RemoveItemButton
        loading={loading}
        onClick={onClick}
      />
    </FlexLayout>
  );
};
