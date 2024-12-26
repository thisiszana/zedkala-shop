import BannerSection from "@/components/pages/(home)/ui/banner/BannerSection";
import ClientProvider from "@/providers/ClientProvider";

export default async function PagesLayout({ children }) {
  return (
    <ClientProvider>
      <BannerSection />
      <main className="mt-[100px] px-3 maxWidth pb-[150px] min-h-screen">
        {children}
      </main>
    </ClientProvider>
  );
}
