import React, {useEffect, useRef, useCallback} from "react";
import {IMiniCartState} from "../../graphql/client/MiniCartClientInitialData";
import {IMiniCartReducer} from "./MiniCartDataContainer";

type IMessageControllerProps = {
  state: IMiniCartState
  reducer: IMiniCartReducer
};
export const MessageController = ({state, reducer}: IMessageControllerProps): null => {
  const timerRef = useRef(0);

  const clearTimer = useCallback(function () {
    clearTimeout(timerRef.current);
  }, []);

  useEffect(function () {
    clearTimer();
    if (state.messageId) {
      timerRef.current = setTimeout(function () {
        reducer.setMessage(null);
      }, 2000);
    }
  }, [state.messagesCounter]);

  useEffect(function () {
    return clearTimer;
  }, []);

  return null;
};
