import BannerSection from "@/components/pages/(home)/ui/banner/BannerSection";
import ClientProvider from "@/providers/ClientProvider";
import { getServerSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function PagesLayout({ children }) {
  const { accessToken, refreshToken } = await getServerSession();

  if (!accessToken && !refreshToken) return redirect("/");
  return (
    <ClientProvider>
      <BannerSection />
      <main className="mt-[100px] px-3 maxWidth pb-[150px] min-h-screen">
        {children}
      </main>
    </ClientProvider>
  );
}
