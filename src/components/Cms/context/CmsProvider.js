import React from 'react';
import { CmsContext } from './CmsContext';
import * as cmsComponents from '../components';
import { PageConfig } from '../common/PageConfig';
import {useQuery} from "@apollo/client";
import {CMS_PAGE_CMS_QUERY} from "src/components/Cms";

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
    map.bySlotId[slot.slotId] = theSlot;
    map.byPosition[slot.position] = theSlot;
    return map;
  },{bySlotId:{}, byPosition:{}});
};

const CmsPage = ({ children }) => {
  return (
    <PageConfig>
      {({pageConfig})=> <CmsPageImpl pageConfig={pageConfig} children={children} />}
    </PageConfig>
  )
};

const CmsPageImpl = ({pageConfig, children}) => {
  const {data, errorCode, loading, error} = useQuery(CMS_PAGE_CMS_QUERY, {variables: {
      id : pageConfig.CMSPageId,
      CMSPageType: pageConfig.CMSPageType,
      CMSCode: pageConfig.CMSCode
    }});

  console.log('CmsPage', data, errorCode, loading, error);

  if (loading || error) {
    return null;
  }

  let slotMap = data.page && data.page.contentSlots ? getSlotMap(data.page) : {};
  if (!pageConfig.layout && data.page && data.page.template) {
    pageConfig.layout = data.page.template;
  }

  return (
    <CmsContext.Provider value={{slotMap, pageConfig}}>
      {children}
    </CmsContext.Provider>
  );
};

export const CmsProvider = CmsPage;
