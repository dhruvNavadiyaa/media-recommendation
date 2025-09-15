import axios from "axios";
import { BASE_URL } from "@/config/env";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {}
);
