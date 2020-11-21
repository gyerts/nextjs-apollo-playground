import React from "react";

import {T} from "@market-ui/falcon-i18n";
import {Box, Text, Button} from "@market-ui/falcon-ui";
import {Link as RouterLink} from "react-router-dom";
import {bothResolutions} from "src/styling/cssHelper";


export const CartEmptyRow = ({gridArea}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gridArea={gridArea}>
      <Text mt="sm">
        <T id="cart.empty.title" />
      </Text>
      <Button mt="md" as={RouterLink} to="/" px='sm' width={280} fontWeight='bold' letterSpacing={1.35}>
        <T id="cart.empty.btn" />
      </Button>
      <Box height={bothResolutions('lg', 'xl')} />
    </Box>
  );
};
