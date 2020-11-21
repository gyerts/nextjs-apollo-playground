import React, {useCallback} from 'react';
import {
  Box,
  Dropdown,
  DropdownLabel,
  DropdownMenu,
  DropdownMenuItem,
  extractThemableProps,
  ThemedComponentProps
} from "@market-ui/falcon-ui";
import {T} from "@market-ui/falcon-i18n";
import {FormFieldLabel} from "../../Forms/components/FormFieldLabel";


interface IProps extends ThemedComponentProps {
  installments: number
  setInstallments: (selectedDropdown: 1|2) => void
}
export const InstallmentsDropdown = ({installments, setInstallments, ...props}: IProps) => {
  const { themableProps } = extractThemableProps(props);

  const onChange = useCallback(function (installments: 1|2) {
    setInstallments(installments);
  }, []);

  return (
    <Box {...themableProps}>
      <FormFieldLabel><T id='checkout.sections.payment-method.installments.label' /></FormFieldLabel>

      <Dropdown onChange={onChange}>
        {installments === 1 ? (
          <DropdownLabel><T id='checkout.sections.payment-method.installments.option1' /></DropdownLabel>
        ) : (
          <DropdownLabel><T id='checkout.sections.payment-method.installments.option2' /></DropdownLabel>
        )}

        <DropdownMenu>
          <DropdownMenuItem value={1}><T id='checkout.sections.payment-method.installments.option1' /></DropdownMenuItem>
          <DropdownMenuItem value={2}><T id='checkout.sections.payment-method.installments.option2' /></DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    </Box>
  );
};
