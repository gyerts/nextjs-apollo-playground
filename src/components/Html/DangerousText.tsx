import React from 'react';
import {extractThemableProps, Text, ThemedComponentProps} from "@market-ui/falcon-ui";


interface IProps extends ThemedComponentProps {
  children: string
}
export function DangerousText({children, ...props}: IProps) {
  const { themableProps } = extractThemableProps(props);
  return <Text as='span' {...themableProps} dangerouslySetInnerHTML={{__html: children}} />
}
