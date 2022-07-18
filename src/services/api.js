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
  let result = await httpClient.post(server.LOGIN_URL, values);
  if (result.data.body.status_code=='0000000') {
    localStorage.setItem(server.USERNAME, result.data.body.username);
    localStorage.setItem(server.TOKEN_KEY, "12345454659846554465gdsfsdfsdf");
    router.push("/dashboard");
    return true;
  } else {
    return false;
  }
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
