"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "../icons/Icons";
import Link from "next/link";

export default function ShoppingBagUI() {
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

  const iconVariants = {
    hidden: { rotate: 0 },
    visible: {
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.5, repeat: 1 },
    },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      background: [
        "linear-gradient(90deg, #3b82f6, #22c55e)",
        "linear-gradient(90deg, #22c55e, #9333ea)",
        "linear-gradient(90deg, #9333ea, #3b82f6)",
      ],
      transition: { duration: 4, repeat: Infinity, repeatType: "reverse" },
    },
  };

  return (
    <Link href="/">
      <motion.div
        className="fixed bottom-[110px] left-3 flex items-center gap-2 p-2 rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: showShoppingBag ? 1 : 0,
          y: showShoppingBag ? 0 : 100,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg -z-10"
          variants={backgroundVariants}
          initial="hidden"
          animate={showShoppingBag ? "visible" : "hidden"}
        ></motion.div>

        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate={showShoppingBag ? "visible" : "hidden"}
        >
          <ShoppingBag fill="#fff" />
        </motion.div>
        <span className="border-r-2 border-dark1 pr-2 text-[12px] font-bold text-white">
          سوپرمارکت، تنوع بالا، پرتخفیف
        </span>
      </motion.div>
    </Link>
  );
}
