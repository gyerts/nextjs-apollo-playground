import React from 'react';
import { Box, Button } from '@market-ui/falcon-ui';

interface IProps {
  submitting: boolean
  value: string
  children?: React.ReactElement
}
export const FormSubmit = ({ submitting, value, children, ...rest }: IProps) => (
  <Box justifySelf="end" mt="md" {...rest}>
    {children || (
      <Button type="submit" variant={submitting ? 'loader' : undefined}>
        {value}
      </Button>
    )}
  </Box>
);
