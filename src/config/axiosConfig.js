import axios from "axios";
import { getAuthToken } from "./localStore";

const instance = axios.create({
  //baseURL: "http://10.50.82.30/api/",
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
