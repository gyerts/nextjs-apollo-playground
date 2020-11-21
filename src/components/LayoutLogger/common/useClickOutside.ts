import {useEffect} from "react";


/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useClickOutside(ref: {current: any}, onClose?: () => void) {
  useEffect(() => {
    /**
     * Close popup if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose && onClose();
      }
    }

    // Bind the event listener
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
}
