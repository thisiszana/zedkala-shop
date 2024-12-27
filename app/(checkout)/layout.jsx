import ClientProvider from "@/providers/ClientProvider";

export default function CheckoutLayout({ children }) {
  return (
    <ClientProvider>
      <main className="mt-[100px] px-3 maxWidth pb-[150px] min-h-screen">
        {children}
      </main>
    </ClientProvider>
  );
}
