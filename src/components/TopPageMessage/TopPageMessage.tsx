import {Box, Button, extractThemableProps, FlexLayout, Text, ThemedComponentProps} from "@deity/falcon-ui";
import React, {useCallback, useDebugValue, useEffect, useRef, useState} from "react";
import {useLayoutListenerContext, useTopPageMessageContext} from "src/components";
import {T} from "@market-ui/falcon-i18n";
import {CloseIcon, CloseIconRed} from "../../styling";
import {IInitialContextProps} from "./context";


const css = (height: number, show: boolean): any => ({
  position: 'relative',
  height,
  transition: '.5s',

  ...(!show ? {
    paddingTop: 0,
    paddingBottom: 0,
    p: {
      display: 'none',
    }
  } : {})
});


interface IProps extends ThemedComponentProps {
  options?: IInitialContextProps['options']
  onClose?: () => void
}
export const TopPageMessage = ({onClose, ...props}: IProps) => {
  const timeoutHandler = useRef<any>(0);
  const [show, setShow] = useState();
  const { layout, isMobile } = useLayoutListenerContext();
  const { themableProps, /* rest */ } = extractThemableProps(props);
  const {
    title,
    opened,
    message,
    options = {},
    closeMessage,
  } = useTopPageMessageContext();

  const beforeClose = useCallback(() => {
    clearTimeout(timeoutHandler.current);
    onClose && onClose();
    closeMessage();
  }, [onClose]);

  useEffect(function () {
    clearTimeout(timeoutHandler.current);
    setTimeout(() => setShow(opened), 0);
    if (opened && options.autoClose) {
      timeoutHandler.current = setTimeout(function () {
        beforeClose();
      }, 4000);
    }
  }, [opened]);

  const color = {
    bg: options.isError ? 'errorBg' : 'successBg',
    text: options.isError ? 'errorText' : 'successText',
  };

  // @ts-ignore
  const height = show ? ( isMobile(layout) ? 75 : 100 ) : (0);

  return (
    <Box
      py='xs'
      css={css(height, show)}
      bgFullWidth={color.bg as any}
      {...themableProps}
    >
      <FlexLayout justifyContent='space-between'>
        <Text fontSize='md' color={color.text as any} css={{textAlign: 'start'}} fontWeight='bold'>
          <T id={title} />
        </Text>
        {(opened && options.closable) && (
          options.isError ? (
            <Button variant='icon' onClick={beforeClose}>
              <CloseIconRed size="xs" />
            </Button>
          ) : (
            <Button variant='icon' onClick={beforeClose}>
              <CloseIcon size="xs" />
            </Button>
          )
        )}
      </FlexLayout>
      <Text fontSize='xs' color={color.text as any} css={{textAlign: 'start'}}>
        <T id={message} />
      </Text>
    </Box>
  );
};
