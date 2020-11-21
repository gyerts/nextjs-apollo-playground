import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useFields} from "./common/useFields";
import {IErrorsObject, useError} from "./common/useError";
import {useDom} from "./common/useDom";
import {TranzilaInput} from "./components/TranzilaInput";
import {IChargeRequestParams, IChargeResponse, INSTALLMENTS_PAYMENT, ITranzilaError, REGULAR_PAYMENT} from "./types";
import {Box, Button} from "@market-ui/falcon-ui";
import {ErrorView} from "./components/ErrorView";
import {toGridTemplate} from "src/uikitEjected";
import {I18nContext, T} from "@market-ui/falcon-i18n";
import {GQLPaymentMethod} from "src/graphql-types";
import {useMode} from "../useMode";
import {useHistoryBlock} from "src/utils/history";
import {InstallmentsDropdown} from "./components/InstallmentsDropdowm";


type ITranzilaProps = {
  amount: number
  orderId: string
  email: string
  paymentMethod: GQLPaymentMethod
  onMoneyCharged: (response: IChargeResponse['transaction_response']) => void
  onStartLoading: (loading: boolean) => void
}
export const Tranzila = ({orderId, email, amount, onMoneyCharged, onStartLoading}: ITranzilaProps) => {
  const {
    fieldsErrors, globalErrors,
    setFieldsErrors, setGlobalErrors,
    hasFieldsErrors, hasGlobalErrors,
    hasFieldsErrorsRef, hasGlobalErrorsRef,
  } = useError();
  const { setFocusOnCCNumber } = useDom();
  const { fieldsRef } = useFields({ onReady: setFocusOnCCNumber, setFieldsErrors });
  const {t} = useContext(I18nContext);
  const [charging, enableCharging, disableCharging] = useMode();
  const {block, unblock} = useHistoryBlock();
  const { installments, installmentsRef, setInstallments } = useInstallments();

  const disableLoading = () => {
    unblock();
    disableCharging();
    onStartLoading(false);
  };

  const onCCDataChargeComplete = useCallback((err: {messages: ITranzilaError[]}, response: IChargeResponse) => {
    if (err) {
      disableLoading();
      const fieldErrors: IErrorsObject = {};
      const globalErrors: ITranzilaError[] = [];
      err.messages.forEach(er => {
        if ( er.code.endsWith('_invalid') ) {
          fieldErrors[ er.code.replace(/_invalid$/, '') ] = er.message;
        } else {
          globalErrors.push(er);
        }
      });
      setFieldsErrors(fieldErrors);
      setGlobalErrors(globalErrors);
    }
    // if (response.errors) {
    //   setGlobalErrors(response.errors);
    // }
    if (response.errors || response.transaction_response.error) {
      disableLoading();
      setGlobalErrors([{ message: t('errors.tranzilaTransaction')}]);
    }

    if (response && response.transaction_response) {
      onMoneyCharged(response.transaction_response);
    }
  }, []);

  const chargeCCData = useCallback(() => {
    enableCharging();
    onStartLoading(true);
    setGlobalErrors([]);
    block(t('checkout.sections.payment-method.leave-page-warning'));
    const installments = installmentsRef.current;

    const chargeData: IChargeRequestParams = {
      terminal_name: 'wow513',
      total_installments_number: installments,
      amount,
      first_installment_amount: amount / installments,
      other_installments_amount: amount / installments,
      payment_plan: installments === 1 ? REGULAR_PAYMENT : INSTALLMENTS_PAYMENT,
      orderid: orderId,
      email,
      tran_mode: "V",
    };
    fieldsRef.current.charge(chargeData, onCCDataChargeComplete);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!hasFieldsErrorsRef.current) {
      chargeCCData();
    }
  }, []);

  return (
    <Box>
      {/*<Helper />*/}

      <form id='payment_form' onSubmit={onSubmit}>
        <Box defaultTheme={layout as any}>
          <TranzilaInput
            gridArea={area.customer_id}
            id='card_holder_id_number' label={t('tranzila.cid')}   required error={fieldsErrors['card_holder_id_number']} />
          <TranzilaInput
            gridArea={area.number_of_card}
            id='credit_card_number'    label={t('tranzila.ccno')}  required error={fieldsErrors['credit_card_number']} />
          <TranzilaInput
            gridArea={area.security_code}
            id='cvv'                   label={t('tranzila.cvv')}   required error={fieldsErrors['cvv']} />
          <TranzilaInput
            gridArea={area.expiry_date}
            id='expiry'                label={t('tranzila.ccexp')} required error={fieldsErrors['expiry']} />
          {/*<InstallmentsDropdown*/}
          {/*  gridArea={area.installments}*/}
          {/*  installments={installments}*/}
          {/*  setInstallments={setInstallments}*/}
          {/*/>*/}
          <Button
            gridArea={area.submit}
            disabled={charging || hasFieldsErrors}
          >
            <T id='checkout.sections.payment-method.submit' />
          </Button>
          <Box gridArea={area.error}>
            {globalErrors.map(er => (
              <ErrorView  error={er.message} />
            ))}
          </Box>
        </Box>
      </form>
    </Box>
  )
};

const area = {
  customer_id: 'customer_id',
  number_of_card: 'number_of_card',
  security_code: 'security_code',
  expiry_date: 'expiry_date',
  submit: 'submit',
  // installments: 'installments',
  error: 'error',
  empty: '.',
};

const layout = {
  paymentForm: {
    display: 'grid',
    gridGap: 'md',
    // prettier-ignore
    gridTemplate:  toGridTemplate([
      ['1fr', '1fr'],
      [area.customer_id, area.customer_id],
      [area.number_of_card, area.number_of_card],
      [area.expiry_date, area.security_code],
      // [area.installments, area.installments],
      [area.error, area.error],
      [area.submit, area.submit],
    ])
  }
};

function useInstallments () {
  const [installments, setInstallments] = useState<1|2>(1);
  const installmentsRef = useRef(installments);

  useEffect(function () {
    installmentsRef.current = installments;
  }, [installments]);

  return {installments, installmentsRef, setInstallments}
}
