import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BannerSection from "@/components/pages/(home)/ui/banner/BannerSection";

export default function PagesLayout({ children }) {
  return (
    <>
      <Header />
      <BannerSection />
      <main className="mt-[30px] px-3 maxWidth pb-[150px] min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
