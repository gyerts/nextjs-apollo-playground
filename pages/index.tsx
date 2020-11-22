import React from "react";
import styled from 'styled-components';
import {Box} from "@deity/falcon-ui";
import {addApolloState, initializeApollo} from "src/apolloClient";
import {CMS_PAGE_CMS_QUERY} from "src/components/Cms/graphql/server/CmsPageQuery";
import {CmsSlot} from "src/components/Cms/CmsSlot";

const HomeLayout = (props) => {
  return (
    <Box className={props.className}>
      {/*<div>{props.ValFromGetServerSideProps}</div>*/}
      {/*<div>{props.ValFromGetStaticProps}</div>*/}
      {/*<div>{props.ValFromGetInitialProps}</div>*/}
      <CmsSlot position="CMSMainTop" />
      <CmsSlot position="CMSMainCenter" />
      <CmsSlot position="CMSMainBottom" />
    </Box>
  )
};

const Home = styled(HomeLayout)`
    h2 {
        text-transform: uppercase;
        text-align: center;
        padding-bottom: 10px;
        padding-top: 40px;
        font-size: 24px;
        
        @media(min-width: themedBreakpoints.md) {
            font-size: 40px;
            padding-bottom: 30px;
            padding-top: 60px;
        }
    }
`;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return { props: {ValFromGetServerSideProps: 'ValFromGetServerSideProps!'} }
// };


// Home.getInitialProps = async (context) => {
//   return { props: {ValFromGetInitialProps: 'ValFromGetInitialProps!'} }
// };

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const pageConfig = {
    CMSCode: null,
    CMSPageId: "homepage",
    CMSPageType: null,
    layout: "HomepageWCITemplate",
    location: {pathname: "/", route: "/"},
    pathRegex: "^/(\?.*)*$",
    properties: [],
  };

  const {data: {page}} = await apolloClient.query({
    query: CMS_PAGE_CMS_QUERY,
    variables: {
      id : pageConfig.CMSPageId,
      CMSPageType: pageConfig.CMSPageType,
      CMSCode: pageConfig.CMSCode
    },
  });

  return addApolloState(apolloClient, {
    props: {
      page,
      pageConfig,
    },
    revalidate: 1,
  });
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   return { props: {ValFromGetStaticProps: 'ValFromGetStaticProps!'} }
// };

export default Home;

