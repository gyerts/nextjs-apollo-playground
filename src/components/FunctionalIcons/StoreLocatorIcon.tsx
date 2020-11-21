import React from 'react';
import {N55} from "src/styling";
import {Link as RouterLink} from "react-router-dom";
import {extractThemableProps, Link, ThemedComponentProps} from "@deity/falcon-ui";


interface IProps extends ThemedComponentProps {
}
export function StoreLocatorIcon (props: IProps) {
  const { themableProps } = extractThemableProps(props);
  return (
    <Link as={RouterLink} to="/store-locator" {...themableProps}>
      <N55 width='md' />
    </Link>
  );
}
