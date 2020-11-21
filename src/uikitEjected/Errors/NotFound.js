import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T } from '@market-ui/falcon-i18n';
import { H1, Text, Button, FlexLayout, GridLayout } from '@market-ui/falcon-ui';

export const NotFound = ({ location }) => {
  const { pathname } = location;
  const path = pathname.startsWith('/') ? pathname.substring(1) : pathname;

  return (
    <GridLayout mb="md" gridGap="md">
      <H1>
        <T id="notFound.title" />
      </H1>
      <FlexLayout flexDirection="column" alignItems="center" p="sm">
        <Text fontSize="md" mb="xs">
          <T id="notFound.text" path={path} />
        </Text>
        <Button as={RouterLink} to="/" p="xs">
          <T id="notFound.goHomeButton" />
        </Button>
      </FlexLayout>
    </GridLayout>
  );
};
