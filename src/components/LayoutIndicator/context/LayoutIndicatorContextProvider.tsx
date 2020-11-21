import React, {Reducer, useCallback, useReducer} from "react";
import {IInitialContext, IInitialContextProps, initialContext, LayoutIndicatorContext} from "./LayoutIndicatorContext";
import {Error} from "tslint/lib/error";
import {useLayoutStack} from "../common/useLayoutStack";
import {LayoutListener} from "../components/LayoutListener";


function reducer(state: IInitialContext, action: IAction): IInitialContextProps {
  switch (action.type) {
    case 'set':
      return {
        layout: action.payload.layout,
      };
    default:
      throw new Error(`LayoutIndicatorContextProvider unknown action ${JSON.stringify(action)}`);
  }
}

const init = (initialContext: IInitialContext) => initialContext;


export const LayoutListenerContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer<IReducerProps, IInitialContextProps>(reducer, initialContext, init);

  const set = useCallback(function (layout) {
    dispatch({type: 'set', payload: { layout }});
  }, []);

  const isMobile = useCallback(function (layout) {
    return ['xs'].includes(layout);
  }, []);

  const { layoutIn, layoutOut } = useLayoutStack({set});

  return (
    <LayoutIndicatorContext.Provider value={{
      ...state,
      set,
      isMobile,
    }}>
      {children}
      <LayoutListener maxWidth='sm' reverse name='xs' layoutIn={layoutIn} layoutOut={layoutOut} />
      <LayoutListener minWidth='sm' name='sm' layoutIn={layoutIn} layoutOut={layoutOut} />
      <LayoutListener minWidth='md' name='md' layoutIn={layoutIn} layoutOut={layoutOut} />
      <LayoutListener minWidth='lg' name='lg' layoutIn={layoutIn} layoutOut={layoutOut} />
      <LayoutListener minWidth='xl' name='xl' layoutIn={layoutIn} layoutOut={layoutOut} />
    </LayoutIndicatorContext.Provider>
  );
};

/**
 * TYPE DEFINITION
 */

interface IAction {
  type: 'set'
  payload: IInitialContextProps
}
type IReducerProps = Reducer<IInitialContextProps, IAction>;
