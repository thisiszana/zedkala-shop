"use client";

import NextImage from "next/image";
import { icons, images as img } from "@/constants";
import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { sp } from "@/utils/clientFun";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";
import AddToCart from "@/components/shared/cart/AddToCart";
import DiscountBadge from "./DiscountBadge";
import Link from "next/link";

function ProductCard({ product }) {
  const {
    _id,
    title,
    price,
    images,
    colors,
    categoryName,
    discount,
    stock,
    isGrocery,
    deliveryOptions,
  } = product;

  const [timeLeft, setTimeLeft] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="max-w-xs bg-white hover:shadow-2xl transition overflow-hidden border-t sm:border-r border-gray-200"
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
          className="object-contain w-full h-[150px] z-0"
        />
        <div className="absolute left-2 bottom-[0.1px]">
          {isGrocery?.value && (
            <AddToCart
              productId={_id}
              stock={stock}
              className="flex items-center gap-2 bg-white/80 rounded-[8px] overflow-hidden"
            />
          )}
        </div>
        <DiscountBadge discount={discount} isHovered={isHovered} />

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
        {colors.length > 0 && (
          <div className="flex flex-col space-y-2 absolute left-3 top-[15px]">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-[6px] h-[6px] rounded-full border-[0.5px] border-dark1"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-xs text-gray-500">{categoryName}</p>
        <div className="flex items-center justify-between w-full">
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
          <Link
            href={`product/${_id}`}
            className="text-red-500 border border-red-500 rounded-md text-[12px] px-2 py-1 transition-all hover:bg-red-500 hover:text-white"
          >
            جزئیات
          </Link>
        </div>
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
          <DiscountBadge discount={discount} showTimerOnly />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
