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

// export const getProductById = id => {
//   return httpClient.get(server.PROVIDER_URL + `/id/${id}`);
// };



// export const deleteProduct = id => {
//   return httpClient.delete(server.PROVIDER_URL + `/id/${id}`);
// };

// export const updateProduct = data => {
//   return httpClient.put(server.PROVIDER_URL, data);
// };
