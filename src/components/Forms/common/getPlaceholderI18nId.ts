const PLACEHOLDER_SUFFIX = 'FieldPlaceholder';

export const getPlaceholderI18nId: ISignature =
  (formI18nId, fieldName) => `${formI18nId}.${fieldName}${PLACEHOLDER_SUFFIX}`;

type ISignature = (formI18nId: string, fieldName: string) => string;
