const LABEL_SUFFIX = 'FieldLabel';

export const getLabelI18nId: ISignature =
  (formI18nId, fieldName) => `${formI18nId}.${fieldName}${LABEL_SUFFIX}`;

type ISignature = (formI18nId: string, fieldName: string) => string;
