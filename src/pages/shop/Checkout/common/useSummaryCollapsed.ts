import {useEffect, useState} from "react";
import {useLayoutListenerContext} from "../../../../components/LayoutIndicator/context";

export const useSummaryCollapsed = () => {
  const { layout, isMobile } = useLayoutListenerContext();
  const [collapsed, _setCollapsed] = useState(false);

  useEffect(function () {
    _setCollapsed( isMobile(layout) );
  }, [layout]);

  const setCollapsed = (collapsed: boolean) => {
    _setCollapsed( collapsed );
  };

  return {
    collapsed,
    setCollapsed,
  };
};
