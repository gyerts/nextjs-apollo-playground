import React from "react";
import styled from 'styled-components';
import {Box} from "@deity/falcon-ui";
import {GetServerSideProps, GetStaticProps} from "next";

const HomeLayout = (props) => {
  return (
    <Box className={props.className}>
      <div>{props.ValFromGetServerSideProps}</div>
      <div>{props.ValFromGetStaticProps}</div>
      {/*<CmsSlot position="CMSMainTop" />*/}
      {/*<CmsSlot position="CMSMainCenter" />*/}
      {/*<CmsSlot position="CMSMainBottom" />*/}
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

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: {ValFromGetStaticProps: 'ValFromGetStaticProps!'} }
};

export default Home;

