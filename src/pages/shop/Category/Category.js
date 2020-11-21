import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchConsumer
} from 'src/uikitEjected';
import styled from "styled-components";
import {
  $lightPink,
  $lightPinkDarken,
  iconSpriteUrl
} from "src/theme/variables";
import GlobalStyleForCategory from "./GlobalStylesForCategory";
import {themedColors} from "src/theme/colors";
import {themedBreakpoints} from "src/theme/breakpoints";
import {CategoryProductsQuery} from "./CategoryProductsQuery";
import {CategoryPlp} from "./CategoryPlp";
import {CategoryProductsSearchQuery} from "./CategoryProductsSearchQuery";

const copy = item => item && JSON.parse(JSON.stringify(item));

const Category = (props) => {
  const {id, location, className} = props;
  const isSearch = location.pathname === '/search/';

  return (
    <>
      <GlobalStyleForCategory/>
      <div className={className}>
        <SearchConsumer className={props.className}>
          {(searchConsumerOutput) => {
            return (isSearch
              ? <CategoryProductsSearchQuery
                  variables={{
                    term: searchConsumerOutput.state.term || '',
                    sort: searchConsumerOutput.state.sort,
                    filters: copy(searchConsumerOutput.state.filters),
                    path: location.pathname,
                    query: searchConsumerOutput.state.pagination
                  }}
                  errorPolicy={'ignore'}
                  passLoading
                >
                  {(categoryProductsQueryOutput) => {
                    return <CategoryPlp
                      searchConsumerOutput={searchConsumerOutput}
                      categoryProductsQueryOutput={categoryProductsQueryOutput}
                    />
                  }}
                </CategoryProductsSearchQuery>
              : <CategoryProductsQuery
                  variables={{
                    categoryId: id,
                    sort: searchConsumerOutput.state.sort,
                    filters: copy(searchConsumerOutput.state.filters),
                    path: location.pathname,
                    query: searchConsumerOutput.state.pagination
                  }}
                  errorPolicy={'ignore'}
                  passLoading
                >
                  {(categoryProductsQueryOutput) => {
                    return <CategoryPlp
                      searchConsumerOutput={searchConsumerOutput}
                      categoryProductsQueryOutput={categoryProductsQueryOutput}
                    />
                  }}
                </CategoryProductsQuery>

            )
          }}
        </SearchConsumer>
      </div>
    </>
  )
};

Category.propTypes = {
  id: PropTypes.string.isRequired
};

const CategoryPage = styled(Category)`

.paging-box {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.dropdown-arrow-down {
  margin: 0;
}

.themed-dropdown-menu {
  left: auto !important;
  right: 0 !important;
}

.scroll-to-top {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-image: url(${iconSpriteUrl});
  background-repeat: no-repeat;
  background-position-x: -436px;
  background-position-y: -145px;
  cursor: pointer;
  position: fixed;
  bottom: 205px;
  right: 20px;
  z-index: 2;
}

.filters-summary-mobile {
  display: none;
}

.refine-by {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0;
  white-space: nowrap;
}

.refine-by-header {
  background: #f8f5f0;
  padding: 16px;
}

.filters-area {
  width: calc(100% - 250px);
}

.filters-layout {
  svg[class*='-icon'] {
    margin-right: 0;
    margin-left: 0;
  }
}

@media (min-width: ${themedBreakpoints.md}px) {
  .filters-layout-border-bottom {
    display: none;
  }
  .mobile-filters-sticky {
     position: relative;
     .sticky-inner-wrapper {
        position: static !important;
     }
  }
}

@media (max-width: ${themedBreakpoints.md}px) {
  .filters-summary-mobile {
    margin-top: 16px;
    display: flex;
  }
  
  .filters-area {
    width: auto;
  }
  
  .themed-dropdown {
    padding-top: 0;
  }
  
  .children {
    justify-content: flex-start;
  }

  .child {
    background: ${$lightPink};
    padding: 5px 10px;
    margin: 5px 20px 10px 0;
    &:hover {
      background: ${$lightPinkDarken};
    }
  }

  .filters-layout {
    position: relative;
    align-items: center;
    background: ${themedColors.white};
    justify-content: space-around;
    &:after {
      content: "";
      display: inline-block;
      position: absolute;
      width: 1px;
      background: ${themedColors.black};
      left: 50%;
      transform: translateX(-50%);
      height: calc(100% - 32px);
      top: 16px;
    }
    &.sorting-only {
      &:after {
        content: none
      }
    }
  }
}

`;

export default CategoryPage;
