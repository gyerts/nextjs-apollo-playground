import React from 'react';
import { Text } from '@deity/falcon-ui';
import { Router } from './../Router';
import { UrlQuery } from './GetUrlQuery';
import {useRouter} from 'next/router';


export const DynamicRoute = props => {
  const { components, notFound } = props;
  const {push} = useRouter();

  return (
    <Router>
      {router => {
        const location = props.location || router.location;
        const { pathname } = location;
        const path = pathname.startsWith('/') ? pathname.substring(1) : pathname;

        return (
          <UrlQuery variables={{ path }}>
            {({ url }) => {
              if (url === null) {
                const NotFound = notFound;

                return <NotFound location={location} />;
              }

              if (url.redirect) {
                return push(`/${url.path}`);
              }

              const Component = components[url.type];
              if (!Component) {
                return <Text>{`Please register component for '${url.type}' content type!`}</Text>;
              }

              return <Component id={url.id} path={url.path} />;
            }}
          </UrlQuery>
        );
      }}
    </Router>
  );
};
