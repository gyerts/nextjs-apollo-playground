import React from 'react';
import {GET_CONFIG} from '../graphql/server/RoutingConfigQuery';
import {useQuery} from "@apollo/client";
import {useRouter} from "next/router";

const getPageConfig = (location, routingConfig) => {
  for (let config of routingConfig) {
    const pathRegex = RegExp(config.pathRegex);
    const fullPath = location.asPath;

    if (pathRegex.test(fullPath)){
      const result = pathRegex.exec(fullPath);
      let pageProperties = [];
      let { CMSPageId, CMSCode, ...rest } = config;
      if (result.length > 1){
        pageProperties = result.slice(1);
        CMSPageId = config.CMSPageId == '*' ? pageProperties[0] : config.CMSPageId;
        CMSCode = config.CMSCode == "*" ? pageProperties[0] : config.CMSCode;
      }

      return {
        properties : pageProperties,
        location,
        CMSPageId,
        CMSCode,
        ...rest
      }
    }
  }
  return null;
};

export const PageConfig = (props) => {
  const {children}  = props;
  const {data, error, loading} = useQuery(GET_CONFIG);
  const location = useRouter();

  if (error || loading) {
    return null;
  }

  const pageConfig = getPageConfig(location, data.routingConfig);

  return children({pageConfig});
};
