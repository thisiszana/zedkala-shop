import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { Home, ShoppingBasket, ShoppingCart } from "../icons/Icons";
import { images } from "@/constants";
import Loader from "../shared/Loader";
import ShoppingBagUI from "./ShoppingBagUI";

export default function BottomNavigation({
  userData,
  isLoading,
  userLoading,
  totalProduct,
}) {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setPrevPath(pathname);
    }
  }, [pathname]);

  const positions = {
    home: { x: 0, y: -36.5 },
    products: { x: 0, y: -36.5 },
    profile: { x: 0, y: -36.5 },
    cart: { x: 0, y: -36.5 },
  };

  return (
    <>
      <motion.div
        className="fixed bottom-1 left-3 right-3 z-30 backdrop-blur-[5px] bg-dark1 sm:hidden flex justify-around items-center py-5 rounded-xl shadow-md"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link
          href="/"
          className={`relative text-[22px] flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all ${
            pathname === "/"
              ? "bg-homeIcon shadow-homeMain text-dark1"
              : "text-lightGray"
          }`}
        >
          <Home />
          {pathname === "/" && (
            <motion.span
              className="absolute w-10 h-2 bg-homeIcon shadow-home rounded-full"
              initial={{ opacity: 0, y: -20, scaleX: 0 }}
              animate={{
                opacity: 1,
                y: positions.home?.y || -20,
                scaleX: 1,
                transition: {
                  duration: 1,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
              whileHover={{ scale: 1.2 }}
            ></motion.span>
          )}
        </Link>
        <Link
          href="/products"
          className={`relative text-[22px] flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all ${
            pathname === "/products"
              ? "bg-productsIcon shadow-productsMain text-lightGray"
              : "text-lightGray"
          }`}
        >
          <ShoppingBasket />
          {pathname === "/products" && (
            <motion.span
              className="absolute w-10 h-2 bg-productsIcon shadow-products rounded-full"
              initial={{ opacity: 0, y: -20, scaleX: 0 }}
              animate={{
                opacity: 1,
                y: positions.products?.y || -20,
                scaleX: 1,
                transition: {
                  duration: 1,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            ></motion.span>
          )}
        </Link>
        <Link
          href="/cart"
          className={`relative text-[22px] flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all ${
            pathname === "/cart"
              ? "bg-cartIcon shadow-cartMain text-lightGray"
              : "text-lightGray"
          }`}
        >
          {userLoading ? <Loader size={4} color="#000" /> : <ShoppingCart />}
          {totalProduct > 0 && (
            <div className="w-[17px] h-[17px] flex items-center justify-center text-[10px] absolute bottom-8 -left-[10px] lg:bottom-8 bg-red-600 text-white rounded-full">
              {totalProduct}
            </div>
          )}
          {pathname === "/cart" && (
            <motion.span
              className="absolute w-10 h-2 bg-cartIcon shadow-cart rounded-full"
              initial={{ opacity: 0, y: -20, scaleX: 0 }}
              animate={{
                opacity: 1,
                y: positions.cart?.y || -20,
                scaleX: 1,
                transition: {
                  duration: 1,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            ></motion.span>
          )}
        </Link>
        <Link
          href={`${userData?.user ? "/profile/profile-info" : "/login"}`}
          className={`relative text-[22px] flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all ${
            pathname.includes("/profile")
              ? "bg-profileIcon shadow-profileMain text-lightGray"
              : "text-lightGray"
          }`}
        >
          {isLoading && userData ? (
            <div className="flex items-center justify-center w-10 h-10">
              <Loader
                size={4}
                color={`${pathname.includes("/profile") ? "black" : "white"}`}
              />
            </div>
          ) : (
            <Image
              src={userData?.user?.images || images.avatar}
              width={40}
              height={40}
              alt="لوگو"
              className="rounded-full"
            />
          )}
          {pathname.includes("/profile") && (
            <motion.span
              className="absolute w-10 h-2 bg-profileIcon shadow-profile rounded-full"
              initial={{ opacity: 0, y: -20, scaleX: 0 }}
              animate={{
                opacity: 1,
                y: positions.profile?.y || -20,
                scaleX: 1,
                transition: {
                  duration: 1,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            ></motion.span>
          )}
        </Link>
      </motion.div>
      <ShoppingBagUI />
    </>
  );
}
