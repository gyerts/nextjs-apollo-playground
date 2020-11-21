import {useCookies} from "react-cookie";


const cookieName = 'Session-Expire-At';

export const useSessionExpireAtCookies = () => {
  const [cookies] = useCookies([cookieName]);
  return { sessionExpiredAt: cookies[cookieName] ? +cookies[cookieName] : undefined };
};
