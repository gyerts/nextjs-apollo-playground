import {useCallback, useEffect, useRef, useState} from "react";
import {ITranzilaError} from "../types";

export const useError = () => {
  const [fieldsErrors, _setFieldErrors] = useState<IErrorsObject>({});
  const [globalErrors, _setGlobalErrors] = useState<ITranzilaError[]>([]);
  const [hasFieldsErrors, setHasFieldErrors] = useState<boolean>(false);
  const [hasGlobalErrors, setHasGlobalErrors] = useState<boolean>(false);
  const hasFieldsErrorsRef = useRef(hasFieldsErrors);
  const hasGlobalErrorsRef = useRef(hasGlobalErrors);

  useEffect(function () {
    hasFieldsErrorsRef.current = Boolean(Object.keys(fieldsErrors).length);
    setHasFieldErrors(hasFieldsErrorsRef.current);
  }, [fieldsErrors]);

  useEffect(function () {
    hasGlobalErrorsRef.current = Boolean(globalErrors.length);
    setHasGlobalErrors(hasGlobalErrorsRef.current);
  }, [globalErrors]);

  const setFieldsErrors = useCallback(function (errors: IErrorsObject) {
    _setFieldErrors(errors);
  }, []);

  const setGlobalErrors = useCallback(function (errors: ITranzilaError[]) {
    _setGlobalErrors(errors);
  }, []);

  return {
    fieldsErrors, setFieldsErrors, hasFieldsErrors, hasFieldsErrorsRef,
    globalErrors, setGlobalErrors, hasGlobalErrors, hasGlobalErrorsRef,
  };
};


export interface IErrorsObject {
  [param: string]: string,
}
