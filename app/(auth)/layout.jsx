import { redirect } from "next/navigation";

import { getServerSession } from "@/utils/session";
import AuthProvider from "@/providers/AuthProvider";

export const dynamic = 'force-dynamic';

export default async function AuthLayout({ children }) {
  const { accessToken, refreshToken } = await getServerSession();

  // console.log("session in authlayout", { accessToken, refreshToken });

  if (accessToken && refreshToken) {
    redirect("/");
    return null;
  }

  return (
    <AuthProvider refreshToken={refreshToken} accessToken={accessToken}>
      {children}
    </AuthProvider>
  );
}
