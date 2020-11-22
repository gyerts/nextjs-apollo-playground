import {useCallback, useState} from "react";
import {useRouter} from "next/router";
// @ts-ignore
import {UnregisterCallback} from "history";

let _unblock: UnregisterCallback = undefined;

export function useHistoryBlock() {
  const history = useRouter();
  const [locked, setLocked] = useState<boolean>();

  const unblock = useCallback(function () {
    setLocked(false);
    if (_unblock) {
      _unblock();
      window.onbeforeunload = undefined;
    } else {
      console.error('history: nothing to unblock');
    }
  }, []);

  const block = useCallback(function (prompt: string) {
    setLocked(true);
    // @ts-ignore
    _unblock = history.block(prompt);
    window.onbeforeunload = () => prompt;
  }, []);

  if (typeof window !== "undefined") {
    // @ts-ignore
    window.block = block;
    // @ts-ignore
    window.unblock = unblock;
  }

  return {locked, block, unblock};
}
