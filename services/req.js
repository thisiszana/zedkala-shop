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

export const fetchRefreshToken = async (refreshToken) => {
  const res = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
    method: "POST",
    body: JSON.stringify(refreshToken),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await res.json();
  return responseData;
};

export const fetchUserSession = async ({ accessToken }) => {
  console.log("accessToken for user", accessToken);
  const res = await fetch(`${BASE_URL}/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await res.json();
  return responseData;
};

export const fetchBanner = async () => {
  const res = await fetch(`${BASE_URL}/api/banner`, {
    next: { revalidate: 86400 },
  });

  const responseData = await res.json();
  return responseData;
};

export const fetchCategory = async () => {
  const res = await fetch(`${BASE_URL}/api/category`, {
    next: { revalidate: 86400 },
  });

  const responseData = await res.json();
  return responseData;
};
