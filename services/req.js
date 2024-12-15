const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://zedkala-admin-panel.vercel.app"
    : "http://localhost:3001";

export const fetchSignup = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await res.json();
  return responseData;
};

export const fetchLogin = async (data) => {
  console.log("req dataaaa", data);
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await res.json();
  return responseData;
};

export const fetchRefreshToken = async (data) => {
  console.log("req dataaaa", data);
  const res = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await res.json();
  return responseData;
};
