"use server"
import axios from "axios";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://zedkala-admin-panel.vercel.app"
    : "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const accessToken = cookies().get("accessToken")?.value;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error("Error adding access token to headers:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 400:
          console.error("Bad Request:", response.data.msg);
          break;
        case 401:
          console.error("Unauthorized:", response.data.msg);
          break;
        case 404:
          console.error("Not Found:", response.data.msg);
          break;
        case 500:
          console.error("Server Error:", response.data.msg);
          break;
        default:
          console.error("Unhandled Error:", response.data.msg);
          break;
      }

      return Promise.reject({
        success: false,
        status: response.status,
        msg: response.data.msg || "خطای ناشناخته",
      });
    }

    console.error("Network Error:", error.message);
    return Promise.reject({
      success: false,
      msg: "مشکلی در ارتباط با سرور وجود دارد.",
    });
  }
);

export default api;
