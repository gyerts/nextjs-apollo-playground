import React from "react";
import {useScript} from "../useScript";
import {useClientConfigs} from "src/components";

interface IProps {
  children?: React.ReactElement
  language: string
}
export const GoogleApiScript = ({children, language}: IProps) => {
  const { googleApiKey } = useClientConfigs();
  language = language.split('-')[0]; // remove from en-US (-US) part
  const src = `//maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&language=${language}`;
  const ready = useScript(src);
  return ready ? (children || null) : null;
};
