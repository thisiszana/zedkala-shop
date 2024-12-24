"use client";

import Header from "@/components/layout/Header";

export default function ClientProvider({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
