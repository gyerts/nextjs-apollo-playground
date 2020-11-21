import {adopt} from "react-adopt";
import {OpenMiniCartMutation} from "src/components/MiniCart/graphql";
import {AddToCartMutation} from "src/api";
import {UIForm} from "src/components/Forms";
import {ProductConfigurator} from "src/uikitEjected/Product/ProductConfigurator";
import React from "react";

export const ProductForm = adopt({
  // mutation provides openMiniCartMutation() method that allows us to show mini cart once product is added
  openMiniCartMutation: ({ render }) => (
    <OpenMiniCartMutation>{openMiniCart => render({ openMiniCart })}</OpenMiniCartMutation>
  ),
  // mutation provides addToCart method which should be called with proper data
  addToCartMutation: ({ render, openMiniCartMutation }) => (
    <AddToCartMutation onCompleted={() => openMiniCartMutation.openMiniCart({variables: { eventType: 'system', messageId: 'miniCart.addedMsg' }})}>
      {(addToCart, result) => render({ addToCart, result })}
    </AddToCartMutation>
  ),
  // formik handles form operations and triggers submit when onSubmit event is fired on the form
  formik: ({ sku, qty, validate, addToCartMutation, render }) => (
    <UIForm
      id='product-form'
      name='product-form'
      initialValues={{}}
      validate={validate}
      onSubmit={values =>
        addToCartMutation.addToCart({
          variables: {
            input: {
              sku,
              qty,
              ...values,
            }
          }
        })
      }
    >
      {(...props) => render(...props)}
    </UIForm>
  ),

  // product configurator takes care about interactions between configurable product options and serializes
  // selected data into proper format so GraphQL can use it
  productConfigurator: ({ formik, render }) => (
    <ProductConfigurator onChange={(name: string, value: any) => formik.setFieldValue(name, value, !!formik.submitCount)}>
      {render}
    </ProductConfigurator>
  )
});

export const createValidator = (product: any, t: (i18nId: string) => string) => {
  return (values: any) => {
    const errors: any = {};

    // handle qty
    if (parseInt(values.qty, 10) < 1) {
      errors.qty = t('product.error.quantity');
    }

    return errors;
  };
}
