import React, {useCallback, useContext} from 'react';
import {themed, Box, H3, Text, Input, Button, Checkbox, Label, Link} from '@deity/falcon-ui';
import {T, I18nContext} from '@market-ui/falcon-i18n';
import {FormikErrors, FormikTouched, FormikValues} from 'formik';
import styled from "styled-components";
import {Link as RouterLink} from "react-router-dom";
import * as Yup from 'yup';
import {ObjectSchema} from "yup";
import {themedColors} from "src/theme/colors";
import {themedBreakpoints} from "src/theme/breakpoints";
import {UIForm} from "../../Forms";
import {useMode} from "../../useMode";
import {SubscribeNewsletterMutation} from "src/api";
import {cssMobileOnly} from "src/styling/cssHelper";

export const NewsletterLayout = themed({
  tag: 'div',
  defaultProps: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'xxs',
    css: {
      maxWidth: 340,
    }
  }
});

interface INewsletterInnerProps {
  className: string;
}

interface INewsletterFormValues {
  email: string;
  consentMailigs: boolean;
  newsletterSubscriber: boolean;
}

const showEmailError = (
  errors: FormikErrors<INewsletterFormValues>,
  touched: FormikTouched<INewsletterFormValues>,
  values: FormikValues): boolean => {
  return errors.email && values.email || errors.email && touched.email;
};

const getNewsletterSchema = (t: (val: string) => string): ObjectSchema => (
  Yup.object().shape({
    email: Yup.string()
      .email(t('footer.newsletter.emailError'))
      .required(t('footer.newsletter.emailError')),
    consentMailings: Yup.bool()
      .oneOf([true], t('footer.newsletter.consentMailingsError')),
  })
);

export const NewsletterInner = (props: INewsletterInnerProps) => {
  const [showSubscribeSuccessMessage, enableSubscribeSuccessMessage] = useMode();

  const subscribed = useCallback(() => enableSubscribeSuccessMessage(5000), []);

  return (
    <div className={props.className}>
      <NewsletterLayout className={'newsletter-block'}>
        {showSubscribeSuccessMessage ? (
          <NewsletterSubscribedBlock />
        ) : (
          <NewsletterInputBlock onSuccess={subscribed} />
        )}
      </NewsletterLayout>
    </div>
  );
};

interface INewsletterInputBlockProps {
  onSuccess: () => void
}
const NewsletterInputBlock = ({onSuccess}: INewsletterInputBlockProps) => {
  const {t} = useContext(I18nContext);

  return (
    <React.Fragment>
      <H3
        fontSize='xs'
        fontWeight='bold'
        className={'newsletter-title'}
        mb='xs'>
        <T id="footer.newsletter.title"/>
      </H3>
      <Text lineHeight={'default'} mb='xs'>
        <T id="footer.newsletter.messageLine1"/>
        <br/>
        <T id="footer.newsletter.messageLine2"/> <Link
        as={RouterLink}
        target={'_blank'}
        to='/privacy-cookies'
        variant={'underlined'}> <T id="footer.newsletter.privacyCookiePolicyLink"/></Link>
      </Text>
      <Box>
        <SubscribeNewsletterMutation>{(editCustomer, { loading }) => (
          <UIForm
            initialValues={{ email: '', consentMailings: true, newsletterSubscriber: true }}
            validationSchema={getNewsletterSchema(t)}
            onSubmit={values => editCustomer({
              variables: { input: { email: values.email, newsletterSubscriber: values.newsletterSubscriber } },
              update: onSuccess,
            })}
            name='news-letter-form'
            id='news-letter-form'
          >{({ values, errors, touched, handleChange, handleBlur }) => (
            <React.Fragment>
              <Box
                display='flex'
                justifyContent={'space-between'}
                className={'subscribe-block'}
              >
                <Box
                  position={'relative'}
                  display={'flex'}
                  flexDirection={'column'}
                >
                  <Input
                    type="email"
                    name={'email'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    border='none'
                    borderRadius='none'
                    mb={'md'}
                    css={{
                      width: 225,
                    }}
                    aria-label={t('footer.newsletter.emailPlaceholder')}
                    placeholder={t('footer.newsletter.emailPlaceholder')}
                  />
                  {
                    showEmailError(errors, touched, values)
                      ? <Text as={'span'} className="error">{errors.email}</Text>
                      : null
                  }
                </Box>
                <Button
                  as="input"
                  type="submit"
                  id={'subscr'}
                  disabled={!values.email || !!Object.keys(errors).length || loading}
                  value={t('footer.newsletter.subscribe')}
                  borderRadius='none'
                  fontWeight='bold'
                  pt='xs'
                  pb='xs'
                  pr='md'
                  pl='md'
                  mb={'sm'}
                  css={{
                    width: 105,
                  }}
                  flex="none"/>
              </Box>
              <Box
                position={'relative'}
                display={'flex'}
                flexDirection={'column'}
              >
                <Label
                  htmlFor="subscribe"
                  mb="md"
                  display="flex"
                  css={{
                    fontSize: 12,
                    fontWeight: 400
                  }}>
                  <Checkbox
                    id="subscribe"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultChecked
                    value={values.consentMailings.toString()}
                    name={'consentMailings'}
                    css={{
                      minWidth: 20,
                    }}/> <Text as={'span'} className={'consent-mailings'}>{t('footer.newsletter.consentMailings')}</Text>
                </Label>
                {errors.consentMailings
                  ? <Text as={'span'} className="error">{errors.consentMailings}</Text>
                  : null}
              </Box>
            </React.Fragment>
          )}</UIForm>
        )}</SubscribeNewsletterMutation>
      </Box>
    </React.Fragment>
  )
};

const NewsletterSubscribedBlock = () => (
  <Box css={cssMobileOnly({height: 145, display: 'flex', alignItems: 'center', justifyContent: 'center'})}>
    <Text><b><T id='footer.newsletter.subscribedSuccess.title' /></b></Text>
    <Text><T id='footer.newsletter.subscribedSuccess.tip' /></Text>
  </Box>
);

export const Newsletter = styled(NewsletterInner)`

.consent-mailings {
  padding: 0 10px;
}

.error {
  color: ${themedColors.errorText};
  display: inline-block;
  position: absolute;
  bottom: 1px;
  width: 100%;
}

@media (max-width: ${themedBreakpoints.md}px) {

  .newsletter-title {
    padding: 10px 0;
  }

  .subscribe-block {
    flex-direction: column;
    input {
      width: 100%;
    }
  }

  .newsletter-block {
    width: 100%;
    max-width: none;
  }

}
`;
