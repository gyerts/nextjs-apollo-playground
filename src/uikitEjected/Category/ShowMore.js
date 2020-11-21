import React from 'react';
import { Button } from '@market-ui/falcon-ui';
import { T } from '@market-ui/falcon-i18n';

export const ShowMore = ({ onClick, loading }) => (
  <Button onClick={onClick}
          css={{
              background: '#ffffff',
              color: '#000000',
              border: '1px solid black',
              fontWeight: 600,
              borderRadius: 0,
              ':hover': {
                  background: '#ffffff !important',
              }
          }}
          pr={'xxxl'}
          pl={'xxxl'}
          variant={loading ? 'loader' : 'secondary'}
          height="xl"
          my="sm">
    <T id="pagination.showMore" />
  </Button>
);
