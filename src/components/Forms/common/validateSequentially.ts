export const validateSequentially: ISignature = (validators, label, t) => value => {
  const firstInvalid = validators.find(validator => validator(value, label, t) !== undefined);
  return firstInvalid ? firstInvalid(value, label, t) : undefined;
};

type ISignature = (validators: IValidator[], label: string, t: (i18n: string) => string) => (value: string) => string;
export type IValidator = (value: string, label: string, t: (i18n: string) => string) => string
