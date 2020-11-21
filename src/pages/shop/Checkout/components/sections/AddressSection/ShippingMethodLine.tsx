import React, {useCallback} from "react";
import {Text, FlexLayout, Radio} from "@market-ui/falcon-ui";
import {GQLShippingMethod} from "src/graphql-types";
import {Price} from "src/uikitEjected/Locale";


interface IProps {
  shippingMethod: GQLShippingMethod
  onChange: (shippingMethodCode: string) => void
  checked: boolean
  clickable?: boolean
}
export const ShippingMethodLine = ({shippingMethod, checked, onChange, clickable = true}: IProps) => {
  const onClick = useCallback(function (e) {
    if (e.target.checked) {
      onChange(shippingMethod.methodCode);
    }
  }, []);

  return (
    <FlexLayout css={{
      width: '100%',
      alignItems: 'flex-start',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
    }} my='xs'>
      <FlexLayout css={{
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}>
        <FlexLayout>
          <Price value={shippingMethod.amount} />&nbsp;-&nbsp;{shippingMethod.methodTitle}
        </FlexLayout>
        <Text color='secondaryText'>
          {shippingMethod.methodDescription}
        </Text>
      </FlexLayout>

      {clickable && (
        <Radio
          key={shippingMethod.methodCode}
          onChange={onClick}
          // disabled={disabled}
          mr="xs"
          checked={checked}
        />
      )}
    </FlexLayout>
  );
};
