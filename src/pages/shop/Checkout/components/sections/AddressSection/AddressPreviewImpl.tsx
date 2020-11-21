import React, {useCallback} from "react";
import {
  GQLAddressPreview,
} from "src/components";
import {useCheckoutPageContext} from "../../../context";
import {IAddress} from "src/api";


interface IImplProps {
  address: IAddress
  addressType: 'deliveryAddress'|'billingAddress'
  disabled: boolean
}

export const PreviewAddressSectionImpl = (props: IImplProps) => {
  const { requestForceOpenSection } = useCheckoutPageContext();

  const requestOpenSection = useCallback(function () {
    requestForceOpenSection(props.addressType);
  }, []);

  return (
    <GQLAddressPreview
      address={props.address}
      requestChange={requestOpenSection}
      disabled={props.disabled}
    />
  );
};
