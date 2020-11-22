import React from 'react';
import { CmsContext } from './CmsContext';
import * as cmsComponents from '../components';

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

const CmsPage = ({children, pageConfig, page}) => {
  let slotMap = page && page.contentSlots ? getSlotMap(page) : {};
  if (!pageConfig.layout && page && page.template) {
    pageConfig.layout = page.template;
  }

  return (
    <CmsContext.Provider value={{slotMap, pageConfig}}>
      {children}
    </CmsContext.Provider>
  );
};

export const CmsProvider = CmsPage;
