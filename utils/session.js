import { cookies } from "next/headers";

export const getServerSession = async () => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
      return null;
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};
