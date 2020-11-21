import {useContext} from "react";
import {TabsContext} from "./TabsContext";


export const useTabsContext = () => {
  return useContext(TabsContext);
};
