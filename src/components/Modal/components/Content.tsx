import React from 'react';
import {Box, extractThemableProps, themed, ThemedComponentProps} from "@deity/falcon-ui";
import {toGridTemplate} from "src/uikitEjected";

const area = {
  content: 'content',
};
const ModalContentLayout = themed({
  tag: Box,
  defaultTheme: {
    modalContentLayout: {
      display: 'grid',
      alignItems: 'center',
      p: 'md',
      gridTemplate:  toGridTemplate([
        [ '1fr'         ],
        [ area.content  ],
      ]),
    },
  }
});

interface IProps extends ThemedComponentProps {
  children: any
}
export const ModalContent = ({...rest}: IProps) => {
  const themableProps = extractThemableProps(rest);

  return (
    <ModalContentLayout {...themableProps}>
      {rest.children}
    </ModalContentLayout>
  );
};
