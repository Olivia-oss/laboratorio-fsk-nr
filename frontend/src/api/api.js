import axios from "axios";

export const API = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
