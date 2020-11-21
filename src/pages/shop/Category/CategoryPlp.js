import React, {useLayoutEffect, useState} from "react";
import {Loader} from "src/uikitEjected/Query";
import {FiltersSummary, getFiltersData} from "src/components/Filters";
import {CategoryArea, CategoryLayout, ShowMore} from "src/uikitEjected/Category";
import {Box, FlexLayout, Icon, Text, H1} from "@market-ui/falcon-ui";
import Sticky from "react-stickynode";
import {colorsFromDesign, themedColors} from "src/theme/colors";
import {Responsive} from "src/components/Responsive";
import Filters from "./Filters";
import {Toggle} from "react-powerplug";
import {T} from "@market-ui/falcon-i18n";
import {Sidebar} from "src/uikitEjected/Sidebar";
import {SearchConsumer} from "src/uikitEjected/Search";
import SortOrderDropdownPlp from "./SortOrderDropdownPlp";
import {ProductList} from "./ProductList";
import {getIsNextPage} from "./CategoryService";
import {NetworkStatus} from "apollo-client";
import {getBgFullWidth} from "src/utils/cssMixins";
import {Breadcrumbs} from "src/uikitEjected/Breadcrumbs";
import {Children} from "src/uikitEjected/Children";
import {scrollToTop} from "src/utils/scrolling";
import cls from 'classnames';

