import {useCallback, useContext} from "react";
import {useTopPageMessageContext} from "src/components";
import {I18nContext} from "@market-ui/falcon-i18n";


export const useTopPageMessage = () => {
  const { openMessage } = useTopPageMessageContext();
  const {t} = useContext(I18nContext);

  const openSuccessMessage = useCallback(function (i18nTitle: string, i18nMessage: string) {
    openMessage(
      /* title */   t(i18nTitle),
      /* message */ t(i18nMessage),
      /* options */  {
        isError: false,
        closable: false,
        autoClose: true,
      },
    );
  }, []);

  const openErrorMessage = useCallback(function (i18nTitle: string, i18nMessage: string) {
    openMessage(
      /* title */   t(i18nTitle),
      /* message */ t(i18nMessage),
      /* options */  {
        isError: true,
        closable: false,
        autoClose: true,
      }
    );
  }, []);

  return {
    openSuccessMessage,
    openErrorMessage,
  };
};
