import React, {useRef} from "react";
import {Box, FlexLayout} from '@market-ui/falcon-ui';

import {MiniCartDataContainer} from ".";
import './MiniCartPopup.scss';
import {useClickOutside} from "../../../LayoutLogger/common/useClickOutside";
import {useTimeoutPopupClose} from "../../../LayoutLogger/common/useTimeoutPopupClose";
import {IMiniCartState} from "../../graphql/client/MiniCartClientInitialData";
import {IMiniCartReducer} from "./MiniCartDataContainer";
import {GQLCart} from "../../../../graphql-types";


interface IMiniCartPopupProps {
  children: (props: {
    state: IMiniCartState
    reducer: IMiniCartReducer
    data: {cart?: GQLCart}
  }) => React.ReactElement
}
export const MiniCartPopup = ({ children }: IMiniCartPopupProps) => {
  return (
    <MiniCartDataContainer>{(props) => (
      !props.state.isOpen ? null : <MiniCartPopupImpl children={children} props={props} />
    )}</MiniCartDataContainer>
  );
};

const POPUP_WIDTH = 300;


interface IMiniCartPopupImplProps {
  children: any
  props: {
    state: IMiniCartState
    reducer: IMiniCartReducer
    data: {cart?: GQLCart}
  }
}
const MiniCartPopupImpl = ({ children, props }: IMiniCartPopupImplProps) => {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, props.reducer.close);
  const {killTimer} = useTimeoutPopupClose(props.state.isOpen, props.state.eventType, props.reducer.close);

  return (
    <FlexLayout bg='primary' css={{
      width: '100%',
      justifyContent: 'flex-end',
      transition: '.5s',
    }}>
      <Box
        className={`MiniCart desktop-only arrow-box`}
        ref={wrapperRef}
        css={{
          position: 'fixed',
          top: props.state.isSecondaryHeaderActive ? 54 : 44,
          backgroundColor: 'white',
          width: POPUP_WIDTH,
          maxWidth: POPUP_WIDTH,
          // overflow: 'hidden', // if activate it, it will delete triangle on top of box
          boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.1)',
          transition: '.5s',
          zIndex: 30,
        }}
        onMouseLeave={props.reducer.close}
        onMouseEnter={killTimer}
      >
        {children(props)}
      </Box>
    </FlexLayout>
  );
};
