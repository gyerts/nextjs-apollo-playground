import React from 'react';
import {useEffect} from "react";

interface IProps {
  id: string
}
export const TT = ({ id }: IProps): React.ReactElement => {
  useEffect(function () {
    console.warn(`================= translate "${id}" =================`);
  }, []);

  return <span>id</span>;
};

export const tt = (id: IProps['id']) => {
  console.warn(`================= translate "${id}" =================`);
  return id;
};
