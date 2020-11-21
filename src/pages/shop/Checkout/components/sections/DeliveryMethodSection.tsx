import React, {useCallback, useEffect} from "react";
import {Box, Text, extractThemableProps, ThemedComponentProps} from "@market-ui/falcon-ui";
import {Card} from "src/components/Card";
import {T} from "@market-ui/falcon-i18n";
import {useCheckoutPageContext} from "../../context";
import {ShippingMethodLine} from "./AddressSection/ShippingMethodLine";


interface IProps extends ThemedComponentProps {
  collapsed: boolean
  onChange?: (method: string) => void
}
export const DeliveryMethodSection = (props: IProps) => {
  const {themableProps} = extractThemableProps(props);
  const { shippingMethods, loading, shippingMethod } = useCheckoutPageContext();

  const onChange = useCallback(function (methodCode: string) {
    props.onChange && props.onChange(methodCode);
  }, []);

  return (
    <Card as='section' {...themableProps} loading={loading === 'shippingMethod'}>
      <Text><b><T id='checkout.sections.delivery-method.title' /></b></Text>

      {props.collapsed && shippingMethod && (
        <ShippingMethodLine
          key={shippingMethod.methodCode}
          shippingMethod={shippingMethod}
          checked={shippingMethod && shippingMethod.methodCode === shippingMethod.methodCode}
          onChange={onChange}
          clickable={false}
        />
      )}

      {!props.collapsed && shippingMethods && (
        <Box>
          {shippingMethods.map(shippingMethod => (
            <ShippingMethodLine
              key={shippingMethod.methodCode}
              shippingMethod={shippingMethod}
              checked={shippingMethod && shippingMethod.methodCode === shippingMethod.methodCode}
              onChange={onChange}
            />
          ))}
        </Box>
      )}
    </Card>
  );
};
