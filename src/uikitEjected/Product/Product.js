import React from 'react';
import { ErrorMessage } from 'formik';
import { adopt } from 'react-adopt';
import { I18n } from '@market-ui/falcon-i18n';
import { themed, Box, Text, H1, NumberInput, Button, Icon, FlexLayout } from '@market-ui/falcon-ui';
import { Locale } from '../Locale';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductGallery } from './ProductGallery';
import { ProductConfigurableOptions } from './ConfigurableOptions';
import { AddToCartMutation } from 'src/api';
import { ProductConfigurator } from './ProductConfigurator';
import { Price } from '../Locale';
import { toGridTemplate } from '../helpers';
import {DangerousText, OpenMiniCartMutation, UIForm} from 'src/components';


export const ProductLayout = themed({
  tag: 'div',
  defaultTheme: {
    productLayout: {
      display: 'grid',
      gridGap: 'sm',
      my: 'md'
    }
  }
});

const Area = {
  gallery: 'gallery',
  sku: 'sku',
  title: 'title',
  description: 'description',
  cta: 'cta',
  price: 'price',
  meta: 'meta',
  empty: 'empty',
  options: 'options',
  error: 'error'
};

export const ProductDetailsLayout = themed({
  tag: 'article',
  defaultTheme: {
    productDetailsLayout: {
      display: 'grid',
      gridGap: 'sm',

      gridTemplate: {
        // prettier-ignore
        xs: toGridTemplate([
          ['1fr'           ],
          [Area.title      ],
          [Area.sku        ],
          [Area.gallery    ],
          [Area.price      ],
          [Area.error      ],
          [Area.options    ],
          [Area.cta        ],
          [Area.description],
          [Area.meta       ]
        ]),
        // prettier-ignore
        md: toGridTemplate([
          ['1.5fr',        '1fr'                  ],
          [Area.gallery,   Area.sku               ],
          [Area.gallery,   Area.title             ],
          [Area.gallery,   Area.price             ],
          [Area.gallery,   Area.options           ],
          [Area.gallery,   Area.cta               ],
          [Area.gallery,   Area.error             ],
          [Area.gallery,   Area.description, '1fr'],
          [Area.gallery,   Area.meta              ]
        ])
      }
    }
  }
});

const ProductDescriptionLayout = themed({
  tag: 'div',

  defaultTheme: {
    productDescriptionLayout: {
      css: {
        p: {
          margin: 0
        }
      }
    }
  }
});

/**
 * Combine render props functions into one with react-adopt
 */
const ProductForm = adopt({
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
  formik: ({ sku, validate, addToCartMutation, render }) => (
    <UIForm
      id='product-form'
      name='product-form'
      initialValues={{ qty: 1 }}
      validate={validate}
      onSubmit={values =>
        addToCartMutation.addToCart({
          variables: {
            input: {
              sku,
              ...values,
              qty: parseInt(values.qty, 10)
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
    <ProductConfigurator onChange={(name, value) => formik.setFieldValue(name, value, !!formik.submitCount)}>
      {render}
    </ProductConfigurator>
  )
});

export class Product extends React.PureComponent {
  createValidator(product, t) {
    return values => {
      const errors = {};

      // handle qty
      if (parseInt(values.qty, 10) < 1) {
        errors.qty = t('product.error.quantity');
      }

      // handle configuration options
      if (product.configurableOptions && product.configurableOptions.length) {
        if (!values.configurableOptions || values.configurableOptions.length !== product.configurableOptions.length) {
          errors.configurableOptions = t('product.error.configurableOptions');
        }
      }

      // todo: handle bundled products

      return errors;
    };
  }

  render() {
    const { product } = this.props;

    return (
      <ProductLayout>
        <Breadcrumbs breadcrumbs={product.breadcrumbs || []} />
        <I18n>
          {t => (
            <ProductForm sku={product.sku} validate={this.createValidator(product, t)}>
              {({
                addToCartMutation: {
                  result: { loading, error }
                },

                formik: { values, errors, setFieldValue, submitCount },
                productConfigurator
              }) => (
                <ProductDetailsLayout>
                  <FlexLayout gridArea={Area.gallery} alignItems="center" justifyContent="center">
                    <ProductGallery items={product.gallery} />
                  </FlexLayout>
                  <Text fontSize="sm" gridArea={Area.sku}>
                    {t('product.sku', { sku: product.sku })}
                  </Text>
                  <DangerousText as={H1} gridArea={Area.title}>{product.name}</DangerousText>

                  <Box gridArea={Area.price}>
                    {product.price.special ? (
                      <React.Fragment>
                        <Price value={product.price.regular} fontSize="xl" variant="old" mr="xs" />
                        <Price value={product.price.special} fontSize="xl" variant="special" />
                      </React.Fragment>
                    ) : (
                      <Price value={product.price.regular} fontSize="xl" />
                    )}
                    <Locale>
                      {({ priceFormat }) =>
                        (product.tierPrices || []).map(x => (
                          <Text key={x.qty}>
                            {t('product.tierPriceDescription', {
                              qty: x.qty,
                              price: priceFormat(x.value),
                              discount: x.discount
                            })}
                          </Text>
                        ))
                      }
                    </Locale>
                  </Box>
                  <ProductConfigurableOptions
                    options={product.configurableOptions}
                    error={errors.configurableOptions}
                    onChange={ev => productConfigurator.handleProductConfigurationChange('configurableOption', ev)}
                  />
                  <ProductDescriptionLayout
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    gridArea={Area.description}
                  />
                  <FlexLayout alignItems="center" gridArea={Area.cta} mt="xs">
                    <NumberInput
                      mr="sm"
                      mt="sm"
                      min="1"
                      name="qty"
                      aria-label={t('product.quantity')}
                      disabled={loading}
                      defaultValue={String(values.qty)}
                      onChange={ev => setFieldValue('qty', ev.target.value, !!submitCount)}
                    />
                    <Button
                      type="submit"
                      height="xl"
                      mt="sm"
                      disabled={loading}
                      variant={loading ? 'loader' : undefined}
                    >
                      {!loading && <Icon src="cart" stroke="white" size="md" mr="sm" />}
                      {t('product.addToCart')}
                    </Button>
                  </FlexLayout>
                  <Box gridArea={Area.error}>
                    <ErrorMessage name="qty" render={msg => <Text color="error">{msg}</Text>} />
                    {!!error && <Text color="error">{error.message}</Text>}
                  </Box>
                </ProductDetailsLayout>
              )}
            </ProductForm>
          )}
        </I18n>
      </ProductLayout>
    );
  }
}
