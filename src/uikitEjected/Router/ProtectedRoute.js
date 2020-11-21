import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IsAuthenticatedQuery } from '../../api/Customer/IsAuthenticatedQuery';

export const ProtectedRoute = ({ component, redirectTo='/authorization/signin', ...rest }) => {
  const Component = component;

  return (
    <Route
      {...rest}
      render={props => (
        <IsAuthenticatedQuery>
          {({ customer }) => {
            if (customer) {
              return <Component {...props} />;
            }

            const { location } = props;
            const { pathname, search } = location;

            return (
              <Redirect
                to={{
                  pathname: redirectTo,
                  search: `?${new URLSearchParams({ next: `${pathname}${search}` })}`,
                  state: { nextLocation: location }
                }}
              />
            );
          }}
        </IsAuthenticatedQuery>
      )}
    />
  );
};
ProtectedRoute.propTypes = {
  ...Route.propTypes,
  redirectTo: PropTypes.string
};
