import React, {useRef} from 'react';
import {BagEmptyIconWhite} from "src/styling";
import {Link as RouterLink} from "react-router-dom";
import {Badge, extractThemableProps, Link, ThemedComponentProps} from "@deity/falcon-ui";
import {OpenMiniCartMutation} from "../MiniCart/graphql";
import {CartQuery} from "src/api";


interface IProps extends ThemedComponentProps {
}
export function CartIcon (props: IProps) {
  const bagEmptyIconWhite = useRef(<BagEmptyIconWhite width='md' />);
  const { themableProps } = extractThemableProps(props);

  return (
    <CartQuery>
      {({cart}: any) => (
        <OpenMiniCartMutation>
          {openMiniCart => (
            <Link
              as={RouterLink}
              to="/cart"
              onMouseEnter={() => openMiniCart({variables: { eventType: 'user' }})}
              css={{position: 'relative'}}
              {...themableProps}
            >
              {bagEmptyIconWhite.current}

              {cart && Boolean(cart.itemsQty) && (
                <Badge
                  borderRadius="round"
                  boxShadow="pronounced"
                  fontSize="xs"
                  size="md"
                  fontWeight="bold"
                  p="none"
                  css={{
                    position: 'absolute',
                    bottom: 5,
                    left: -22,
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontSize: '12px',
                    ':before': {
                      content: '"("'
                    },
                    ':after': {
                      content: '")"'
                    }
                  }}
                >
                  {cart.itemsQty}
                </Badge>
              )}
            </Link>
          )}
        </OpenMiniCartMutation>
      )}
    </CartQuery>
  );
}
