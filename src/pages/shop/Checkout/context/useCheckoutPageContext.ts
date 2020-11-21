import {useContext} from "react";
import {CheckoutPageContext} from "./CheckoutPageContext";


export const useCheckoutPageContext = () => {
  return useContext(CheckoutPageContext);
};
