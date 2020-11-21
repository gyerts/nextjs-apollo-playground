import React from 'react';
import PropTypes from 'prop-types';
import { adopt } from 'react-adopt';

import {MiniCartQuery} from 'src/api';
import {GQLCart} from "src/graphql-types";

import {
  MiniCartClientQuery,
  CloseMiniCartMutation,
  OpenMiniCartMutation,
  ToggleMiniCartMutation,
  SetMessageMiniCartMutation,
} from '../..';
import {IMiniCartState} from "../../graphql/client/MiniCartClientInitialData";


type ReducersProps = {
  openMiniCartMutation: {openMiniCart: IMiniCartReducer['open']},
  closeMiniCartMutation: {closeMiniCart: IMiniCartReducer['close']},
  toggleMiniCartMutation: {toggleMiniCart: IMiniCartReducer['toggle']},
  setMessageMiniCartMutation: {setMessageMiniCart: IMiniCartReducer['setMessage']},
}
const Reducers = adopt<ReducersProps>({
  openMiniCartMutation: ({ render }) => (
    <OpenMiniCartMutation>{openMiniCart => render({ openMiniCart })}</OpenMiniCartMutation>
  ),
  closeMiniCartMutation: ({ render }) => (
    <CloseMiniCartMutation>{closeMiniCart => render({ closeMiniCart })}</CloseMiniCartMutation>
  ),
  toggleMiniCartMutation: ({ render }) => (
    <ToggleMiniCartMutation>{toggleMiniCart => render({ toggleMiniCart })}</ToggleMiniCartMutation>
  ),
  setMessageMiniCartMutation: ({ render }) => (
    <SetMessageMiniCartMutation>{setMessageMiniCart => render({ setMessageMiniCart })}</SetMessageMiniCartMutation>
  ),
});


interface IProps {
  children: (props: {
    state: IMiniCartState
    reducer: IMiniCartReducer
    data: {cart?: GQLCart}
  }) => React.ReactElement
}
export const MiniCartDataContainer = ({ children }: IProps) => (
  <MiniCartClientQuery>
    {({ miniCartState }: {miniCartState: IMiniCartState}) => (
      <MiniCartQuery>{(data: {cart?: GQLCart}) => (
        <Reducers>
          {({
              openMiniCartMutation,
              closeMiniCartMutation,
              toggleMiniCartMutation,
              setMessageMiniCartMutation,
            }: ReducersProps) =>
            children({
              state: {
                eventType: miniCartState.eventType,
                isOpen: miniCartState.isOpen,
                messageId: miniCartState.messageId,
                messagesCounter: miniCartState.messagesCounter,
                isSecondaryHeaderActive: miniCartState.isSecondaryHeaderActive,
                isMessageError: miniCartState.isMessageError,
              } as IMiniCartState,
              reducer: {
                open: openMiniCartMutation.openMiniCart,
                close: closeMiniCartMutation.closeMiniCart,
                toggle: toggleMiniCartMutation.toggleMiniCart,
                setMessage: setMessageMiniCartMutation.setMessageMiniCart,
              } as IMiniCartReducer,
              data,
            })
          }
        </Reducers>
      )}</MiniCartQuery>
    )}
  </MiniCartClientQuery>
);


MiniCartDataContainer.propTypes = {
  children: PropTypes.func.isRequired
};

export type IMiniCartReducer = {
  open: () => void
  close: () => void
  toggle: () => void
  setMessage: (messageId: string, error?: boolean) => void
}
