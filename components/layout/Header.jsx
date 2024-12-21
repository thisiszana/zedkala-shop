"use client";

import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { images } from "@/constants";
import SearchBox from "../shared/SearchBox";
import { ShoppingCart, User } from "../icons/Icons";
import CustomBtn from "../shared/CustomBtn";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUserQuery } from "@/hooks/useUserQuery";
import Loader from "../shared/Loader";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isError, isLoading } = useUserQuery();
  console.log("data in header", data);
  const pathname = usePathname();
  return (
    <header className="bg-white border-b fixed top-0 z-[1000] w-full">
      <div className="maxWidth w-full py-[17px] flex items-center justify-between max-lg:py-4">
        <div className="flex items-center lg:gap-[50px]">
          {/* <MobileNav /> */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={images.home_logo} width={40} height={40} alt="لوگو" />
          </Link>
          <SearchBox />
        </div>
        <div className="flex items-center gap-5">
          <Link
            href={`${data?.user ? "/profile" : "/login"}`}
            className={`iconSize paddingIcon rounded-full hover:bg-gray-100 transition1 border ${
              pathname.includes("/profile")
                ? "border-violet-500 text-violet-600"
                : "text-gray-500 border-transparent"
            }`}
          >
            {data?.user ? (
              <Image
                src={data.user.images || images.avatar}
                width={40}
                height={40}
                alt="لوگو"
                className="rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full">
                <Loader size={5} />
              </div>
            )}
          </Link>

          <ShoppingCart />
        </div>
      </div>
    </header>
  );
}
