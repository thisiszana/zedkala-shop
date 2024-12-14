import axios from "axios";

// const BASE_URL = "https://zedkala-admin-panel.vercel.app";
const BASE_URL = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: BASE_URL,
  headers,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
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
