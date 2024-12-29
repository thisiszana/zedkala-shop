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
  try {
    const res = await fetch(`${BASE_URL}/api/banner`, {
      next: { revalidate: 60 },
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("err in fetch banner", error.message);
  }
};

export const fetchCategory = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/category`, {
      next: { revalidate: 60 },
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {}
};

export const fetchProducts = async ({ pageParam = 1, sort }) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/products?page=${pageParam}&limit=10&sort=${sort}`
    );

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchUserCart = async ({ accessToken }) => {
  const res = await fetch(`${BASE_URL}/api/user/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseData = await res.json();
  return responseData;
};

export const fetchToCart = async ({ action, productId, accessToken }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/user/cart`, {
      method: "POST",
      body: JSON.stringify({ action, productId }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchDiscountProduct = async () => {
  const res = await fetch(`${BASE_URL}/api/products/discount-product`);

  const responseData = await res.json();
  return responseData;
};
