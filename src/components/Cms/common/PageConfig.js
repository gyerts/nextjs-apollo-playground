import React from 'react';
import {RoutingConfigQuery} from '../graphql/server/RoutingConfigQuery';

const getPageConfig = (location,routingConfig) => {
    for (let config of routingConfig) {
      const pathRegex = RegExp(config.pathRegex);
      const fullPath = location.pathname + location.search;

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
  }

  export const PageConfig = (props) => {
      const {children,location}  = props;

      return (
        <RoutingConfigQuery>
        {({routingConfig})=> {
          const pageConfig = getPageConfig(location,routingConfig);
          return children({
              pageConfig
          });
        }}
        </RoutingConfigQuery>
      )
  }