import React, {useEffect, useRef, useState} from "react";
import {adopt} from "react-adopt";
import {FlexLayout, Icon, Input, Text, Button} from "@market-ui/falcon-ui";
import {I18n, T} from "@market-ui/falcon-i18n";
import {toGridTemplate} from "../../../../../uikitEjected";
import {ApplyCouponMutation, CancelCouponMutation} from "src/api";
import {UIForm} from "src/components/Forms";


const ApplyCouponForm = adopt({
  applyCouponMutation: ({ render }) => (
    <ApplyCouponMutation>{(applyCoupon, result) => render({ applyCoupon, result })}</ApplyCouponMutation>
  ),

  cancelCouponMutation: ({ render }) => (
    <CancelCouponMutation>{(cancelCoupon, result) => render({ cancelCoupon, result })}</CancelCouponMutation>
  ),

  formik: ({ couponCode, applyCouponMutation, cancelCouponMutation, validate, render }) => (
    <UIForm
      id='apply-coupon-form'
      name='apply-coupon-form'
      initialValues={{ couponCode }}
      validate={validate}
      onSubmit={values => {
        if (!couponCode) {
          applyCouponMutation.applyCoupon({ variables: { input: { ...values } }});
        } else {
          cancelCouponMutation.cancelCoupon();
        }
      }}
    >
      {(...props) => render(...props)}
    </UIForm>
  )
});


const area = {
  title: 'title',
  notification: 'notification',
  submit: 'submit',
  message: 'submit',
  input: 'input',
  empty: '.',
};

const layout = {
  cartSummaryLayout: {
    display: 'grid',
    gridGap: 'xs',
    gridTemplate: {
      xl: toGridTemplate([
        ['260px',            '150px'      ],
        [area.input,         area.submit  ],
      ]),
      lg: toGridTemplate([
        ['260px',            '150px'      ],
        [area.input,         area.submit  ],
      ]),
      md: toGridTemplate([
        ['260px',            '150px'      ],
        [area.input,         area.submit  ],
      ]),
      sm: toGridTemplate([
        ['3fr',              '2fr'        ],
        [area.input,         area.submit  ],
      ]),
      xs: toGridTemplate([
        ['3fr',              '2fr'        ],
        [area.input,         area.submit  ],
      ]),
    }
  }
};

export const CouponForm = ({couponCode}) => {
  return (
    <I18n>{t => (
      <ApplyCouponForm
        couponCode={couponCode}
        validate={values => {
          if (!values.couponCode) {
            return { couponCode: t('cart.invalidCouponCode') };
          }
        }}
      >
        {({
            applyCouponMutation: { result: applyCouponResult },
            cancelCouponMutation: { result: cancelCouponResult },
            formik: { errors, handleChange, handleBlur, values }
          }) => {
          const errorMessage = !errors.couponCode && !!applyCouponResult.error && applyCouponResult.error.message.replace('GraphQL error: ', '');

          return (
            <CouponFormImpl
              couponCode={couponCode}
              applyCouponResult={applyCouponResult}
              cancelCouponResult={cancelCouponResult}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errors={errors}
              errorMessage={errorMessage}
              values={values}
            />
          );
        }}
      </ApplyCouponForm>
    )}</I18n>
  );
};

const useMessage = (loading, error) => {
  const [message, setMessage] = useState({ message: '', isError: false });
  const timeoutHandler = useRef(0);
  const lastLoading = useRef(false);

  useEffect(function () {
    clearTimeout(timeoutHandler.current);
    timeoutHandler.current = setTimeout(function () {
      setMessage({message: '', isError: false});
    }, 5000);
  }, [message])

  useEffect(function () {
    if (!loading && lastLoading.current) {
      if (error) {
        setMessage({message: error, isError: true});
        lastLoading.current = false;
      } else {
        setMessage({message: 'cart.couponAdded', isError: false});
        lastLoading.current = false;
      }
    } else {
      lastLoading.current = true;
    }
  }, [loading]);

  return message;
};

export const CouponFormImpl = ({couponCode, handleBlur, handleChange, values, errorMessage,
                                 applyCouponResult, cancelCouponResult, errors}) => {
  const {message, isError} = useMessage(applyCouponResult.loading, errorMessage);

  return (
    <I18n>{t => (
      <FlexLayout defaultTheme={layout}>
        <Input
          gridArea={area.input}
          type="text"
          disabled={!!couponCode}
          name="couponCode"
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={couponCode}
          mr='xs'
          fontSize='xxs'
          placeholder={t('cart.promoPlaceholder')}
          borderRadius='none'
        />
        <Button
          gridArea={area.submit}
          type="submit"
          disabled={
            applyCouponResult.loading || cancelCouponResult.loading || !values.couponCode || errors.couponCode
          }
          fontWeight='bold'
        >
          {(applyCouponResult.loading || cancelCouponResult.loading) && (
            <Icon src="loader" size="md" mr="sm" fill="secondaryLight" />
          )}
          {couponCode ? t(`cart.cancelCouponCode`) : t(`cart.apply`)}
        </Button>
        {message && isError && <Text fontSize='xxs' css={{textAlign: 'start'}} color='errorText'>{message}</Text>}
        {message && !isError && <Text fontSize='xxs' css={{textAlign: 'start'}} color='successText'><T id={message} /></Text>}
      </FlexLayout>
    )}</I18n>
  );
};
