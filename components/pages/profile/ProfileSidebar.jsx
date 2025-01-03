"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { icons, personalInfoSidebar } from "@/constants";
import { useUserQuery } from "@/hooks/useUserQuery";
import Loader from "@/components/shared/Loader";

export default function ProfileSidebar() {
  const path = usePathname();

  const { userData, isPending } = useUserQuery();

  return (
    <div className="w-full md:w-[280px] border rounded-[10px] py-4 pl-[20px] h-fit shadow-md">
      {isPending ? (
        <div className="flex justify-center py-10">
          <Loader size={8} />
        </div>
      ) : (
        <>
          <div className="pr-[16px]">
            <span className="text-[14px] font-bold">
              {userData?.user?.displayName || "نام کاربر"}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[14px] my-2 inline-block">
                {userData?.user?.phoneNumber || "شماره تلفن ثبت نشده"}
              </span>
              <Link href="/profile/personal-info" className="text-blue-400">
                {icons.edit}
              </Link>
            </div>
          </div>
        </>
      )}
      <div>
        {personalInfoSidebar.map((el) => {
          const fullPath = `/profile${el.pathname}`;
          const isActive =
            path === fullPath || (path === "/profile" && el.pathname === "");

          return (
            <Link
              href={fullPath}
              key={el.id}
              className={`flex items-center gap-3 border-t py-3 pr-[16px] ${
                isActive ? "border-r-4 border-r-mainRed font-bold" : ""
              }`}
            >
              <span>{el.icon}</span>
              <span className="text-[14px]">{el.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
