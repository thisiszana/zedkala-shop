import { redirect } from "next/navigation";

import { getServerSession } from "@/utils/session";

export default async function AuthLayOut({ children }) {
  const session = await getServerSession();

  if (session) redirect("/");
  return children;
}
