import React from "react";
import {Switch} from "react-router-dom";
import {useTabsContext} from "../context";
import {FlexLayout} from "@deity/falcon-ui";

interface IProps {
  gridArea?: string
}
export const TabsRoutes = ({gridArea}: IProps) => {
  const { routes } = useTabsContext();
  return routes ? <FlexLayout gridArea={gridArea} flexDirection='column'><Switch>{routes}</Switch></FlexLayout> : null;
};
