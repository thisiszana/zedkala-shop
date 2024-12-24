import BannerSection from "@/components/pages/(home)/ui/banner/BannerSection";
import AuthProvider from "@/providers/AuthProvider";
import ClientProvider from "@/providers/ClientProvider";
import { getServerSession } from "@/utils/session";

export const dynamic = "force-dynamic";

export default async function PagesLayout({ children }) {
  const { accessToken, refreshToken } = await getServerSession();
  return (
    <AuthProvider refreshToken={refreshToken} accessToken={accessToken}>
      <ClientProvider>
        <BannerSection />
        <main className="mt-[90px] px-3 maxWidth pb-[150px] min-h-screen">
          {children}
        </main>
      </ClientProvider>
    </AuthProvider>
  );
}
