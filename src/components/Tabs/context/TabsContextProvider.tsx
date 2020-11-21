import React, {Reducer, useCallback, useReducer} from "react";
import {Error} from "tslint/lib/error";
import {IInitialContext, IInitialContextProps, initialContext, ITabLink, TabsContext} from "./TabsContext";


function reducer(state: IInitialContext, action: IAction): IInitialContextProps {
  const copiedState = {...state};

  switch (action.type) {
    case 'addRoute':
      copiedState.routes = [...(copiedState.routes || [])];
      copiedState.routes.push(action.payload.route);
      return copiedState;

    case 'addMenuItem':
      copiedState.menuItems = [...(copiedState.menuItems || [])];
      copiedState.menuItems.push(action.payload.menuItem);
      return copiedState;

    default:
      throw new Error(`TabsContext unknown action ${JSON.stringify(action)}`);
  }
}

const init = (initialContext: IInitialContext) => initialContext;


export const TabsContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer<IReducerProps, IInitialContextProps>(reducer, initialContext, init);

  const addRoute = useCallback(function (route: React.ReactElement) {
    dispatch({type: 'addRoute', payload: { route }});
  }, []);

  const addMenuItem = useCallback(function (menuItem: ITabLink) {
    dispatch({type: 'addMenuItem', payload: { menuItem }});
  }, []);

  return (
    <TabsContext.Provider value={{
      ...state,
      addRoute,
      addMenuItem,
    }}>
      {children}
    </TabsContext.Provider>
  );
};

/**
 * TYPE DEFINITION
 */
interface IAction {
  type: 'addRoute'|'addMenuItem'
  payload: {
    route?: React.ReactElement
    menuItem?: ITabLink
  }
}
type IReducerProps = Reducer<IInitialContextProps, IAction>;
