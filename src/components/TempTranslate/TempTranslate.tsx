import React from 'react';
import {useEffect} from "react";
import {T} from "@market-ui/falcon-i18n";

interface IProps {
  id: string
}
export const TT = ({ id }: IProps) => {
  useEffect(function () {
    console.warn(`================= translate "${id}" =================`);
  }, []);

  return <T id={id} />;
};

export const tt = (id: IProps['id']) => {
  console.warn(`================= translate "${id}" =================`);
  return id;
};
