import {useCallback, useEffect, useState} from "react";

/**
 * This script does't delete added script from header
 * Once it added per reload page, no need to add it again, because it can leads to unexpected errors
 */
const alreadyAddedScripts: {[key: string]: boolean} = {};
const alreadyLoadedScript: {[key: string]: boolean} = {};

/**
 * @description If you need download some script outside like googleapi you can use this hook
 * const scriptLoaded = useScript('http://script-url-path');
 * @param url
 */
export const useScript = (url: string) => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>();

  useEffect(function () {
    if ( !alreadyAddedScripts[url] ) {
      alreadyAddedScripts[url] = true;
      addScript(url);

    } else if ( !alreadyLoadedScript[url] ) {
      const handler = setInterval(function () {
        if (alreadyLoadedScript[url]) {
          setScriptLoaded(true);
          clearInterval(handler);
        }
      }, 100);
    }
  }, []);

  const setScriptSuccessfullyLoaded = useCallback(function () {
    alreadyLoadedScript[url] = true;
    setScriptLoaded(true);
  }, []);

  const addScript = useCallback((url: string) => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.addEventListener('load', setScriptSuccessfullyLoaded);

    document.body.appendChild(script);

    return () => {
      delete alreadyAddedScripts[url];
      delete alreadyLoadedScript[url];
      document.body.removeChild(script);
    }
  }, [url]);

  return alreadyAddedScripts[url] && alreadyLoadedScript[url];
};
