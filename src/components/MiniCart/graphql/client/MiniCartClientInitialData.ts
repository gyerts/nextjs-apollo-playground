export interface IMiniCartState {
  eventType: 'system'|'user'
  isOpen: boolean
  messageId?: string|null
  isMessageError: boolean
  messagesCounter: number

  // @fixme The second header should not exists, or this logic should be impl outside
  isSecondaryHeaderActive: boolean

  __typename: 'MiniCartState'
}

export const miniCartClientInitialData: { miniCartState: IMiniCartState } = {
  miniCartState: {
    eventType: 'system',
    isOpen: false,
    messageId: null as string,
    isMessageError: false,
    messagesCounter: 0,
    isSecondaryHeaderActive: false,
    __typename: 'MiniCartState'
  },
};
