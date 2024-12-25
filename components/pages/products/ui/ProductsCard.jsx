"use client";

import NextImage from "next/image";
import { icons, images as img } from "@/constants";
import { useEffect, useState } from "react";
import { FaTag, FaShoppingBasket } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { e2p, sp } from "@/utils/clientFun";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";

function ProductCard({ product }) {
  const {
    title,
    price,
    images,
    categoryName,
    discount,
    stock,
    isGrocery,
    deliveryOptions,
  } = product;

  const [timeLeft, setTimeLeft] = useState("");
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div
      className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          as={NextImage}
          src={images[0] || img.imageNotFound}
          alt={title}
          width={400}
          height={300}
          className="object-contain w-full h-[150px]"
        />
        <div className="absolute left-2 bottom-[0.1px] ">
          <BsPlusCircle className="text-green-500 text-xl bg-white cursor-pointer" />
        </div>
        {discount?.value > 0 && timeLeft !== "۰۰:۰۰:۰۰" && (
          <div
            className={`absolute top-2 right-2 ${
              discount.title === "شگفت‌انگیزسفارشی"
                ? "bg-pink1 text-pink2"
                : "bg-red-500 text-white"
            }  text-xs px-2 py-1 rounded-md flex items-center gap-1`}
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
        )}

        {isGrocery?.value && (
          <motion.div
            className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1"
            animate={{
              rotate: isHovered ? [0, 15, -15, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: 1 }}
          >
            <FaShoppingBasket size={12} />
          </motion.div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-xs text-gray-500">{categoryName}</p>
        {stock ? (
          stock > 3 ? (
            <div className="flex items-center gap-2 text-green-500">
              <span>{icons.aviable}</span>
              <p className="text-xs text-green-500">موجود در انبار زد کالا</p>
            </div>
          ) : (
            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-xs text-red-500"
            >
              {`تنها ${stock} عدد باقی مانده!`}
            </motion.p>
          )
        ) : (
          <p className="text-xs text-red-500">ناموجود</p>
        )}
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-gray-800">
            {sp(
              discount?.value > 0
                ? Math.floor(price * (1 - discount.value / 100))
                : price
            )}{" "}
            <span className="text-[10px]">تومان</span>
          </p>
          {discount?.value > 0 && timeLeft !== "۰۰:۰۰:۰۰" && (
            <p className="text-sm line-through text-gray-500">
              {sp(price)} <span className="text-[10px]">تومان</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            {deliveryOptions?.freeDelivery && (
              <span className="flex items-center gap-1 text-[22px] text-green-500">
                {icons.freeDelivery}
              </span>
            )}
            {deliveryOptions?.fastDelivery && (
              <span className="flex items-center gap-1 text-[22px] text-red-500">
                {icons.fastDelivery}
              </span>
            )}
          </div>
          {discount?.expiresAt && timeLeft !== "۰۰:۰۰:۰۰" && (
            <div className="flex items-center">
              <span className="text-xs text-red-500">{timeLeft}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
