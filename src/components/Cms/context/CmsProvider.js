import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { CmsContext } from './CmsContext';
import * as cmsComponents from '../components';
import { CmsPageQuery } from '../graphql/server/CmsPageQuery';
import { PageConfig } from '../common/PageConfig';

const buildSlotComponent = slot => {
  if (slot.components) {
    const components = slot.components;
    return components.map(comp => {
      const Comp = cmsComponents[comp.typeCode];
      return {
        comp: Comp,
        ...comp
      };
    });
  }
  return null;
};

const getSlotMap = (page) => {
  return page.contentSlots.reduce((map, slot) => {
    const theSlot = {
      comps: buildSlotComponent(slot),
      ...slot
    };
    map.bySlotId[slot.slotId] = theSlot
    map.byPosition[slot.position] = theSlot;
    return map;
  },{bySlotId:{}, byPosition:{}});
};

const CmsPage = ({  children, location }) => {
  return (
    <PageConfig location={location}>
      {({pageConfig})=> (
        <CmsPageQuery
          variables={{
            id : pageConfig.CMSPageId,
            CMSPageType: pageConfig.CMSPageType,
            CMSCode: pageConfig.CMSCode
          }}
        >
          {({ page, errorCode, error }) => {
            let slotMap = page && page.contentSlots ? getSlotMap(page) : {};
            if (!pageConfig.layout && page && page.template) {
              pageConfig.layout = page.template;
            }
            return <CmsContext.Provider value={{slotMap, pageConfig}}>
              {children}
            </CmsContext.Provider>
          }}
        </CmsPageQuery>
        )}
    </PageConfig>
  )
};

const CmsWrappedProvider = ({ location, children, ...rest }) => {
  return useMemo(() => CmsPage( {children, location} ),[location]);
}

export const CmsProvider = withRouter(CmsWrappedProvider);
