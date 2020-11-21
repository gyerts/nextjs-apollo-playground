import {Link as RouterLink} from "react-router-dom";
import React, {useCallback, useContext} from "react";
import {I18nContext, T} from "@market-ui/falcon-i18n";
import {Box, Button, FlexLayout, Icon, Link, Text} from "@deity/falcon-ui";

import {bothResolutions, desktopOnly, mobileOnly} from "src/styling/cssHelper";
import {ForgetForm, CheckboxFormField, FormField, useTopPageMessageContext, useModalContext} from "src/components";
import {UlStyled} from "./components/UlStyled";


export const Tip = ({gridArea, i18nId}: IProps & {i18nId: string}) => (
  <Text
    mb='xs'
    mt={mobileOnly('xs')}
    fontSize={bothResolutions('xxs', 'sm')}
    gridArea={gridArea}
  >
    <T id={i18nId} />
  </Text>
);

export const FirstNameField = ({gridArea, loading, getAutoComplete, grayed}: IProps & {
  loading: boolean,
  getAutoComplete: (inputType: string) => string
  grayed?: boolean
}) => (
  <FormField
    name="firstname"
    required
    disabled={loading}
    autoComplete={getAutoComplete('given-name')}
    gridArea={gridArea}
    grayed={grayed}
  />
);

export const LastNameField = ({gridArea, loading, getAutoComplete, grayed}: IProps & {
  loading: boolean,
  getAutoComplete: (inputType: string) => string
  grayed?: boolean
}) => (
  <FormField
    name="lastname"
    required
    disabled={loading}
    autoComplete={getAutoComplete('family-name')}
    gridArea={gridArea}
    grayed={grayed}
  />
);

export const EmailField = ({gridArea, loading}: IProps & {
  loading: boolean,
}) => (
  <FormField
    name="email"
    type="email"
    required
    disabled={loading}
    gridArea={gridArea}
  />
);

export const ConfirmEmailField = ({gridArea, loading}: IProps & {
  loading: boolean,
}) => (
  <FormField
    name="confirmEmail"
    type="email"
    required
    disabled={loading}
    gridArea={gridArea}
  />
);

export const CurrentPasswordField = ({gridArea, loading, getAutoComplete, grayed}: IProps & {
  loading: boolean,
  getAutoComplete: (inputType: string) => string
  grayed?: boolean
}) => (
  <FormField
    name="currentPassword"
    type="password"
    required
    disabled={loading}
    autoComplete={getAutoComplete('password')}
    gridArea={gridArea}
    grayed={grayed}
  />
);

export const PasswordField = ({gridArea, loading, getAutoComplete, grayed}: IProps & {
  loading: boolean,
  getAutoComplete: (inputType: string) => string
  grayed?: boolean
}) => (
  <FormField
    name="password"
    type="password"
    required
    disabled={loading}
    autoComplete={getAutoComplete('password')}
    gridArea={gridArea}
    grayed={grayed}
  />
);

export const ConfirmPasswordField = ({gridArea, loading, getAutoComplete, grayed}: IProps & {
  loading: boolean,
  getAutoComplete: (inputType: string) => string
  grayed?: boolean
}) => (
  <FormField
    name="confirmPassword"
    type="password"
    required
    disabled={loading}
    autoComplete={getAutoComplete('confirm-password')}
    gridArea={gridArea}
    grayed={grayed}
  />
);

export const AgreeNewsletterField = ({gridArea, loading}: IProps & {
  loading: boolean,
}) => (
  <CheckboxFormField
    name="isNewsletter"
    disabled={loading}
    gridArea={gridArea}
    fontSize={bothResolutions('xxs', 'sm')}
  />
);

export const AgreeTermsField = ({gridArea, loading}: IProps & {
  loading: boolean,
}) => (
  <CheckboxFormField
    name="agreeTerms"
    required
    disabled={loading}
    gridArea={gridArea}
    fontSize={bothResolutions('xxs', 'sm')}
    mb={mobileOnly('xs')}
  />
);

