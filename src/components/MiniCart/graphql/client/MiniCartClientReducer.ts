import {GET_MINI_CART_STATE} from "./MiniCartClientQuery";
import {IMiniCartState} from "./MiniCartClientInitialData";
import {ApolloClientReducer} from "src/types";


interface QueryType {miniCartState: IMiniCartState}

const setMessage = (miniCartState: IMiniCartState, messageId: string, isMessageError: boolean=false) => {
  miniCartState.messageId = messageId || '';
  miniCartState.messagesCounter += 1;
  miniCartState.isMessageError = isMessageError;
};

export const miniCartClientReducer: {
  openMiniCart: ApolloClientReducer<{
    eventType: IMiniCartState['eventType'],
    messageId: IMiniCartState['messageId']}>

  closeMiniCart: ApolloClientReducer<never>

  toggleMiniCart: ApolloClientReducer<{
    eventType: IMiniCartState['eventType']}>

  setMessageMiniCart: ApolloClientReducer<{
    messageId: IMiniCartState['messageId'],
    error: IMiniCartState['isMessageError']}>

  setSecondaryHeaderActive: ApolloClientReducer<{
    active: IMiniCartState['isSecondaryHeaderActive']}>
} = {
  openMiniCart: (_, { eventType, messageId }, { cache }): null => {
    const queryResponse = cache.readQuery<QueryType>({ query: GET_MINI_CART_STATE });
    const miniCartState = { ...queryResponse.miniCartState };
    miniCartState.isOpen = true;
    miniCartState.eventType = eventType;
    setMessage(miniCartState, messageId);

    cache.writeQuery<QueryType>({
      query: GET_MINI_CART_STATE,
      data: { miniCartState }
    });

    return null;
  },
  
  closeMiniCart: (_, _variables, { cache }): null => {
    const queryResponse = cache.readQuery<QueryType>({ query: GET_MINI_CART_STATE });
    const miniCartState = { ...queryResponse.miniCartState };
    miniCartState.isOpen = false;



    setMessage(miniCartState, null);

    cache.writeQuery<QueryType>({
      query: GET_MINI_CART_STATE,
      data: { miniCartState }
    });

    return null;
  },

  toggleMiniCart: (_, { eventType }, { cache }): null => {
    const queryResponse = cache.readQuery<QueryType>({ query: GET_MINI_CART_STATE });
    const miniCartState = { ...queryResponse.miniCartState };
    miniCartState.isOpen = !miniCartState.isOpen;
    miniCartState.eventType = eventType;

    cache.writeQuery<QueryType>({
      query: GET_MINI_CART_STATE,
      data: { miniCartState }
    });

    return null;
  },

  setMessageMiniCart: (_, { messageId, error }, { cache }): null => {
    const queryResponse = cache.readQuery<QueryType>({ query: GET_MINI_CART_STATE });
    const miniCartState = { ...queryResponse.miniCartState };

    setMessage(miniCartState, messageId, error === undefined ? miniCartState.isMessageError : error);

    cache.writeQuery<QueryType>({
      query: GET_MINI_CART_STATE,
      data: { miniCartState }
    });

    return null;
  },

  setSecondaryHeaderActive: (_, { active }, { cache }): null => {
    const queryResponse = cache.readQuery<QueryType>({ query: GET_MINI_CART_STATE });
    const miniCartState = { ...queryResponse.miniCartState };

    miniCartState.isSecondaryHeaderActive = active;

    cache.writeQuery<QueryType>({
      query: GET_MINI_CART_STATE,
      data: { miniCartState }
    });

    return null;
  },
};
