import React from 'react';
import { Details, Summary, DetailsContent } from '@market-ui/falcon-ui';
import {DangerousText} from "src/components";

export const ProductMeta = ({ meta, onChange, activeItem }) => (
  <React.Fragment>
    {meta.map(item => (
      <Details key={item.name} open={activeItem && activeItem === item}>
        <Summary variant="secondary" onClick={() => onChange && onChange(item)}>
          <DangerousText>{item.name}</DangerousText>
        </Summary>
        <DetailsContent>{item.content}</DetailsContent>
      </Details>
    ))}
  </React.Fragment>
);
