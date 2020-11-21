import React from 'react';
import {IChargeResponse} from "../types";
import styled from "styled-components";


interface IProps {
  response?: IChargeResponse
}
export const ResponseView = ({response}: IProps) => {
  if (!response) {
    return null;
  }
  const {errors, transaction_response: r} = response;

  return (
    <React.Fragment>
      <table style={{margin: 10}}>
        <legend><strong>transaction_response</strong></legend>
        <tbody>
        <tr>
          <td>success</td>
          <td>{JSON.stringify(r.success)}</td>
          <td><Comment>Boolean. Can be true o false</Comment></td>
        </tr>
        <tr>
          <td>error</td>
          <td>{JSON.stringify(r.error)}</td>
          <td><Comment>Shva error message translated to language selected in reponse_language parameter</Comment></td>
        </tr>
        <tr>
          <td>transaction_id</td>
          <td>{JSON.stringify(r.transaction_id)}</td>
          <td><Comment>Transaction unique ID in Tranzila gateway</Comment></td>
        </tr>
        <tr>
          <td>amount</td>
          <td>{JSON.stringify(r.amount)}</td>
          <td><Comment>Transaction amount</Comment></td>
        </tr>
        <tr>
          <td>currency_code</td>
          <td>{JSON.stringify(r.currency_code)}</td>
          <td><Comment>Transaction currency code</Comment></td>
        </tr>
        <tr>
          <td>credit_card_last_4_digits</td>
          <td>{JSON.stringify(r.credit_card_last_4_digits)}</td>
          <td><Comment>Credit card last 4 digits</Comment></td>
        </tr>
        <tr>
          <td>token</td>
          <td>{JSON.stringify(r.token)}</td>
          <td><Comment>Credit card token if requested in tokenize parameter</Comment></td>
        </tr>
        <tr>
          <td>user_form_data</td>
          <td>{JSON.stringify(r.user_form_data)}</td>
          <td><Comment>Container for all ‘non-hosted’ fields sent in request</Comment></td>
        </tr>
        </tbody>
      </table>

      <table style={{margin: 10}}>
        <legend><strong>errors</strong></legend>
        <tbody>
        {errors && errors.map(er => (
          <tr>
            <td>param: {er.param}</td>
            <td>code: {er.code}</td>
            <td>message: {er.message}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

const Comment = styled.div`
  color: #797979;
`;
