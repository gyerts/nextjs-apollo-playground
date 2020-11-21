import React from 'react';
import PropTypes from 'prop-types';
import {ProductQuery} from './ProductQuery';
import {Product} from "./Product";

interface IProductPageProps {
  id: string;
  location?: Location;
}

const ProductPage = (props: IProductPageProps) => {
  const { id, location } = props;
  return <ProductQuery variables={{ id, path: location.pathname }}>
    {(productProps: any) => <Product {...productProps} />}
  </ProductQuery>
 };

ProductPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default ProductPage;
