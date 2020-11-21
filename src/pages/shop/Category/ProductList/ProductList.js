import React from 'react';
import { forceCheck } from 'react-lazyload';
import { themed, List, ListItem } from '@market-ui/falcon-ui';
import { ProductCard } from './ProductCard';
import { EmptyProductList } from './EmptyProductList';
import { repeatFrames } from 'src/uikitEjected/helpers'

export class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      getPrevProps: () => this.props
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { products: prevProducts } = prevState.getPrevProps();
    const { products: nextProducts } = nextProps;

    if (prevProducts !== nextProducts) {
      setTimeout(forceCheck);
    }

    return null;
  }

  render() {

    return (
      <ProductListLayout>
        {this.props.products.map((product, i) => (
          <ListItem key={product.id + i} className="product-card-item">
            <ProductCard product={product} />
          </ListItem>
        ))}
      </ProductListLayout>
    );
  }
}

export const ProductListLayout = themed({
  tag: List,
  defaultTheme: {
    productListLayout: {
      display: 'grid',
      gridTemplateColumns: repeatFrames(['xs', 'sm', 'md', 'lg', 'xl'], '1fr ', 2),
      gridAutoRows: 'minmax(min-content, max-content)',
      gridGap: 'md',
      m: 'none',
      p: 'none',
      css: {
        listStyle: 'none'
      }
    }
  }
});
