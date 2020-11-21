import React, {useCallback, useEffect, useRef} from "react";
import {useModalContext} from "src/components";
import {useSessionCheck} from "./common/useSessionCheck";
import {SessionTimeoutModalContent} from "./components/SessionTimeoutModal";
import {SessionNearlyTimeoutModal} from "./components/SessionNearlyTimeoutModal";
import {ErrorBoundary} from "src/components/ErrorBoundary";
import {Error} from "tslint/lib/error";
import {IIsAuthenticated, IIsAuthenticatedResponse, IsAuthenticatedQuery} from "../../api";

interface IProps {
  customer?: IIsAuthenticated
}
const SessionTimeoutListenerImpl = ({customer}: IProps): null => {
  const { openModal, closeModal } = useModalContext();
  const { start, stop, sessionTimeoutState, cookiesAvailable } = useSessionCheck();
  const initializedRef = useRef(false);
  const modalOpenedRef = useRef(false);

  const onCloseModal = useCallback(function () {
    closeModal();
    modalOpenedRef.current = false;
  }, []);

  useEffect(function () {
    if (initializedRef.current) {
      switch (sessionTimeoutState) {
        case "alive": {
          if (modalOpenedRef.current) {
            closeModal();
          }
          break;
        }
        case "nearly-expired": {
          openModal(null, () => <SessionNearlyTimeoutModal closeModal={onCloseModal} />);
          modalOpenedRef.current = true;
          break;
        }
        case "expired": {
          openModal(null, () => <SessionTimeoutModalContent closeModal={onCloseModal} />);
          modalOpenedRef.current = true;
          break;
        }
      }
    }
  }, [sessionTimeoutState]);

  useEffect(function () {
    if (cookiesAvailable) {
      if (sessionTimeoutState == "expired") {
        stop("expired");
      } else {
        customer ? start() : stop("no-customer");
      }
    } else {
      stop("no-cookies");
    }
  }, [customer, cookiesAvailable, sessionTimeoutState]);

  /**
   * ==========================================
   * this statement should always be last
   * ==========================================
   */
  useEffect(function () {
    initializedRef.current = true;
  }, []);

  return null;
};

export const SessionTimeoutListener = () => {
  const logError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    console.error('SessionTimeoutListener is not working due to internal error', error, errorInfo);
  }, []);

  return (
    <ErrorBoundary logError={logError}>
      <IsAuthenticatedQuery>{({customer}: IIsAuthenticatedResponse) => (
        <SessionTimeoutListenerImpl customer={customer} />
      )}</IsAuthenticatedQuery>
    </ErrorBoundary>
  );
};
