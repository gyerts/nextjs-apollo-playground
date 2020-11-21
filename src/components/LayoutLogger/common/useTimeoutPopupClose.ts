import {useCallback, useEffect, useRef} from "react";


export const useTimeoutPopupClose = (isOpen: boolean, eventType: 'user'|'system', onClose?: () => void) => {
  const closeTimeoutHandler = useRef(0);

  const killTimer = useCallback(function () {
    clearTimeout(closeTimeoutHandler.current);
  }, []);

  useEffect(function () {
    if (isOpen && eventType === 'system') {
      closeTimeoutHandler.current = setTimeout(function () {
        onClose();
      }, 5000);
    }
  }, [isOpen, eventType]);

  useEffect(function () {
    return killTimer;
  }, []);

  return { killTimer }
};
