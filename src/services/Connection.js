import axios from "axios";
import { getToken } from "./Auth";
import history from "../History";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axios.get("http://localhost:8000/sanctum/csrf-cookie").then((response) => {});

baseAPI.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default baseAPI;
