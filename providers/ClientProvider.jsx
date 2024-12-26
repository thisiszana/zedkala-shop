"use client";

import Header from "@/components/layout/Header";
import { AuthContextProvider } from "@/context/AuthContext";

export default function ClientProvider({ children }) {
  return (
    <AuthContextProvider>
      <Header />
      {children}
    </AuthContextProvider>
  );
}
