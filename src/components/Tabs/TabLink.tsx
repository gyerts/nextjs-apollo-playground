import React, {useEffect} from "react";
import {ITabLink, useTabsContext} from "./context";


interface IProps extends ITabLink {
}
export const TabLink = (item: IProps): null => {
  const { addMenuItem } = useTabsContext();

  useEffect(function () {
    addMenuItem(item);
  }, []);

  return null;
};

/**
 * src/components/Tabs/components/TabsLinks.tsx - usage here
 */
