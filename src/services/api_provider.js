// import { imageUrl } from "./constants";
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

export const getPrviderById = id => {
  return httpClient.get(server.PROVIDER_URL + `/${id}`);
};

export const deleteprovider = id => {
  return httpClient.delete(server.PROVIDER_URL + `/${id}`);
};

// export const updateProduct = data => {
//   return httpClient.put(server.PROVIDER_URL, data);
// };
