export const getAccessToken = () => {
  const cookies = document.cookie.split("; ");
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("accessToken=")
  );
  if (accessTokenCookie) {
    return accessTokenCookie.split("=")[1];
  }

  return null;
};
