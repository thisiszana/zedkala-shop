import AuthProvider from "@/providers/AuthProvider";
import { getServerSession } from "@/utils/session";

export default async function ProfileLayout({ children }) {
  const { accessToken, refreshToken } = await getServerSession();
  return (
    <AuthProvider refreshToken={refreshToken} accessToken={accessToken}>
      {children}
    </AuthProvider>
  );
}
