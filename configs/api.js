"use server";

import axios from "axios";

import { getServerSession } from "@/utils/session";
import { setCookie } from "@/action/auth.action";

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

// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const session = await getServerSession();
//       if (session) {
//         config.headers.Authorization = `Bearer ${session?.accessToken}`;
//       }
//     } catch (error) {
//       console.error("Error adding access token to headers:", error);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;
