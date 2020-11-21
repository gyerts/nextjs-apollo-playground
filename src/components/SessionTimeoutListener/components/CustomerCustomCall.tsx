import React, {useCallback} from 'react';
import {ApolloConsumer} from "react-apollo";
import {ApolloClient, QueryOptions} from "apollo-client";
import {GET_IS_AUTHENTICATED} from "../../../api";


interface IProps extends ICustomerCustomQueryProps {
  client: ApolloClient<any>
}
const CustomerCustomQueryImpl = ({client, children}: IProps) => {
  /**
   * @description this call will bring new cookies, we need just call it and wait for cookies update
   */
  const fetchCustomer = useCallback(function () {
    return client.query<{customer?: any}>(opts);
  }, []);

  return children({fetchCustomer});
};

interface ICustomerCustomQueryProps {
  children: (props: {fetchCustomer: () => void}) => React.ReactElement
}
export const CustomerCustomQuery = ({children}: ICustomerCustomQueryProps) => {
  return (
    <ApolloConsumer>
      {client => <CustomerCustomQueryImpl client={client} children={children} />}
    </ApolloConsumer>
  );
};

const opts: QueryOptions<{customer?: any}> = {
  query: GET_IS_AUTHENTICATED,
  fetchPolicy: 'network-only',
};
