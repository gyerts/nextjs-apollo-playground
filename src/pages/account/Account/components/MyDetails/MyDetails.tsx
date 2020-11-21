import React from "react";
import {Box, Divider} from "@market-ui/falcon-ui";
import {
  CustomerQuery,
  ICustomer,
} from "src/api";
import {SectionUpdateCustomerInfo} from "./SectionUpdateCustomerInfo";
import {mobileOnly} from "src/styling/cssHelper";
import {SectionUpdateCustomerPassword} from "./SectionUpdateCustomerPassword";


interface IProps {

}
export const MyDetails = ({}: IProps) => {
  return (
    <CustomerQuery>{({customer}: {customer: ICustomer}) => (
      !customer ? null : (
        <Box m={mobileOnly('xs')}>
          <SectionUpdateCustomerInfo customer={customer} />
          <Divider my='md' borderColor='black' />
          <SectionUpdateCustomerPassword />
        </Box>
      )
    )}</CustomerQuery>
  )
};
