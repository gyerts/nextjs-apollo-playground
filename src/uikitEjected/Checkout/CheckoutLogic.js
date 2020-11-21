import React from 'react';
import { withApollo } from 'react-apollo';
import isEqual from 'lodash.isequal';
import { ESTIMATE_SHIPPING_METHODS, SET_SHIPPING, PLACE_ORDER } from './CheckoutMutation';

class CheckoutLogicImpl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      values: props.initialValues || {
        billingSameAsShipping: false
      },
      errors: {},
      availablePaymentMethods: [],
      availableShippingMethods: []
    };
  }

  setPartialState(partial, callback) {
    this.setState(
      state =>
        // "deep replace" - replace old values with new, don't merge these
        ({
          ...state,
          ...partial,
          values: {
            ...state.values,
            ...(partial.values || {})
          }
        }),
      callback
    );
  }

  setLoading(loading, callback) {
    this.setPartialState({ loading }, callback);
  }

  getShippingMethodData(shippingMethod) {
    return {
      shippingCarrierCode: shippingMethod.carrierCode,
      shippingMethodCode: shippingMethod.methodCode
    };
  }

  setEmail = email => this.setLoading(true, () => this.setPartialState({ loading: false, values: { email } }));

  // the following setters first set loading to true, and then in the callback actual values is set
  // and loading flag gets reset to false, so the flow goes through whole proces (loading > set value > loaded)
  setBillingSameAsShipping = same =>
    this.setLoading(true, () =>
      this.setPartialState({
        loading: false,
        values: {
          billingSameAsShipping: same,
          billingAddress: same ? this.state.values.shippingAddress : null
        }
      })
    );

  setBillingAddress = billingAddress =>
    this.setLoading(true, () => this.setPartialState({ loading: false, values: { billingAddress } }));

  setPaymentMethod = (paymentMethod, additionalData) =>
    this.setLoading(true, () =>
      this.setPartialState({ loading: false, values: { paymentMethod, paymentAdditionalData: additionalData } })
    );

  setShippingAddress = shippingAddress => {
    this.setLoading(true, () => {
      // trigger mutation that will return available shipping options
      this.props.client
        .mutate({
          mutation: ESTIMATE_SHIPPING_METHODS,
          variables: { input: { address: shippingAddress } }
        })
        .then(resp => {
          if (resp.errors) {
            this.setPartialState({
              loading: false,
              errors: { shippingAddress: resp.errors },
              availableShippingMethods: null
            });
          } else {
            const values = {
              shippingAddress
            };

            // if billing is set to the same as shipping then set it also to received value
            if (this.state.values.billingSameAsShipping) {
              values.billingAddress = shippingAddress;
            }

            const { estimateShippingMethods } = resp.data;
            // if shipping methods has changed then remove already selected shipping method
            if (!isEqual(estimateShippingMethods, this.state.availableShippingMethods)) {
              values.shippingMethod = null;
            }

            this.setPartialState({
              loading: false,
              errors: {},
              values,
              availableShippingMethods: estimateShippingMethods
            });
          }
        })
        .catch(error => {
          this.setPartialState({
            loading: false,
            errors: { shippingAddress: [error] }
          });
        });
    });
  };

  setShippingMethod = shippingMethod => {
    this.setLoading(true, () => {
      // trigger mutation that will return available payment options
      this.props.client
        .mutate({
          mutation: SET_SHIPPING,
          // refetch cart because totals have changed once shipping has been selected
          refetchQueries: ['Cart'],
          awaitRefetchQueries: true,
          variables: {
            input: {
              billingAddress: this.state.values.billingAddress,
              shippingAddress: this.state.values.shippingAddress,
              ...this.getShippingMethodData(shippingMethod)
            }
          }
        })
        .then(resp => {
          if (resp.errors) {
            this.setPartialState({
              loading: false,
              errors: { shippingMethod: resp.errors },
              availablePaymentMethods: null
            });
          } else {
            const values = {
              shippingMethod
            };
            // if available payment methods has changed then remove selected payment method
            if (!isEqual(resp.data.setShipping.paymentMethods, this.state.availablePaymentMethods)) {
              values.paymentMethod = null;
            }

            this.setPartialState({
              loading: false,
              errors: {},
              values,
              availablePaymentMethods: resp.data.setShipping.paymentMethods
            });
          }
        })
        .catch(error => {
          this.setPartialState({
            loading: false,
            errors: { shippingMethod: [error] }
          });
        });
    });
  };

  placeOrder = () => {
    const handleResponse = resp => {
      if (resp.errors) {
        this.setPartialState({
          loading: false,
          errors: {
            order: resp.errors
          }
        });
      } else {
        this.setPartialState({
          loading: false,
          error: null,
          result: resp.data.placeOrder
        });
      }
    };

    this.setLoading(true, () => {
      this.props.client
        .mutate({
          mutation: PLACE_ORDER,
          // update cart once order is placed successfully
          refetchQueries: ['Cart', 'Orders'],
          awaitRefetchQueries: true,
          variables: {
            input: {
              email: this.state.values.email,
              billingAddress: this.state.values.billingAddress,
              paymentMethod: {
                method: this.state.values.paymentMethod.code,
                additionalData: this.state.values.paymentAdditionalData
              }
            }
          }
        })
        // promise catches the errors which are not passed to update callback
        .then(handleResponse)
        .catch(error => handleResponse({ errors: [error] }));
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children({
          loading: this.state.loading,
          values: this.state.values,
          errors: this.state.errors,
          result: this.state.result,
          availablePaymentMethods: this.state.availablePaymentMethods,
          availableShippingMethods: this.state.availableShippingMethods,
          setEmail: this.setEmail,
          setShippingAddress: this.setShippingAddress,
          setBillingAddress: this.setBillingAddress,
          setBillingSameAsShipping: this.setBillingSameAsShipping,
          setShippingMethod: this.setShippingMethod,
          setPaymentMethod: this.setPaymentMethod,
          placeOrder: this.placeOrder
        })}
      </React.Fragment>
    );
  }
}

export const CheckoutLogic = withApollo(CheckoutLogicImpl);
