// appendix A
export interface IChargeRequestParams {
  terminal_name: string               // Tranzila assigned terminal name for merchant

  tran_mode?: 'A'|'V'                 // Allowed values:
                                      //   A – debit transaction
                                      //   V – just freeze money until product will be delivered

  card_holder_id_number?: string      // Subjected to merchant agreement with acquirer.
                                      // If not required, you may omit this parameter – to use only if not using hosted
                                      // fields card_holder_id field

  expiry_month?: string               // MM format – to use only if not using hosted fields’ expiry field

  expiry_year?: string                // YYYY format – to use only if not using hosted fields’ expiry field

  amount: number                      // In currency

  currency_code?: number              // Currency ISO code. Supported currencies: ILS, USD, EUR

  payment_plan?: typeof REGULAR_PAYMENT | typeof INSTALLMENTS_PAYMENT
  // cred_type                        // Allowed values:
                                      // 1 – regular payment, no installments
                                      // 8 – installments

  total_installments_number?: 1|2     // Optional, send only for cred_type = 8.
                                      // Number of payments less the first payment, in WOW instalments pass 1 for 2 payments.

  first_installment_amount?: number   // send only for cred_type = 8.
                                      // The first payment value.
                                      // In WOW pass here (‘sum’ /2)

  other_installments_amount?: number  // Optional, send only for cred_type = 8.
                                      // The amount of every installment following the first installment.
                                      // In WOW pass here (‘sum’ /2)

  tokenzine?: boolean

  response_language?: string          // English english or hebrew

  /**
   * CUSTOM FIELDS
   */
  email: string
  orderid: string
}

export const REGULAR_PAYMENT = 1;
export const INSTALLMENTS_PAYMENT = 8;

// appendix B
export interface IChargeResponse {
  transaction_response: {
    success: boolean,                  // Boolean. Can be true o false
    error: string,                     // Shva error message translated to language selected in reponse_language parameter

    transaction_id: string,            // Transaction unique ID in Tranzila gateway

                                       // The transaction id, should be send to the server so that it will
                                       // be possible to capture the payment later on in the shipping process.

    amount: string,                    // Transaction amount
    currency_code: number,             // Transaction currency code
    credit_card_last_4_digits: string, // Credit card last 4 digits
    token: string,                     // Credit card token if requested in tokenize parameter
    user_form_data: [],                // Container for all ‘non-hosted’ fields sent in request
    confirmation_code : string
  }

  errors: ITranzilaError[]             // Array for all input and pre-transaction errors
}

export interface ITranzilaError {
  code?: ErrorCode,                    // Error code as listed in appendix C
  param?: string,                      // Parameter name used in call to charge
  message: string,                     // Error message code
}

export type ErrorCode =
  | "card_holder_id_number_invalid"
  | "credit_card_number_invalid"
  | "expiry_invalid"
  | "cvv_invalid"

/**
 * =================================================================================
 * this is disinformation from the Tranzila vendor, error codes are in string format
 * =================================================================================
 */
// appendix C
// export type ErrorCode =
//   | 10000         // MANDATORY KEY IS MISSING
//   | 10001         // INVALID TERMINAL NAME
//   | 10002         // INVALID CREDIT CARD NUMBER                    // Wrong credit card number = “120”
//   | 10003         // INVALID CVV
//   | 10004         // INVALID EXPIRATION MONTH                      // Card expire = “036”  ???
//   | 10005         // INVALID EXPIRATION YEAR                       // Card expire = “036”  ???
//   | 10006         // INVALID AMOUNT OR AMOUNT ZERO
//   | 10007         // INVALID PAYMENT PLAN
//   | 10008         // INVALID TOTAL INSTALLMENTS NUMBER
//   | 10009         // INVALID FIRST INSTALLMENT AMOUNT
//   | 10010         // INVALID OTHER INSTALLMENTS AMOUNT
//   | 10011         // INVALID CARD HOLDER ID NUMBER                  // Wrong Id number= “026”
//   | 10012         // INVALID CURRENCY                               // Currency not allowed for card = “016”
//   | 10013         // TERMINAL NOT FOUND OR BAD CONFIGURATION
//   | 10014         // INVALID TRAN MODE
//   | 10015         // TOTAL INSTALLMENTS NUMBER MISSING
//   | 10016         // INSTALLMENTS AMOUNT FIELDS MISSING
