import {FlexLayout, Text} from "@market-ui/falcon-ui";
import {T} from "@market-ui/falcon-i18n";
import React from "react";
import {bothResolutions} from "../../../../../styling/cssHelper";

export const InStock = ({gridArea, inStock, ...props}) => {
  return (
    <FlexLayout gridArea={gridArea} {...props} justifyContent={bothResolutions('end', 'center')}>{inStock ? (
      <Text fontSize='xxs'><T id='cart.inStock' /></Text>
    ) : (
      <Text fontSize='xxs' color='errorText'><T id='cart.outOfStock' /></Text>
    )}</FlexLayout>
  );
}
