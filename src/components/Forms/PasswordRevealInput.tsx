import React, {useCallback, useContext, useState} from 'react';
import {I18nContext} from '@market-ui/falcon-i18n';
import { Input, Icon, Box } from '@market-ui/falcon-ui';

interface IProps {
}
export const PasswordRevealInput = (props: IProps) => {
  const { isRevealed, toggleInputType } = usePasswordRevial();
  const {t} = useContext(I18nContext);

  return (
    <Box position="relative">
      <Input {...props} type={isRevealed ? 'text' : 'password'} />
      <Box
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        title={t('form.passwordRevealTitle', { context: isRevealed ? 'hide' : 'show' })}
      >
        <Icon
          onClick={toggleInputType}
          stroke={isRevealed ? 'primary' : 'black'}
          cursor="pointer"
          size="md"
          src={isRevealed ? 'eye' : 'eyeOff'}
          bg="white"
          m="xs"
        />
      </Box>
    </Box>
  )
};

const usePasswordRevial = () => {
  const [ isRevealed, setRevealed ] = useState(false);

  const toggleInputType = useCallback(function () {
    setRevealed(isRevealed => !isRevealed);
  }, []);

  return { isRevealed, toggleInputType };
};
