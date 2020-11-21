export const calcSessionState: ICalcSessionStateSignature = ( sessionExpiredAt ) => {
  // console.log('SessionTimeout:calcSessionState sessionExpiredAt : ', new Date(sessionExpiredAt));
  // console.log('SessionTimeout:calcSessionState now              : ', new Date());
  const deltaTime = (sessionExpiredAt - new Date().getTime()) / 1000;
  let result: ISessionState = 'alive';

  if (deltaTime < 0) {
    result = 'expired';
  } else if (deltaTime < 120) {
    result = 'nearly-expired';
  }
  // console.log('SessionTimeout:calcSessionState', result, ', delta: ', deltaTime);

  return result;
};

export type ISessionState =
  |'alive'              // session is not expired, and left time more than 1 minute
  |'nearly-expired'     // left eproximately 1 minute
  |'expired'
  ;

type ICalcSessionStateSignature = ( sessionExpiredAt: number ) => ISessionState;
