import React, { useContext, Component } from 'react';
import { CmsContext } from 'src/components/Cms/context/CmsContext';
import { NotFound, Loader } from 'src/uikitEjected';
import DynamicRoute from '@market-ui/falcon-client/src/components/DynamicRoute';
import loadable from 'src/components/loadable';

const BlogPost = loadable(() => import(/* webpackChunkName: "blog/post" */ './blog/Post'));
const Category = loadable(() => import(/* webpackChunkName: "shop/category" */ './shop/Category/Category'));
const Product = loadable(() => import(/* webpackChunkName: "shop/product" */ './shop/PDP/ProductPage'));
const CmsPage = loadable(() => import(/* webpackChunkName: "shop/cmspage" */ './CMSPage'));
const Home = loadable(() => import(/* webpackChunkName: "shop/home" */ './Home'));
const Account = loadable(() => import(/* webpackChunkName: "account/account" */ './account/Account'));
const Auth = loadable(() => import(/* webpackChunkName: "account/authorization" */ './account/Auth'));

export default props => {
  var components = {
    'blog-post': BlogPost,
    'shop-category': Category,
    'shop-product': Product,
    'ProductDetailsPageTemplate': Product,
    'ProductListPageTemplate': Category,
    'ProductGridPageTemplate': Product,
    'SearchResultsListPageTemplate': Category,
    'SearchResultsGridPageTemplate': Category,
    'SearchResultsEmptyPageTemplate': Category,
    'CategoryPageTemplate': Category,
    'HomepageWCITemplate': Home,
    'ContentWCITemplate': CmsPage,
    'Account': Account,
    'Authorization': Auth,
    'shop-cms': CmsPage
  };
  /*
   ;;ProductDetailsPageTemplate;
;;ProductListPageTemplate;
;;ProductGridPageTemplate;
;;SearchResultsListPageTemplate;
;;SearchResultsGridPageTemplate;
;;SearchResultsEmptyPageTemplate;
;;CategoryPageTemplate;
;;LandingPage1Template;
;;ContentPage1Template;
;;AccountPageTemplate;

;;ContentWCITemplate;
;;HomepageWCITemplate
  */
  const {pageConfig} = useContext(CmsContext);

  let retVal = null;

  if (pageConfig && components[pageConfig.layout]){
    var Component = components[pageConfig.layout];
    retVal =  <Component id={pageConfig.properties[0]} location={pageConfig.location} />
  } else {
    //Backward compatibility for Magento login - TODO remove when PDP,PLP connector is ready
    retVal =  (
      <DynamicRoute
        {...props}
        loaderComponent={Loader}
        components={components}
        notFoundComponent={NotFound}
      />
    );
  }
  return retVal;
}
