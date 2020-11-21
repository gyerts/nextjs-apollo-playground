import React from 'react';
import {SearchIcon as SearchIconSvg} from "src/styling";
import {Link as RouterLink} from "react-router-dom";
import {extractThemableProps, Link, ThemedComponentProps} from "@deity/falcon-ui";


interface IProps extends ThemedComponentProps {
}
export function SearchIcon (props: IProps) {
  const { themableProps } = extractThemableProps(props);
  return (
    <Link as={RouterLink} to="#" {...themableProps}>
      <SearchIconSvg width='md' fill='white' />
    </Link>
  );
}
