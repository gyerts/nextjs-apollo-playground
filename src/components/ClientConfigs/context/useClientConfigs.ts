import {useContext} from "react";
import {ClientConfigsContext} from "./ClientConfigsContextProvider";

export const useClientConfigs = () => {
  return useContext(ClientConfigsContext);
};
