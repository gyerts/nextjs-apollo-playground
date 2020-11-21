import {useContext} from "react";
import {TopPageMessageContext} from "./TopPageMessageContext";


export const useTopPageMessageContext = () => {
  return useContext(TopPageMessageContext);
};
