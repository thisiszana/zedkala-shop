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

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = usePathname()
  return (
    <header className="bg-white border-b fixed top-0 z-[1000] w-full">
      <div className="maxWidth w-full flex items-center justify-between max-lg:py-4">
        <div className="flex items-center lg:gap-[50px]">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <Image src={images.home_logo} width={100} height={100} alt="لوگو" />
          </Link>
          <SearchBox />
        </div>
        <div className="flex items-center gap-3">
          <Link>{<User />}</Link>

          <ShoppingCart />
        </div>
      </div>
    </header>
  );
}
