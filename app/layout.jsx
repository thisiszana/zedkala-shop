import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import { getServerSession } from "@/utils/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "زد - کالا",
  description: "Generated by create next app",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const { accessToken, refreshToken } = await getServerSession();
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider refreshToken={refreshToken} accessToken={accessToken}>
            {children}
          </AuthProvider>
        </ReactQueryProvider>
        <div>
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
