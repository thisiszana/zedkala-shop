import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";

export default function PagesLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mt-[90px] maxWidth pb-[150px] min-h-screen bg-red-400">
        {children}
      </main>
      <Footer />
    </>
  );
}