const useIsScrollToTopShown = () => {
  const [isScrollToTopShown, setIsScrollToTopShown] = useState(false);
  useLayoutEffect(() => {
    const handleScroll = (e) => {
      const window = e.currentTarget;
      setIsScrollToTopShown(window.scrollY > 140)
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return isScrollToTopShown;
}

const fetchMoreWithScrollToTop = (state, setPagination) => fn => {
  fn(state, setPagination);
  // scrollToTopLastFetchedRow('.product-card-item:nth-last-child(-n+4)');
};

export const CategoryPlp = (props) => {

  const isScrollToTopShown = useIsScrollToTopShown();

  const {categoryProductsQueryOutput, searchConsumerOutput} = props;
  const {state, setPagination} = searchConsumerOutput;
  const {products, fetchMore, networkStatus, loading} = categoryProductsQueryOutput;

  if (!products && loading) {
    return <Loader/>;
  }

  const {pagination, items, aggregations, description} = products;
  let {breadcrumbs = [], subCategories = []} = products;
  const filtersData = getFiltersData(state.filters, aggregations);

  breadcrumbs = breadcrumbs.map((breadcrumb) => ({
    name: breadcrumb.name,
    code: breadcrumb.code,
    urlPath: `/c/${breadcrumb.code}`
  }));
  subCategories = subCategories.map((subCategory) => ({
    name: subCategory.name,
    code: subCategory.code,
    urlPath: `/c/${subCategory.code}`
  }));

  return (
    <CategoryLayout variant={!filtersData.length && 'noFilters'}
                    className={'category-layout'}
                    css={{
                      gridAutoRows: 'minmax(min-content, max-content)'
                    }}>
      {loading && <Loader variant="overlay"/>}
      <Box gridArea={CategoryArea.heading}>
        <Box display={'flex'}>
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
        </Box>
        {breadcrumbs.length ?
        <H1 fontSize={'xl'}
            css={{
              textAlign: 'center',
            }}>{breadcrumbs[breadcrumbs.length - 1].name}</H1>
        : null}

        {description
          ? <Text fontSize={'sm'}
                  css={{
                    textAlign: 'center'
                  }}>{description}</Text>
          : null}
        {subCategories.length ?
          <Box
            display={'flex'}
            mb={'xs'}
            justifyContent={'center'}>
            <Children children={subCategories}/>
          </Box> : null
        }
        <Sticky className='mobile-filters-sticky' enabled={true}
                top={0}
                bottomBoundary={'footer'}>
          <Box css={{
            height: 2,
            zIndex: 0,
            background: themedColors.black
          }}
               bgFullWidth='black'/>
          <FlexLayout className={cls('filters-layout', {'sorting-only': !filtersData.length})}
                      justifyContent="space-between"
                      bgFullWidth={'white'}
                      alignItems="start"
                      pt={'sm'}
                      pb={'sm'}>
            {!!filtersData.length && (
              <Box gridArea={CategoryArea.filters}
                   className={'filters-area'}
              >
                <Responsive width="md">
                  {matches =>
                    matches ? (
                      <Filters data={filtersData}
                               isMobile={false}/>
                    ) : (
                      <Toggle initial={false}>
                        {({on, toggle}) => (
                          <React.Fragment>
                            <Text as={'span'}
                                  onClick={toggle}
                                  className={'refine-by'}
                            >
                              <T id={'filters.refineBy'}/>
                              <Icon
                                src={'dropdownArrowDown'}
                                fallback={'▾'}
                              />
                            </Text>
                            <Sidebar isOpen={on}
                                     p={'none'}
                                     side="left"
                                     close={toggle}>
                              <FlexLayout flexDirection={'column'}>
                                <Box css={getMobileHeadingRefineByStyles()}>
                                  <SearchConsumer>
                                    {({state: {filters}, setFilter, removeFilters}) => (
                                      <>
                                        {filters.length > 0 && (
                                          <Text onClick={removeFilters}
                                                css={{
                                                  cursor: 'pointer',
                                                  position: 'absolute',
                                                  top: '50%',
                                                  left: 0,
                                                  transform: 'translateY(-50%)'
                                                }}>
                                            <T id="filters.clearAll"/>
                                          </Text>
                                        )}
                                      </>
                                    )}
                                  </SearchConsumer>
                                  <Text css={{
                                    fontSize: 18
                                  }}>
                                    <T id={'filters.refineBy'}/>
                                  </Text>
                                  <Icon
                                    onClick={toggle}
                                    css={{
                                      stroke: themedColors.black,
                                      position: 'absolute',
                                      top: '50%',
                                      right: 0,
                                      transform: 'translateY(-50%)'
                                    }}
                                    src={'buttonArrowRight'}
                                  />
                                </Box>
                                <Filters data={filtersData}
                                         isMobile={true}
                                         close={toggle}
                                         px="md"/>
                              </FlexLayout>
                            </Sidebar>
                          </React.Fragment>
                        )}
                      </Toggle>
                    )
                  }
                </Responsive>
              </Box>
            )}
            <SortOrderDropdownPlp/>
          </FlexLayout>
          <Box className={'filters-layout-border-bottom'}
               css={{
                 height: 2,
                 zIndex: 0,
                 background: themedColors.black
               }}
               bgFullWidth='black'/>
        </Sticky>
        <FlexLayout className={'filters-summary-mobile'} display={'none'}>
          <SearchConsumer>
            {({state: {filters}, setFilter, removeFilters}) => (
              <>
                <FiltersSummary data={filtersData}/>
                {filters.length > 0 && (
                  <Text onClick={removeFilters}
                        pr={'xs'}
                        pl={'xs'}
                        css={{
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}>
                    <T id="filters.clearAll"/>
                  </Text>
                )}
              </>
            )}
          </SearchConsumer>

        </FlexLayout>
        <FlexLayout justifyContent="center"
                    pt={'sm'}
                    pb={'sm'}>
          <Text css={{
            fontSize: 14,
            color: colorsFromDesign.Grey
          }}>
            <T id="productList.found"/> {pagination.totalItems} <T id="productList.products"/>
          </Text>
        </FlexLayout>
      </Box>
      <Box gridArea={CategoryArea.content}>
        <ProductList products={items}/>
      </Box>
      <FlexLayout gridArea={CategoryArea.footer} flexDirection="column" alignItems="center">
        <div className={'paging-box'}>
          {getIsNextPage(pagination) ?
            <ShowMore key={items.length} onClick={() => fetchMoreWithScrollToTop(state, setPagination)(fetchMore)}
                      loading={networkStatus === NetworkStatus.fetchMore} />
            : null}
          {isScrollToTopShown
            ? <span className={'scroll-to-top'} onClick={scrollToTop}/>
            : null}

        </div>
      </FlexLayout>
    </CategoryLayout>
  );
}

const getMobileHeadingRefineByStyles = () => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  background: colorsFromDesign.Red,
  marginBottom: 16,
  ...getBgFullWidth({
    height: 'calc(100% + 32px)',
    background: colorsFromDesign.LightBrown,
    top: '-16px',
    boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.16)'
  }),
});
