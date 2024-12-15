import { refreshTokenAction } from "@/action/auth.action";
import { fetchRefreshToken } from "@/services/req";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getServerSession = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const session = {
      accessToken,
      refreshToken,
    };

    if (!accessToken) {
      if (!refreshToken) {
        redirect("/login");
      } else {
        const refreshTokenAccess = await fetchRefreshToken({ refreshToken });

        if (refreshTokenAccess.success === true) {
          const ref = await refreshTokenAction(refreshTokenAccess)
          console.log("reffffffffffffffffff", ref)
        }
      }
    }

    if (!accessToken && !refreshToken) {
      return null;
    } else {
      return session;
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};
