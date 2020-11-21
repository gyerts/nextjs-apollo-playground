import {useCallback, useEffect, useRef, useState} from "react";
import {SESSION_TIMEOUT_INTERVAL_CHECK_MINUTES} from "src/config";
import {useSessionExpireAtCookies} from "./useSessionExpireAtCookies";
import {calcSessionState, ISessionState} from "./calcSessionState";


export const useSessionCheck = () => {
  const { sessionExpiredAt } = useSessionExpireAtCookies();

  const intervalHandlerRef = useRef<any>();
  const sessionExpiredAtRef = useRef(sessionExpiredAt);
  const [sessionTimeoutState, setSessionTimeoutState] = useState<ISessionState>('expired');

  useEffect(function () {
    sessionExpiredAtRef.current = sessionExpiredAt;
    setSessionTimeoutState( calcSessionState(sessionExpiredAt) )
  }, [sessionExpiredAt]);

  useEffect(function () {
    return () => stop("unmount");
  }, []);

  const start = useCallback(function () {
    stop('before-start');
    // console.log('SessionTimeout:useSessionCheck:start()');
    intervalHandlerRef.current = setInterval(checkSessionIntervalFn, SESSION_TIMEOUT_INTERVAL_CHECK_MINUTES * 60 * 1000);
  }, []);

  const stop = useCallback(function (debugReason: 'before-start'|'unmount'|'expired'|'no-customer'|'no-cookies') {
    // console.log('SessionTimeout:useSessionCheck:stop() reason ->', debugReason);
    clearInterval(intervalHandlerRef.current);
  }, []);

  const checkSessionIntervalFn = useCallback(function () {
    // console.log('SessionTimeout:useSessionCheck:run()');
    setSessionTimeoutState( calcSessionState(sessionExpiredAtRef.current) );
  }, []);

  return { start, stop, sessionTimeoutState, cookiesAvailable: Boolean(sessionExpiredAt) }
};
