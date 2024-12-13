import axios from "axios";

const BASE_URL = process.env.API_URL;

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  BASE_URL,
  headers,
});

export default api;