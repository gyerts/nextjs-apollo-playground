import {internalStylesOfInputs} from "./internalStylesOfInputs";
import {setEventsToFields} from "./setEventsToFields";
import {useContext, useEffect, useRef, useState} from "react";
import {TzlaHostedFields} from "../lib/thostedf";
import {I18nContext} from "@market-ui/falcon-i18n";


export type ITransilaFieldsProps = {
  onReady?: () => void,
  setFieldsErrors: (errors: {[param: string]: string}) => void
  setFocusedField?: (field: string) => void,
  onCardLogoChanged?: (cardType: string) => void,
  onSubmitRequest?: () => void,
};
export const useFields = (props: ITransilaFieldsProps) => {
  const [fields, setFields] = useState();
  const fieldsRef = useRef(fields);
  const { t } = useContext(I18nContext);

  useEffect(function () {
    fieldsRef.current = fields;
  }, [fields]);

  useEffect(function () {
    const fields = TzlaHostedFields.create({
      sandbox: false,
      styles: internalStylesOfInputs,
      fields: {
        card_holder_id_number: {
          selector: '#card_holder_id_number',
          placeholder: 'ID',
          tabindex: 1
        },
        credit_card_number: {
          selector: '#credit_card_number',
          placeholder: 'Credit card number',
          tabindex: 2
        },
        expiry: {
          selector: '#expiry',
          placeholder: 'MM/YYYY',
          version: '1',
          tabindex: 3
        },
        cvv: {
          selector: '#cvv',
          placeholder: 'CVV',
          tabindex: 4
        },
      }
    });
    setFields(fields);
    setEventsToFields(fields, props, t);
  }, []);
  return {fieldsRef};
};
