"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { ShoppingBag } from "../icons/Icons";

export default function ShoppingBagUILg() {
  const [showShoppingBag, setShowShoppingBag] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 150) {
        setShowShoppingBag(true);
      } else {
        setShowShoppingBag(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const drawerVariants = {
    hidden: { width: "48px" },
    visible: {
      width: "240px",
      transition: { type: "spring", stiffness: 100, duration: 0.5 },
    },
  };

  const iconVariants = {
    hidden: { rotate: 0 },
    visible: {
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.5, repeat: 1 },
    },
  };

  return (
    <Link href="/">
      <motion.div
        className="fixed bottom-6 left-2 flex items-center gap-2 p-2 lg:p-4 rounded-xl shadow-lg overflow-hidden bg-greenIconShopping text-white max-sm:hidden"
        initial="hidden"
        animate={showShoppingBag ? "visible" : "hidden"}
        variants={drawerVariants}
      >
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate={showShoppingBag ? "visible" : "hidden"}
        >
          <ShoppingBag fill="#fff"  />
        </motion.div>

        <span className="pr-2 text-[11px] lg:text-[13px] font-bold whitespace-nowrap overflow-hidden border-r-2">
          سوپرمارکت، تنوع بالا، پرتخفیف
        </span>
      </motion.div>
    </Link>
  );
}
