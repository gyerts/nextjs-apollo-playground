import React from "react";
import {FlexLayout} from "@market-ui/falcon-ui";
import {GQLPaymentMethod} from "src/graphql-types";


interface IProps {
  paymentMethod: GQLPaymentMethod
}
export const PaymentMethodLine = ({paymentMethod}: IProps) => {
  // const onClick = useCallback(function (e) {
  //   if (e.target.checked) {
  //     onChange(paymentMethod.code);
  //   }
  // }, []);

  if (!paymentMethod) {
    return null;
  }

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
          {paymentMethod.title}
        </FlexLayout>
      </FlexLayout>

      {/*{clickable && (*/}
      {/*  <Radio*/}
      {/*    key={paymentMethod.code}*/}
      {/*    onChange={onClick}*/}
      {/*    // disabled={disabled}*/}
      {/*    mr="xs"*/}
      {/*    checked={checked}*/}
      {/*  />*/}
      {/*)}*/}
    </FlexLayout>
  );
};
