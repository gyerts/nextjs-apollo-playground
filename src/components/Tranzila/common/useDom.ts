import {useCallback} from "react";

export const useDom = () => {
  const setFocusOnCCNumber = useCallback(() => {
    const iFrame = document.getElementById("#tranzi\\.credit_card_number");
    iFrame && iFrame.focus()
  }, []);

  return {setFocusOnCCNumber};
};
