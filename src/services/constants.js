//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload.";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";
//production
//export const apiUrl = "http://10.0.4.44:8888/BpayAdmin/Bpay/";
//localhost
 export const apiUrl = "http://localhost:5996/Bpay";

export const server = {
  Users_URL:`getUsers`,
  LOGIN_URL: `login`,
  REGISTER_URL: `register`,
  TOKEN_KEY: `token`,
  USERNAME: `username`,
  PROVIDER_URL: `getproviders`,
  GetFee_URL:`getfee`,
  GetAcc_URL:`getaccount`,
  GetAuto_URL:`getauto`,
  GetBill_URL:`getbill`,
  GetFeeType_URL:`getFeeType`,
  GetProductType_URL:`getproducttype`,
  GetBillPayment_URL:`getProviderBill`,
  GetBillAccount_URL:`getBillAccount`,
  GetBPosting_URL:`getbpayPosting`,
  GetAccount_URL:`getAccounts`,
  GetFeeBillAccount_URL:`getFeeBillAccount`,
  ViewFeeProvider_URL:`ViewFeeProvider`,
  FetchProvider_URL:`fetchProviders`,
  ProviderAll_URL:`providersAll`,
  GetProviderAutoById_URL:`getProviderAutoById`,
  GetAutoAccount_URL:`getAutoAccount`
};
