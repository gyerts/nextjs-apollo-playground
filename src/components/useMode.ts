import {useCallback, useState} from "react";

/**
 * @description custom hook for mode, eg edit mode
 *
 *   const [editMode, enableEditMode, disableEditMode] = useMode();
 */
export const useMode = (): [boolean, (disableIn?: number) => void, () => void] => {
  const [enabled, setEnabled] = useState(false);

  const enable = useCallback(function (disableIn?: number) {
    setEnabled(true);
    if (typeof disableIn === 'number') {
      setTimeout(disable, disableIn);
    }
  }, []);

  const disable = useCallback(function () {
    setEnabled(false);
  }, []);

  return [enabled, enable, disable];
};
