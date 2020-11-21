import React, {Reducer, useCallback, useReducer} from "react";
import {IInitialContext, IInitialContextProps, initialContext, TopPageMessageContext} from "./TopPageMessageContext";
import {Error} from "tslint/lib/error";

const defaultUndefined = (value: any, defaultValue: any) => (
  typeof value === "undefined" ? defaultValue : value
);

function reducer(state: IInitialContext, action: IAction): IInitialContextProps {
  switch (action.type) {
    case 'set_message':
      return {
        opened: defaultUndefined(action.payload.opened, state.opened),
        message: defaultUndefined(action.payload.message, state.message),
        title: defaultUndefined(action.payload.title, state.title),
        options: action.payload.options ? {
          closable: defaultUndefined(action.payload.options.closable, state.options.closable),
          autoClose: defaultUndefined(action.payload.options.autoClose, state.options.autoClose),
          isError: defaultUndefined(action.payload.options.isError, state.options.isError),
        } : state.options,
      };
    default:
      throw new Error(`TopPageMessageContextProvider unknown action ${JSON.stringify(action)}`);
  }
}

const init = (initialContext: IInitialContext) => initialContext;


export const TopPageMessageContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer<IReducerProps, IInitialContextProps>(reducer, initialContext, init);

  const openMessage = useCallback(function (title, message, options) {
    if (typeof window !== 'undefined') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    dispatch({type: 'set_message', payload: { title, message, options, opened: true }});
  }, []);

  const closeMessage = useCallback(function () {
    dispatch({type: 'set_message', payload: { opened: false }});
  }, []);

  return (
    <TopPageMessageContext.Provider value={{
      ...state,
      openMessage,
      closeMessage,
    }}>
      {children}
    </TopPageMessageContext.Provider>
  );
};

/**
 * TYPE DEFINITION
 */

interface IAction {
  type: 'set_message'
  payload: IInitialContextProps
}
type IReducerProps = Reducer<IInitialContextProps, IAction>;