export const SubmitButton = ({gridArea, disabled, label, loading}: IProps & {
  disabled?: boolean
  loading?: boolean
  label: string
}) => (
  <Button
    gridArea={gridArea}
    type="submit"
    mt={desktopOnly('md')}
    height={bothResolutions('xl', 'xxl')}
    disabled={disabled}
  >
    <Text
      as='span'
      fontSize={bothResolutions('md', 'lg')}
      css={{letterSpacing: 1.35}}
    >
      {label}
    </Text>
    {loading && (
      <Icon
        src={'loader'}
        size="md"
        stroke="secondaryText"
        mx="xs"
        fill={'disabledText' as any}
      />
    )}
  </Button>
);

export const RequiredNote = ({gridArea}: IProps) => (
  <Text gridArea={gridArea} css={{textAlign: 'start'}} color='secondaryText' fontSize='xxs'><T id='auth.form.requiredNote' /></Text>
);

export const RememberMeForgotPassword = ({gridArea, loading}: IProps & {
  loading: boolean
}) => {
  return (
    <FlexLayout gridArea={gridArea} justifyContent='space-between' alignItems='end'>
      <CheckboxFormField
        name="autoSignIn"
        disabled={loading}
      />
      <ForgotPassword />
    </FlexLayout>
  );
};

export const ForgotPassword = ({gridArea, useQuestionSign}: IProps & {
  useQuestionSign?: boolean
}) => {
  const { openModal } = useModalContext();
  const { openMessage } = useTopPageMessageContext();

  const openForgetModal = useCallback(function () {
    openModal('auth.formForget.modalTitle', () => (
      <ForgetForm onFinish={() => {
        openMessage('auth.formForget.msg.title', 'auth.formForget.msg.descr', {
          isError: false,
          closable: true,
          autoClose: false,
        });
      }} />
    ));
  }, []);

  return (
    <Link
      gridArea={gridArea}
      fontSize='xs'
      fontWeight='bold'
      variant="underlined"
      onClick={openForgetModal}
    >
      <Text as='span'><T id='auth.form.forget' />{useQuestionSign && '?'}</Text>
    </Link>
  );
};

export const AskSignUp = ({gridArea, nextUrl}: IProps & { nextUrl: string }) => {
  const { dir } = useContext(I18nContext);

  return (
    <FlexLayout
      gridArea={gridArea}
      alignItems='center'
      mt='xs'
      flexDirection={dir === 'ltr' ? 'row' : 'row-reverse'}
      justifyContent={dir === 'ltr' ? 'start' : 'flex-end'}
    >
      <Link
        as={RouterLink}
        to={`/authorization/signup?next=${nextUrl}`}
        variant='underlined'
        fontSize={bothResolutions('xs', 'sm')}
      >
        <b><T id='auth.form.askSignUp.link' /></b>
      </Link>
      <Text as='span' mr='xs' />
      <Text as='span'><T id='auth.form.askSignUp.question' /></Text>
    </FlexLayout>

  );
};

export const Privacy = ({gridArea}: IProps) => (
  <Box
    gridArea={gridArea}
    aria-labelledby='privacy'
  >
    <Text
      mt='md'
      mb='xs'
      fontWeight='bold'
      fontSize={bothResolutions('md', 'lg')}
      as='span'
      css={{textAlign: 'start'}}
    >
      <T id='auth.form.privacy.title' />
    </Text>
    <UlStyled
      css={{maxWidth: 370}}
      fontSize='sm'
    >
      <li style={{fontSize: 'inherit'}}><Text mb='sm' as='span'><T id='auth.form.privacy._1' /></Text></li>
      <li style={{fontSize: 'inherit'}}><Text mb='sm' as='span'><T id='auth.form.privacy._2' /></Text></li>
      <li style={{fontSize: 'inherit'}}><Text mb='sm' as='span'><T id='auth.form.privacy._3' /></Text></li>
    </UlStyled>
  </Box>
);

type IProps = {
  gridArea?: string
};
