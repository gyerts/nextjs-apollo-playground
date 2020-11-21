import {useEffect, useState} from "react";
import {useLayoutListenerContext} from "../../../../components/LayoutIndicator/context";

export const useMobileLogic = () => {
  const { layout, isMobile } = useLayoutListenerContext();
  const [viewMode, setViewMode] = useState(false);

  useEffect(function () {
    setViewMode( isMobile(layout) );
  }, [layout]);

  return {
    viewMode,
    isMobile: isMobile(layout),
  };
};
