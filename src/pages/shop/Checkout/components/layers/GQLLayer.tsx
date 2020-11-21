import React from "react";
import {CustomerWithAddressesQuery} from "../../graphql/server/CustomerWithAddress";
import {GQLCustomer} from "src/graphql-types";


interface IProps {
  children: (customer: GQLCustomer) => any
}
export const GQLLayer = ({children}: IProps) => {
  return (
    <CustomerWithAddressesQuery>{({customer}: any) => children(customer)}</CustomerWithAddressesQuery>
  );
};
