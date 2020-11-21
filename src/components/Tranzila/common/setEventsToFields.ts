import {ITransilaFieldsProps} from "./useFields";

interface IFields {
  onEvent: (eventName: string, cb: (event: any) => void) => void
}

export const setEventsToFields = function (
  fields: IFields,
  props: ITransilaFieldsProps,
  _t: (id: string) => string,
) {
  let validCCN = false, validCCV = false, validExp = false, validCHID = false;
  let emptyCCN = true, emptyCCV = true, emptyExp = true, emptyCHID = true;

  fields.onEvent('ready', (event) => {
    props.onReady && props.onReady();
  });

  fields.onEvent('focus', (event) => {
    props.setFocusedField && props.setFocusedField(event.field);
  });

  fields.onEvent('validityChange', function (event) {
    switch (event.field) {
      case "credit_card_number":
        validCCN = event.isValid;
        break;
      case "cvv":
        validCCV = event.isValid;
        break;
      case "expiry":
        validExp = event.isValid;
        break;
      case "card_holder_id_number":
        validCHID = event.isValid;
        break;
    }
    //if (validCCN && validCCV && validExp && validCHID) {
    //	$('.Card-Errors').addClass("Display-None");
    //}
  });

  fields.onEvent('empty', function (event) {
    switch (event.field) {
      case "credit_card_number":
        emptyCCN = true;
        break;
      case "cvv":
        emptyCCV = true;
        break;
      case "expiry":
        emptyExp = true;
        break;
      case "card_holder_id_number":
        emptyCHID = true;
        break;
    }
  });

  fields.onEvent('notEmpty', function (event) {
    switch (event.field) {
      case "credit_card_number":
        emptyCCN = false;
        break;
      case "cvv":
        emptyCCV = false;
        break;
      case "expiry":
        emptyExp = false;
        break;
      case "card_holder_id_number":
        emptyCHID = false;
        break;
    }
  });

  fields.onEvent('blur', function (event) {
    // if you need name of field which was unfocused use event.field

    const errorsObject: {[param: string]: string} = {};

    if (!validCCN && !emptyCCN) {
      errorsObject['credit_card_number'] = _t("checkout.sections.payment-method.validation.ccn_invalid");
    }
    if (!validCCV && !emptyCCV) {
      errorsObject['cvv'] = _t("checkout.sections.payment-method.validation.cvv_invalid");
    }
    if (!validExp && !emptyExp) {
      errorsObject['expiry'] = _t("checkout.sections.payment-method.validation.expiration_invalid");
    }
    if (!validCHID && !emptyCHID) {
      errorsObject['card_holder_id_number'] = _t("checkout.sections.payment-method.validation.customer_id_invalid");
    }

    props.setFieldsErrors(errorsObject);
  });

  fields.onEvent('inputSubmitRequest', function (event) {
    props.onSubmitRequest && props.onSubmitRequest();
  });

  fields.onEvent('cardTypeChange', function (event) {
    props.onCardLogoChanged && props.onCardLogoChanged(event.cardType);
  });
};
