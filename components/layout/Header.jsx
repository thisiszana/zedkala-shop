"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { useUserQuery } from "@/hooks/useUserQuery";
import BottomNavigation from "./BottomNavigation";
import { ShoppingCart } from "../icons/Icons";
import SearchBox from "../shared/SearchBox";
import Loader from "../shared/Loader";
import DesktopNav from "./DesktopNav";
import { images } from "@/constants";
import MobileNav from "./MobileNav";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isError, isPending, isLoading } = useUserQuery();
console.log(data)
  const pathname = usePathname();
  return (
    <header className="bg-white border-b fixed top-0 z-[1000] w-full">
      <div className="maxWidth w-full py-[17px] flex items-center justify-between max-sm:py-2">
        <div className="flex items-center lg:gap-[50px] max-sm:justify-between max-sm:w-full max-sm:ml-4">
          <MobileNav />
          <div className="flex items-center gap-2 max-sm:flex-row-reverse">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={images.home_logo}
                width={40}
                height={40}
                alt="لوگو"
                priority={true}
              />
            </Link>
            <SearchBox />
          </div>
          <DesktopNav />
        </div>
        <div className="flex items-center gap-5 ml-4 max-sm:hidden">
          <Link
            href={`${data?.user ? "/profile" : "/login"}`}
            className={`iconSize paddingIcon rounded-full hover:bg-gray-100 transition1 ${
              pathname.includes("/profile")
                ? "text-violet-600"
                : "text-gray-500"
            } rotating-border`}
          >
            {isPending && data ? (
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full max-lg:w-[20px] max-lg:h-[20px]">
                <Loader size={5} />
              </div>
            ) : (
              <Image
                src={data?.user?.images || images.avatar}
                width={40}
                height={40}
                alt="لوگو"
                className="rounded-full max-lg:w-[20px] max-lg:h-[20px]"
              />
            )}
          </Link>

          <ShoppingCart />
        </div>
      </div>
      <BottomNavigation data={data} isPending={isPending} />
    </header>
  );
}
