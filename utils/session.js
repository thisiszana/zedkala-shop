import { refreshTokenAction } from "@/action/auth.action";
import { fetchRefreshToken } from "@/services/req";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getServerSession = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};
