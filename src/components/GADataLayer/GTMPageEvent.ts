import {useEffect} from 'react';
import {dataLayerPush} from "./common/dataLayerPush";

export const GTMPageEvent = (): null => {
  useEffect(() => {
    dataLayerPush({
      event: "pageview",
      page_title: window.document.title,
      page_location: location.href,
      page_path: location.pathname,
    });
  }, []);

  return null;
};
