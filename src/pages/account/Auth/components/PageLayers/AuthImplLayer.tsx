import {ITabType} from "../../types";
import {Route, useHistory} from "react-router";
import React, {useCallback} from "react";
import {FlexLayout} from "@market-ui/falcon-ui";
import {CombineAuthTabs} from "../Tabs";
import {SignInGuestForm} from "../SignInGuestForm";
import {SignUpForm} from "../SignUpForm";
import {SignInForm} from "../SignInForm";
import {SignInMutation, SignUpMutation} from "src/components/Auth";
import {AuthLayoutLayer} from './AuthLayoutLayer'
import {useErrorsHandler} from "../../common/useErrorsHandler";
import {ISetGuestCheckoutEmailFn, SetGuestCheckoutEmailMutation} from "../../../../../api/Auth/SetGuestCheckoutEmail";


interface IProps {
  isCheckout: boolean
  next: string
  tab: ITabType
}
export const AuthImplLayer = ({isCheckout, next, tab}: IProps) => {
  const history = useHistory();
  const { handleError } = useErrorsHandler();

  const onComplete = useCallback(function () {
    history.replace(next);
  }, [next]);

  return (
    <FlexLayout flexDirection='column' alignItems='center'>
      <AuthLayoutLayer>
        <FlexLayout flexDirection='column' alignItems='center'>
          {/* [guest-checkout] */}
          {/*{isCheckout ? (*/}
          {/*  <CombineAuthTabs key='checkout' tabs={["signin", "guest"]} activeTab={tab} next={next} isCheckout={isCheckout} />*/}
          {/*) : (*/}
            <CombineAuthTabs key='signup' tabs={["signin", "signup"]} activeTab={tab} next={next} isCheckout={isCheckout} />
          {/*)}*/}

          {/* [guest-checkout] */}
          {/*<Route exact path="/authorization/guest">*/}
          {/*  <SetGuestCheckoutEmailMutation>{(setGuestCheckoutEmail: ISetGuestCheckoutEmailFn) => (*/}
          {/*    <SignInGuestForm*/}
          {/*      id='signin-as-guest-form'*/}
          {/*      submitLabel='auth.form.btnGuest'*/}
          {/*      onSubmit={async (values) => {*/}
          {/*        try {*/}
          {/*          const input = {email: values.email, isNewsletter: values.isNewsletter};*/}
          {/*          await setGuestCheckoutEmail({variables: {input}});*/}
          {/*          history.replace('/checkout');*/}
          {/*        } catch (e) {*/}
          {/*          handleError(e);*/}
          {/*        }*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  )}</SetGuestCheckoutEmailMutation>*/}
          {/*</Route>*/}

          <Route exact path="/authorization/signup">
            <SignUpMutation onCompleted={onComplete}>
              {(signUp, props) => (
                <React.Fragment>
                  <SignUpForm
                    id='signup-form'
                    submitLabel='auth.form.btnSignup'
                    loading={props.loading}
                    onSubmit={async (values) => {
                      try {
                        await signUp({variables: {input: {
                              ...values,
                              autoSignIn: true,
                              titleCode: 'mr',
                            }}});
                      } catch (e) {
                        handleError(e);
                      }
                    }}
                  />
                </React.Fragment>
              )}
            </SignUpMutation>
          </Route>

          <Route exact path="/authorization/signin">
            <SignInMutation onCompleted={onComplete}>
              {(signIn, props) => (
                <SignInForm
                  id='signin-form'
                  submitLabel='auth.form.btnSignin'
                  nextUrl={next}
                  loading={props.loading}
                  onSubmit={async (values) => {
                    try {
                      await signIn({variables: {input: values}});
                    } catch (e) {
                      handleError(e);
                    }
                  }}
                />
              )}
            </SignInMutation>
          </Route>

        </FlexLayout>
      </AuthLayoutLayer>
    </FlexLayout>
  );
};
