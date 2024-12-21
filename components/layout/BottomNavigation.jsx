import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { Home, ShoppingBasket, ShoppingCart } from "../icons/Icons";
import { images } from "@/constants";
import Loader from "../shared/Loader";

export default function BottomNavigation({ data }) {
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
    <motion.div
      className="fixed bottom-6 left-3 right-3 backdrop-blur-[5px] bg-dark1 sm:hidden flex justify-around items-center py-5  rounded-xl shadow-lg"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: positions.home?.y || -20,
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
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: positions.products?.y || -20,
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
        <ShoppingCart />
        {pathname === "/cart" && (
          <motion.span
            className="absolute w-10 h-2 bg-cartIcon shadow-cart rounded-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: positions.cart?.y || -20,
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
        href={`${data?.user ? "/profile" : "/login"}`}
        className={`relative text-[22px] flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all ${
          pathname.includes("/profile")
            ? "bg-profileIcon shadow-profileMain text-lightGray"
            : "text-lightGray"
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
          <div className="flex items-center justify-center w-10 h-10">
            <Loader
              size={4}
              color={`${pathname.includes("/profile") ? "black" : "white"}`}
            />
          </div>
        )}
        {pathname.includes("/profile") && (
          <motion.span
            className="absolute w-10 h-2 bg-profileIcon shadow-profile rounded-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: positions.profile?.y || -20,
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
  );
}
