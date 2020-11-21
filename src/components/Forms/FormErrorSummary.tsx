import React from 'react';
import { List, ListItem } from '@deity/falcon-ui';

interface IProps {
  errors: string[]
}
export const FormErrorSummary = ({ errors }: IProps) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <List>
      {errors.map(error => (
        <ListItem my="md" color="error" key={error}>
          {error}
        </ListItem>
      ))}
    </List>
  )
};
