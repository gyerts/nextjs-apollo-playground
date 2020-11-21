import React, {useEffect} from "react";
import {Route, RouteProps} from "react-router-dom";
import {useTabsContext} from "./context";


export const TabRoute = (props: RouteProps): null => {
  const { addRoute } = useTabsContext();

  useEffect(function () {
    addRoute(<Route key={props.path.toString()} {...props} />);
  }, []);

  return null;
};
