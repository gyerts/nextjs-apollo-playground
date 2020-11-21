import {useContext} from "react";
import {LayoutIndicatorContext} from "./LayoutIndicatorContext";


export const useLayoutListenerContext = () => {
  return useContext(LayoutIndicatorContext);
};
