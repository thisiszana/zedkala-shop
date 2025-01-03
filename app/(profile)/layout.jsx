import ProfileSidebar from "@/components/pages/profile/ProfileSidebar";
import ClientProvider from "@/providers/ClientProvider";
import { getServerSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function layout({ children }) {
    const { accessToken, refreshToken } = await getServerSession();
    
      if (!accessToken && !refreshToken) {
        redirect("/login");
      }
  return (
    <ClientProvider>
      <main className="mt-[100px] lg:px-3 maxWidth pb-[150px] min-h-screen flex flex-col gap-3 md:flex-row">
        <ProfileSidebar />
        {children}
      </main>
    </ClientProvider>
  );
}
