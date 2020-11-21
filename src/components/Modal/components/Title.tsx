import React from 'react';
import {Box, extractThemableProps, Text, themed, ThemedComponentProps} from "@deity/falcon-ui";
import {toGridTemplate} from "src/uikitEjected";
import {CloseIcon} from "../../../styling";
import {T} from "@market-ui/falcon-i18n";

const area = {
  close: 'close',
  title: 'title',
};
const ModalTitleLayout = themed({
  tag: Box,
  defaultTheme: {
    modalTitleLayout: {
      display: 'grid',
      fontSize: 'md',
      fontWeight: 'bold',
      alignItems: 'center',
      gridGap: 'sm',
      px: 'sm',
      // @ts-ignore
      bg: 'disabledBg',
      gridTemplate:  toGridTemplate([
        [ '1fr'      , 'auto'      ],
        [ area.title , area.close  ],
      ]),
      css: {
        height: 64,
      }
    },
  }
});

interface IProps extends ThemedComponentProps {
  titleI18n: string
  onClose?: () => void
}
export const ModalTitle = ({onClose, titleI18n, ...rest}: IProps) => {
  const themableProps = extractThemableProps(rest);

  return (
    <ModalTitleLayout {...themableProps}>
      <Text
        gridArea={area.title}
        css={{textAlign: 'start', fontStretch: 'condensed', fontSize: 24}}
        fontFamily='sans'
      >
        <T id={titleI18n} />
      </Text>
      {onClose && (
        <Text gridArea={area.close} css={{cursor: 'pointer'}}>
          <CloseIcon onClick={onClose} width='md' />
        </Text>
      )}
    </ModalTitleLayout>
  );
};
