import React from "react";
import {Box} from "@market-ui/falcon-ui";


export const Delimiter = ({width}: {width: number}) => {
  return (
    <Box my='xs' as='li' css={{maxWidth: width, width, minWidth: width}} bg='black'>
      &nbsp;
    </Box>
  );
};
