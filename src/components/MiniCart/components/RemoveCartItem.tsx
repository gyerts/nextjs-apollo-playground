import React, {useEffect, useRef} from "react";
import {Icon, Button} from "@market-ui/falcon-ui";

import {SetMessageMiniCartMutation} from "src/components";
import {DeleteIcon} from "src/styling";
import {themedColors} from "src/theme/colors";
import {IRemoveCartItemFn, RemoveCartItemMutation} from "../../../api";


interface IRemoveCartItemProps {
  itemId: number
  gridArea: string
  css?: any
}
export const RemoveCartItem = ({itemId, gridArea, css}: IRemoveCartItemProps) => {
  return (
    <RemoveCartItemMutation>{(removeCartItem, {loading}) => (
      <SetMessageMiniCartMutation>{setMessageMiniCart => (
        <RemoveCartItemImpl
          removeCartItem={removeCartItem}
          loading={loading}
          setMessageMiniCart={setMessageMiniCart}
          itemId={itemId}
          gridArea={gridArea}
          css={css}
        />
      )}
      </SetMessageMiniCartMutation>
    )}</RemoveCartItemMutation>
  );
};


interface IRemoveCartItemImplProps {
  itemId: number
  gridArea: string
  removeCartItem: IRemoveCartItemFn
  loading: boolean
  setMessageMiniCart: (props: {
    variables: {
      messageId: string
      error?: boolean
    }
  }) => void
  css?: any
}
const RemoveCartItemImpl = ({removeCartItem, loading, setMessageMiniCart, itemId, gridArea, css}: IRemoveCartItemImplProps) => {
  const loadingRef = useRef(loading);
  useEffect(function () {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(function () {
    return () => loadingRef.current && setMessageMiniCart({
      variables: { messageId: 'miniCart.productRemovedMsg' },
    });
  }, []);

  return (
    <Button
      gridArea={gridArea}
      disabled={loading}
      variant='icon'
      onClick={() => {
        removeCartItem({
          variables: { input: { itemId } },
        })
          .catch(() => {
            setMessageMiniCart({
              variables: { messageId: 'miniCart.errorMsg', error: true },
            });
          });
      }}
      css={css}
    >
      {loading ? (
        <Icon
          src={'loader'}
          size="md"
          stroke="secondaryText"
        />
      ) : (
        <DeleteIcon
          css={{ ':hover': { stroke: themedColors.primary }, height: 24, marginTop: 10, marginBottom: 10 }}
        />
      )}
    </Button>
  );
};
