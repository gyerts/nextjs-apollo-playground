import React, {useCallback, useContext, useEffect, useRef} from "react";
import {DeleteIcon} from "src/styling";
import {useModalContext, useTopPageMessage} from "src/components";
import {DeleteAddressModalContent} from "./DeleteAddressModalContent";
import {themedColors} from "src/theme/colors";
import {TryDeleteDefaultAddressModalContent} from "./TryDeleteDefaultAddressModalContent";
import {I18nContext} from "@market-ui/falcon-i18n";

interface IProps {
  id: string
  disabled?: boolean
}
export const DeleteButton = ({id, disabled}: IProps) => {
  const { openErrorMessage, openSuccessMessage } = useTopPageMessage();
  const {openModal, closeModal} = useModalContext();
  const disabledRef = useRef(disabled);
  const {t} = useContext(I18nContext);

  useEffect(function () {
    disabledRef.current = disabled;
  }, [disabled]);

  const showErrorMessage = useCallback(function () {
    openErrorMessage(t('words.error'), t('account.addresses.topPageMessage.deleted.error'));
  }, []);

  const showSuccessMessage = useCallback(function () {
    openSuccessMessage(t('account.addresses.topPageMessage.deleted.title'), t('account.addresses.topPageMessage.deleted.message'));
  }, []);

  const deleteAddress = useCallback(function () {
    if (disabledRef.current) {
      openModal(t('account.addresses.modals.default.title'), () => (
        <TryDeleteDefaultAddressModalContent onClose={closeModal} />
      ))
    } else {
      openModal(t('account.addresses.modals.delete.title'), () => (
        <DeleteAddressModalContent
          id={id}
          onSuccess={showSuccessMessage}
          onError={showErrorMessage}
          onClose={closeModal}
        />
      ))
    }
  }, []);

  return (
    <DeleteIcon
      onClick={deleteAddress}
      css={{fill: disabled ? themedColors.disabledText : themedColors.black}}
    />
  )
};
