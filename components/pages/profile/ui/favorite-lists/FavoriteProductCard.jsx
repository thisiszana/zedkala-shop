"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { motion } from "framer-motion";

import DiscountBadge from "@/components/pages/products/ui/DiscountBadge";
import AddToCartInfo from "@/components/shared/cart/AddToCartInfo";
import { icons, images as img } from "@/constants";
import { sp } from "@/utils/clientFun";
import { Trash } from "@/components/icons/Icons";
import { fetchEditUserInfo } from "@/services/req";
import { useAuth } from "@/context/AuthContext";
import { useUserQuery } from "@/hooks/useUserQuery";
import Loader from "@/components/shared/Loader";
import toast from "react-hot-toast";
import { MESSAGES } from "@/messages/messages";

export default function FavoriteProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { user, userData } = useAuth();
  const { accessToken } = user || "";
  useUserQuery(accessToken);

  const deleteProductOfList = async () => {
    setIsLoading(true);

    const res = await fetchEditUserInfo({
      accessToken,
      data: { productId: product._id, action: "remove" },
      id: userData?.user._id,
    });

    if (res.success === true) {
      setIsLoading(false);
      toast.success(
        isFavorite
          ? MESSAGES.deleteFavoriteproduct
          : MESSAGES.addFavoriteproduct
      );
      setIsFavorite(!isFavorite);
    } else {
      toast.error(res.message || "مشکلی پیش آمد.");
    }
  };
  return (
    <div
      key={product._id}
      className="max-w-xs bg-white hover:shadow-2xl transition overflow-hidden border-t sm:border-r border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src={product.images[0] || img.imageNotFound}
          alt={product.title}
          width={400}
          height={300}
          className="object-contain w-full h-[150px] z-0"
        />
        <DiscountBadge discount={product.discount} isHovered={isHovered} />
      </div>
      <div className="p-2 space-y-2">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <div className="flex items-center justify-between w-full">
          {product.stock ? (
            product.stock > 3 ? (
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
                {`تنها ${product.stock} عدد باقی مانده!`}
              </motion.p>
            )
          ) : (
            <p className="text-xs text-red-500">ناموجود</p>
          )}
          <Link
            href={`product/${product._id}`}
            className="text-red-500 border border-red-500 rounded-md text-[12px] px-2 py-1 transition-all hover:bg-red-500 hover:text-white"
          >
            جزئیات
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-gray-800">
            {sp(
              product.discount?.value > 0
                ? Math.floor(product.price * (1 - product.discount.value / 100))
                : product.price
            )}{" "}
            <span className="text-[10px]">تومان</span>
          </p>
          {product.discount?.value > 0 && (
            <p className="text-sm line-through text-gray-500">
              {sp(product.price)} <span className="text-[10px]">تومان</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 px-2 mb-3">
        <span
          className="inline-flex items-center px-2 py-1 border rounded cursor-pointer h-[40px]"
          onClick={deleteProductOfList}
        >
          {isLoading ? (
            <Loader size={3} color="red" />
          ) : (
            <Trash className="text-mainRed" />
          )}
        </span>
        <AddToCartInfo
          isGrocery={product.isGrocery?.value}
          productId={product._id}
          stock={product.stock}
        />
      </div>
    </div>
  );
}
