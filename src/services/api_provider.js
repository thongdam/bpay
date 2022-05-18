import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
//==============develop by thongdam khamsena setting auto debit===============
//get all provider
export const getProviders = () => {
  return httpClient.get(server.PROVIDER_URL);
};
//insert providers auto debit
export const addProvider = data => {
  return httpClient.post(server.PROVIDER_URL, data);
};
//get provider by id
export const getPrviderById = id => {
  return httpClient.get(server.PROVIDER_URL + `/${id}`);
};
//delete provider by id
export const deleteprovider = id => {
  return httpClient.delete(server.PROVIDER_URL + `/${id}`);
};
//get all provider for fee
export const getFee = () => {
  return httpClient.get(server.GETFEE_URL);
};
export const getViewFee = data => {
  return httpClient.post(server.GETFEE_URL,data);
};
//get all account
export const getAcc = data => {
  return httpClient.post(server.GETACC_URL,data);
};
//get check auto data
export const getAuto = data => {
  return httpClient.post(server.GETAUTO_URL,data);
};
//get check bill data
export const getBill = data => {
  return httpClient.post(server.GETBILL_URL,data);
};
//get product type
export const getProductType = () => {
  return httpClient.get(server.GETPRODUCTTYPE);
};
//get fee type 
export const getFeeType = () => {
  return httpClient.get(server.GETFEETYPE_URL);
};
//================develop by thongdam khamsena setting bill payment==============
export const gitproviderbill = () =>{
  return httpClient.get(server.GETBILLPAYMENT_URL);
}
//get provider by provider code
export const GetProviderBillById = id => {
  return httpClient.get(server.GETBILLPAYMENT_URL + `/${id}`);
};
export const addProviderBill = data => {
  return httpClient.post(server.GETBILLPAYMENT_URL, data);
};
//update provider bill by provider codes
export const updateProviderBill = data => {
  return httpClient.put(server.GETBILLPAYMENT_URL, data);
};
//update provider by provider code
export const GETBILLACCOUNT = id => {
  return httpClient.get(server.GETBILLACCOUNT_URL + `/${id}`);
};
//get bpay posting provider by provider code
export const GETBPAYPOSTING = id => {
  return httpClient.get(server.GETBPAYPOSTING_URL + `/${id}`);
};
