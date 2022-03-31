import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getUsers = () => {
    return httpClient.get(server.GETUSERS_URL);
  };