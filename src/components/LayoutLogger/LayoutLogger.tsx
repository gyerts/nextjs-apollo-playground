import React from "react";
import {Box} from "@market-ui/falcon-ui";
import {useLayoutListenerContext} from "../LayoutIndicator";

let enabled = false;

if (typeof window !== "undefined") {
  enabled = Boolean( window.localStorage.getItem('show-layout') );
}

interface IProps {
  side: 'left'|'right'
}
export const LayoutLogger = ({side}: IProps) => {
  const { layout } = useLayoutListenerContext();

  if (!enabled) {
    return null;
  }

  return (
    <Box position='fixed' top={20} left={20} css={{
      position: 'fixed',
      top: 'calc(50% + 80px)',
      height: 50, width: 50,
      border: '1px solid yellow',
      backgroundColor: 'black',
      color: 'white',
      fontSize: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      [side]: '0',
    }}>
      {layout}
    </Box>
  );
};
