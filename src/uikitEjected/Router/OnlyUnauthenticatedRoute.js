import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IsAuthenticatedQuery } from '../../api/Customer/IsAuthenticatedQuery';

export const OnlyUnauthenticatedRoute = ({ component, redirectTo, ...rest }) => {
  const Component = component;

  return (
    <Route
      {...rest}
      render={props => (
        <IsAuthenticatedQuery>
          {({ customer }) =>
            customer ? (
              <Redirect
                to={{
                  pathname: redirectTo
                }}
              />
            ) : (
              <Component {...props} />
            )
          }
        </IsAuthenticatedQuery>
      )}
    />
  );
};
OnlyUnauthenticatedRoute.defaultProps = {
  redirectTo: '/'
};
OnlyUnauthenticatedRoute.propTypes = {
  ...Route.propTypes,
  redirectTo: PropTypes.string
};
