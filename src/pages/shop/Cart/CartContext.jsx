import React, {useContext, useReducer, useCallback} from "react";

const initialContext = {
  titleId: null,
  messageId: null,
  isError: false,
  openMessage: () => {},
  closeMessage: () => {},
};

/**
 * REDUCERS DEFINITION
 */
function reducer(state, action) {
  switch (action.type) {
    case 'set_message':
      return {
        messageId: action.payload.messageId,
        titleId: action.payload.titleId,
        isError: action.payload.isError || state.isError,
      };
    default:
      throw new Error();
  }
}

const init = initialContext => initialContext;

/**
 * CONTEXT DEFINITION
 */
const CartContext = React.createContext(initialContext);

export const CartContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialContext, init);

  const openMessage = useCallback(function (titleId, messageId, isError) {
    dispatch({type: 'set_message', payload: { titleId, messageId, isError }});
  }, []);

  const closeMessage = useCallback(function () {
    dispatch({type: 'set_message', payload: { titleId: '', messageId: '' }});
  }, []);

  return (
    <CartContext.Provider value={{
      ...state,
      openMessage,
      closeMessage,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  return useContext(CartContext);
};
