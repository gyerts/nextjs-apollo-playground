import React from "react";
import {Box, Button, extractThemableProps, H3, Text, ThemedComponentProps} from "@market-ui/falcon-ui";
import {Card, TT} from "src/components";
import {Link as RouterLink} from "react-router-dom";
import {toGridTemplate} from "src/uikitEjected/helpers";
import {T} from "@market-ui/falcon-i18n";

interface IProps extends ThemedComponentProps {
  orderId: string
  email: string
}
export const ThankYouSection = ({orderId, email, ...props}: IProps) => {
  const {themableProps} = extractThemableProps(props);

  return (
    <Card as='section' {...themableProps}>
      <Box defaultTheme={layout}>
        <H3 fontWeight='bold' gridArea={area.title}><T id='checkout.sections.thank-you.title' /></H3>

        <Box gridArea={area.tip}>
          <Text><T id="checkout.sections.thank-you.tip" /></Text>
          <Text>{email}</Text>
        </Box>

        <Text gridArea={area.number} fontWeight='bold'><T id="checkout.sections.thank-you.orderNumber" />: {orderId}</Text>

        {/*<Button gridArea={area.viewOrder} as={RouterLink} to={`/account/orders/${orderId}`}><T id='checkout.sections.thank-you.viewBtn' /></Button>*/}
        <Button gridArea={area.continueShopping} variant="inverse" as={RouterLink} to='/'><TT id='checkout.sections.thank-you.continueBtn' /></Button>
      </Box>
    </Card>
  );
};

const area = {
  title: "title",
  tip: "tip",
  number: "number",
  viewOrder: "viewOrder",
  continueShopping: "continueShopping",
};

const layout: any = {
  orderThankYouLayout: {
    display: 'grid',
    gridGap: 'sm',
    gridTemplate: toGridTemplate([
      ['1fr'                , ],
      [area.title           , ],
      [area.tip             , ],
      [area.number          , ],
      [area.viewOrder       , ],
      [area.continueShopping, ],
    ])
  }
};
