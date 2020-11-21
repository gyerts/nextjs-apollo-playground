import {getDefaultInputTypeValidator, IDefaultTypeInputValidator, requiredValidator} from "../validators";
import {IValidator} from "./validateSequentially";
import {useContext} from "react";
import {I18nContext} from "@market-ui/falcon-i18n";

interface IProps {
  validate: IValidator[],
  required: boolean
  type?: IDefaultTypeInputValidator
}
export const useFormValidator = ({validate, required, type}: IProps) => {
  const {t} = useContext(I18nContext);
  const validators = validate || [];

  if (required) {
    validators.unshift(requiredValidator);
  }

  const defaultInputTypeValidator = !validate && getDefaultInputTypeValidator(type, t);
  if (defaultInputTypeValidator) {
    validators.push(defaultInputTypeValidator);
  }

  return { validators };
};
