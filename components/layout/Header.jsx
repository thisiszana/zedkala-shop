"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import BottomNavigation from "./BottomNavigation";
import ShoppingBagUILg from "./ShoppingBagUILg";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart } from "../icons/Icons";
import SearchBox from "../shared/SearchBox";
import Loader from "../shared/Loader";
import DesktopNav from "./DesktopNav";
import { images } from "@/constants";
import MobileNav from "./MobileNav";
import { useUserCart } from "@/hooks/useUserQuery";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { logout, user, isLoading, userData } = useAuth();
  const { accessToken } = user || "";

  const { data, userLoading } = useUserCart(accessToken);
  const { userCart } = data || {};

  const totalProduct = userCart?.cart?.totalProductsCount;

  const pathname = usePathname();
  return (
    <>
      <header className="backdrop-blur-[5px] bg-white/70 border-b-2 fixed top-0 z-[1000] w-full mb-[60px]">
        <div className="maxWidth w-full py-[17px] flex items-center justify-between max-sm:py-2">
          <div className="flex items-center lg:gap-[50px] max-sm:justify-between max-sm:w-full max-sm:mx-4 max-sm:flex-row-reverse">
            <MobileNav />
            <Link href="/" className="flex items-center gap-2 max-sm:hidden">
              <Image
                src={images.home_logo}
                width={40}
                height={40}
                alt="لوگو"
                priority={true}
              />
            </Link>
            <SearchBox />
            <DesktopNav />
          </div>
          <div className="flex items-center gap-5 ml-4 max-sm:hidden relative">
            <Link
              href={`${userData?.user ? "/profile" : "/login"}`}
              className={`iconSize paddingIcon rounded-full hover:bg-gray-100 transition1 ${
                pathname.includes("/profile")
                  ? "text-secondaryRed"
                  : "text-gray-500"
              } rotating-border`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full max-lg:w-[20px] max-lg:h-[20px]">
                  <Loader size={5} />
                </div>
              ) : (
                <Image
                  src={userData?.user?.images || images.avatar}
                  width={40}
                  height={40}
                  alt="لوگو"
                  className="rounded-full max-lg:w-[20px] max-lg:h-[20px]"
                />
              )}
            </Link>

            {userLoading ? (
              <Loader size={4} color="#000" />
            ) : (
              <Link href="/checkout/cart">
                <ShoppingCart />
              </Link>
            )}
            {totalProduct > 0 && (
              <div className="w-[17px] h-[17px] flex items-center justify-center text-[10px] absolute bottom-6 -left-[10px] lg:bottom-8 bg-red-600 text-white rounded-full">
                {totalProduct}
              </div>
            )}
          </div>
        </div>
      </header>
      <ShoppingBagUILg />
      <BottomNavigation
        userData={userData}
        isLoading={isLoading}
        userLoading={userLoading}
        totalProduct={totalProduct}
      />
    </>
  );
}
