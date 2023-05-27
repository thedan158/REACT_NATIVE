import axios from "axios";
import store from "../app/store";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
    const refreshToken = store.getState().user.refreshToken;
    if (!config.headers) {
      config.headers = {};
    }
    if (token) {
      config.headers["aenx"] = token ? token : "";
      config.headers["aenx-renew"] = refreshToken ? refreshToken : "";
    }
    config.headers["request-app"] = "aenconnect";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;