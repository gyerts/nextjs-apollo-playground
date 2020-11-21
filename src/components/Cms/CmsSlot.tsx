import React, { useContext } from 'react';
import { CmsContext } from './context/CmsContext';

export const CmsSlot = ({ id, position }) => {
  const {slotMap} = useContext(CmsContext);
  
  const slot = id ? slotMap.bySlotId[id] : slotMap.byPosition[position];
  if (!slot) {
    return null;
  }

  const comps = slot.comps;
  return (
    <>
      {comps
        .filter(comp => comp.comp)
        .map(Comp => (
           <Comp.comp key={`${id}-${Comp.uid}`} {...Comp} />
        ))}
    </>
  );
};
