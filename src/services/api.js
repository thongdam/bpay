import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";
import * as providerApis from "@/services/api_provider";
import * as usersApis from "@/services/api_users";
import router from "@/router";

const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
};

const logoff = () => {
  localStorage.removeItem(server.TOKEN_KEY);
  localStorage.removeItem(server.USERNAME);
  router.push("/login");
};

const login = async (values) => {
  // let result = await httpClient.post(server.LOGIN_URL, values);
  // if (result.data.result == "ok") {
  //   localStorage.setItem(server.USERNAME, values.username);
  //   localStorage.setItem(server.TOKEN_KEY, result.data.token);
  //   router.push("/manageuser");
  //   return true;
  // } else {
  //   return false;
  // }
  localStorage.setItem(server.USERNAME, values.username);
  localStorage.setItem(server.TOKEN_KEY, "123456");
  return true;
};

const register = async (values) => {
  let result = await httpClient.post(server.REGISTER_URL, values);
  if (result.data.result == "ok") {
    router.go(-1);
  } else {
    alert(JSON.stringify(result));
  }
};

export default {
  logoff,
  login,
  register,
  isLoggedIn,
  ...providerApis,
  ...usersApis,
};
