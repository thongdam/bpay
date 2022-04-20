import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

//get all provider
export const getProviders = () => {
  return httpClient.get(server.PROVIDER_URL);
};
//insert providers
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
//get all fee
export const getfee = () => {
  return httpClient.get(server.GETFEE_URL);
};
//get all account
export const getacc = () => {
  return httpClient.get(server.GETACC_URL);
};
//get check auto data
export const getAuto = data => {
  return httpClient.post(server.GETAUTO_URL,data);
};
//get check bill data
export const getBill = data => {
  return httpClient.post(server.GETBILL_URL,data);
};

