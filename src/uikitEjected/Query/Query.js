import React from 'react';
import PropTypes from 'prop-types';
import { Query as ApolloQuery } from 'react-apollo';
import { NetworkStatus } from 'apollo-client';
import { Loader } from './Loader';

export class Query extends React.Component {
  static propTypes = {
    ...ApolloQuery.propTypes,
    passErrors : PropTypes.bool,
    loader: PropTypes.bool
  };

  getErrorCode(error) {
    if (error) {
      const { graphQLErrors } = error;
      if (Array.isArray(graphQLErrors) && graphQLErrors.length > 0) {
        const { extensions = {} } = graphQLErrors[0];
        const { code } = extensions;

        return code;
      }
    }

    return undefined;
  }

  render() {
    const { children, fetchMore, passLoading,passErrors, ...restProps } = this.props;
    return (
      <ApolloQuery {...restProps}>
        {({ networkStatus, error, data, loading, fetchMore: apolloFetchMore }) => {
          if (error) {
            const errorCode = this.getErrorCode(error);
            if (passErrors) { 
              return children({
                errorCode,
                error
              });
            }
            else {
              // Generic error handler
              return (
                <p>
                  {`Error!: ${errorCode}`}
                  <br /> {`${error}`}
                </p>
              );  
            }
          }

          loading = networkStatus === NetworkStatus.loading || (networkStatus !== NetworkStatus.fetchMore && loading);
          if (!passLoading && loading) {
            return <Loader />;
          }

          return children({
            ...data,
            loading,
            networkStatus,
            fetchMore: fetchMore
                ? (state, setPagination) => fetchMore(
                    data,
                    apolloFetchMore
                )(state, setPagination)
                : undefined
          });
        }}
      </ApolloQuery>
    );
  }
}
