import React, {Reducer, useCallback, useReducer} from "react";
import {
  FUNC_STUB,
  IInitialContext,
  IInitialContextProps,
  IModalOptions,
  initialContext,
  ModalContext
} from "./ModalContext";


function reducer(state: IInitialContext, action: IAction): IInitialContextProps {
  switch (action.type) {
    case 'open':
      return {
        opened: true,
        title: action.payload.title,
        Component: action.payload.Component || FUNC_STUB,
        options: action.payload.options ? {
          className: action.payload.options.className || '',
          bigContent: action.payload.options.bigContent || false,
        } : state.options
      };
    case 'close':
      return {
        opened: false,
        title: null,
        options: {
          className: '',
          bigContent: false,
        },
        Component: FUNC_STUB,
      };
    default:
      throw new Error(`ModalContext unknown action ${JSON.stringify(action)}`);
  }
}

const init = (initialContext: IInitialContext) => initialContext;


export const ModalContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer<IReducerProps, IInitialContextProps>(reducer, initialContext, init);

  const openModal = useCallback(function (
    title: string,
    Component: React.FunctionComponent,
    options: IModalOptions
  ) {
    dispatch({type: 'open', payload: { title, Component, options }});
  }, []);

  const closeModal = useCallback(function () {
    dispatch({type: 'close', payload: {}});
  }, []);

  return (
    <ModalContext.Provider value={{
      ...state,
      openModal,
      closeModal,
    }}>
      {children}
    </ModalContext.Provider>
  );
};

/**
 * TYPE DEFINITION
 */
interface IAction {
  type: 'open'|'close'
  payload: IInitialContextProps
}
type IReducerProps = Reducer<IInitialContextProps, IAction>;
