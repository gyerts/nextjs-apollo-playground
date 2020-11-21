import React, {useEffect, useState} from "react";

import {Text, FlexLayout} from "@deity/falcon-ui";
import {Tick as SuccessCircleIcon} from "src/styling";
import {WarningIcon as WarningCircleIcon} from "src/styling";
import './MiniCartMessage.scss';
import classNames from "classnames";


interface IProps {
  msg: string|JSX.Element
  gridArea?: string
  opened: boolean
  success: boolean
}
export const MiniCartMessage = ({msg, gridArea, opened, success}: IProps) => {
  const [show, setShow] = useState(false);

  useEffect(function () {
    setTimeout(() => setShow(opened), 0);
  }, [opened]);

  return (
    <FlexLayout
      justifyContent='space-between'
      alignItems='center'
      bg={success ? 'successBg' as any : 'primaryDark'}
      p='xs'
      css={{width: '100%'}}
      className={classNames('message', show ? 'message-opened' : 'message-closed')}
    >
      <Text gridArea={gridArea} flex={1} mx='xs' css={{
        fontSize: 12,
        lineHeight: 1.42,
        letterSpacing: 0.36,
        color: success ? '#21ba45' : '#fd471d',
      }}>
        {msg}
      </Text>
      {success ? <SuccessCircleIcon /> : <WarningCircleIcon />}
    </FlexLayout>
  );
};
