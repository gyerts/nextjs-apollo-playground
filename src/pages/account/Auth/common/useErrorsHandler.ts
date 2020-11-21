import {useCallback, useContext} from 'react';
import {useTopPageMessageContext} from "src/components";
import {ApolloError} from "apollo-client";
import {I18nContext} from "@market-ui/falcon-i18n";

const errorsMappings: {[backendCode: string]: string /* i18nId */} = {
  "DuplicateUidError": 'auth.errors.duplicate',
  "invalid_grant": 'auth.errors.invalid_grant',
};
const errorCodesGuaratiesStringJson = [
  'BAD_USER_INPUT',
];

export const useErrorsHandler = () => {
  const { openMessage } = useTopPageMessageContext();
  const {t} = useContext(I18nContext);

  const handleError = useCallback(function (e: ApolloError) {
    if (e.graphQLErrors && e.graphQLErrors.length) {
      let toMessageError = t('auth.errors.unexpected');
      const firstApolloError = e.graphQLErrors[0];

      if ( errorCodesGuaratiesStringJson.includes(firstApolloError.extensions.code) ) {
        const firstHybrisError: IParsedHybrisError|null = JSON.parse(firstApolloError.message)[0];

        if (firstHybrisError) {
          toMessageError = errorsMappings[firstHybrisError.code] || firstHybrisError.message;
        }
      }

      openMessage('Error', toMessageError, { isError: true, closable: true, autoClose: false });
    }
  }, []);

  return { handleError };
};

type IParsedHybrisError = {
  message: string
  code: string
}
