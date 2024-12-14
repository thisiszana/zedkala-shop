import axios from "axios";

const BASE_URL ="https://zedkala-admin-panel.vercel.app";

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: BASE_URL,
  headers,
});

export default api;
