import React from "react";
import {Box} from "@market-ui/falcon-ui";


interface IProps {
  children: any
}
export const LayoutLayer = ({children}: IProps) => {
  return (
    <Box bgFullWidth='primary' pb='xl'>
      {children}
    </Box>
  );
};
