"use client";

import { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import { e2p } from "@/utils/clientFun";
import { motion } from "framer-motion";

function DiscountBadge({ discount, isHovered, showTimerOnly = false }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (discount?.expiresAt) {
      const interval = setInterval(() => {
        const now = new Date();
        const expiration = new Date(discount.expiresAt);
        const diff = expiration - now;

        if (diff <= 0) {
          clearInterval(interval);
          setTimeLeft("۰۰:۰۰:۰۰");
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          setTimeLeft(
            e2p(
              `${days > 0 ? `${String(days).padStart(2, "0")} روز و ` : ""}` +
                `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
                  2,
                  "0"
                )} : ${String(seconds).padStart(2, "0")}`
            )
          );
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [discount?.expiresAt]);

  if (!discount?.value || timeLeft === "۰۰:۰۰:۰۰") return null;

  if (showTimerOnly) {
    return <span className="text-xs text-red-500">{timeLeft}</span>;
  }

  return (
    <div
      className={`absolute top-2 right-2 ${
        discount.title === "شگفت‌انگیزسفارشی"
          ? "bg-pink1 text-pink2"
          : "bg-red-500 text-white"
      } text-xs px-2 py-1 rounded-md flex items-center gap-1`}
    >
      <FaTag size={12} />
      <motion.div
        initial={{ width: 0, opacity: 0, height: 0 }}
        animate={{
          width: isHovered ? "auto" : 0,
          opacity: isHovered ? 1 : 0,
          height: isHovered ? "auto" : 0,
          transition: { type: "spring", stiffness: 100, duration: 0.3 },
        }}
        className="overflow-hidden"
      >
        <span>{discount.title || "تخفیف ویژه"}</span>
      </motion.div>
    </div>
  );
}

export default DiscountBadge;
