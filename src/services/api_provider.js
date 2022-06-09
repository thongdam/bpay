import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
//==============develop by thongdam khamsena setting auto debit===============
//get all users
export const Users = () => {
  return httpClient.get(server.Users_URL);
};
//get all provider
export const getProviders = () => {
  return httpClient.get(server.PROVIDER_URL);
};
//insert providers auto debit
export const addProvider = data => {
  return httpClient.post(server.PROVIDER_URL, data);
};
//update providers auto debit
export const UpdateProvider = data => {
  return httpClient.put(server.PROVIDER_URL, data);
};
//delete provider by id
export const deleteProvider = id => {
  return httpClient.delete(server.PROVIDER_URL + `/${id}`);
};
//get all provider for fee
export const getFee = () => {
  return httpClient.get(server.GetFee_URL);
};
export const getViewFee = data => {
  return httpClient.post(server.GetFee_URL,data);
};
//get all account
export const getAcc = data => {
  return httpClient.post(server.GetAcc_URL,data);
};
//get check auto data
export const getAuto = data => {
  return httpClient.post(server.GetAuto_URL,data);
};
//get check bill data
export const getBill = data => {
  return httpClient.post(server.GetBill_URL,data);
};
//get product type
export const getProductType = () => {
  return httpClient.get(server.GetProductType_URL);
};
//get fee type 
export const getFeeType = () => {
  return httpClient.get(server.GetFeeType_URL);
};
//================develop by thongdam khamsena setting bill payment==============
export const getProviderBill = () =>{
  return httpClient.get(server.GetBillPayment_URL);
}
//get provider by provider code
export const GetProviderBillById = id => {
  return httpClient.get(server.GetBillPayment_URL + `/${id}`);
};
export const addProviderBill = data => {
  return httpClient.post(server.GetBillPayment_URL, data);
};
//update provider bill by provider codes
export const updateProviderBill = data => {
  return httpClient.put(server.GetBillPayment_URL, data);
};
//update provider by provider code
export const GetBillAccount = id => {
  return httpClient.get(server.GetBillAccount_URL + `/${id}`);
};
//get bpay posting provider by provider code
export const GetBpayPosting = id => {
  return httpClient.get(server.GetBPosting_URL + `/${id}`);
};
// get account for check 
export const getAccounts = data => {
  return httpClient.post(server.GetAccount_URL, data);
};

//update provider by provider code
export const GetFeeBillAccount = id => {
  return httpClient.get(server.GetFeeBillAccount_URL + `/${id}`);
};

// View Fee Provider
export const ViewFeeProviders = data => {
  return httpClient.post(server.ViewFeeProvider_URL,data);
};
// View Fee Provider
export const fetchProviders = data => {
  return httpClient.post(server.FetchProvider_URL,data);
};
// View All Provider
export const providersAll = data => {
  return httpClient.post(server.ProviderAll_URL,data);
};

//get provider for edit by is

export const GetProviderAutoById = id => {
  return httpClient.get(server.GetProviderAutoById_URL + `/${id}`);
};
export const GetAutoAccount = id => {
  return httpClient.get(server.GetAutoAccount_URL + `/${id}`);
};
