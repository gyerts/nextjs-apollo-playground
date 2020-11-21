import {FlexLayout, H4} from "@market-ui/falcon-ui";
import {T} from "@market-ui/falcon-i18n";
import React from "react";
import {bothResolutions, mobileOnly} from "src/styling/cssHelper";

export const TitleRow = ({gridArea}) => (
  <FlexLayout
    gridArea={gridArea}
    flex={1}
    justifyContent='flex-start'
    mt={bothResolutions('sm', 'md')}
    mb={mobileOnly('sm')}
  >
    <H4><T id="cart.title" /></H4>
  </FlexLayout>
);
