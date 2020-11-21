import React from 'react';
import {Box, extractThemableProps, Text, ThemedComponentProps} from "@deity/falcon-ui";


interface IProps extends ThemedComponentProps {
  error?: string
}
export const ErrorView = ({error, ...props}: IProps) => {
  const { themableProps } = extractThemableProps(props);

  if (!error) {
    return null;
  }

  return (
    <Box {...themableProps}>
      <Text color='errorText'>{error}</Text>
    </Box>
  );
};
