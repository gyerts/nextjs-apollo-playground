import React from 'react';
import { T } from '@market-ui/falcon-i18n';
import { Box, Icon, Text } from '@market-ui/falcon-ui';

export const SignInIcon = ({ onClick, gridArea }) => (
  <Box
    gridArea={gridArea}
    onClick={() => onClick && onClick()}
    css={{ cursor: onClick ? 'pointer' : undefined, position: 'relative' }}
  >
    <Icon src="user" />
    <Text
      color="primary"
      fontSize="xs"
      fontWeight="bold"
      css={{
        whiteSpace: 'nowrap',
        position: 'absolute',
        bottom: '-10px',
        left: '50%',
        transform: 'translate(-50%, 0)'
      }}
    >
      <T id="signIn.link" />
    </Text>
  </Box>
);
