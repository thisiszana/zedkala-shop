import ProfileSidebar from "@/components/pages/profile/ProfileSidebar";
import ClientProvider from "@/providers/ClientProvider";
import { getServerSession } from "@/utils/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function layout({ children }) {
    const { accessToken, refreshToken } = await getServerSession();
    
      if (!accessToken && !refreshToken) {
        redirect("/login");
      }
  return (
    <ClientProvider>
      <main className="mt-[100px] px-3 lg:px-0 maxWidth pb-[150px] min-h-screen flex flex-col gap-3 md:flex-row">
        <ProfileSidebar />
        {children}
      </main>
    </ClientProvider>
  );
}
