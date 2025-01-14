"use client";

import Loader from "@/components/shared/Loader";
import { icons } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useUserQuery } from "@/hooks/useUserQuery";
import { MESSAGES } from "@/messages/messages";
import { fetchEditUserInfo } from "@/services/req";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ShareFavorite({ productId }) {
  const { user, userData } = useAuth();
  const { accessToken } = user || "";

  useEffect(() => {
    if (accessToken) useUserQuery(accessToken);
  }, [accessToken]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (userData?.user?.favoriteProducts) {
      const isAvailableProduct =
        userData.user.favoriteProducts.includes(productId);
      setIsFavorite(isAvailableProduct);
      setIsLoading(false);
    }
  }, [userData, productId]);

  const handleShare = async () => {
    const productUrl = `${window.location.origin}/product/${productId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "اشتراک‌گذاری محصول",
          text: "این محصول عالی را ببینید!",
          url: productUrl,
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(productUrl);
        alert("لینک محصول کپی شد!");
      } catch (error) {
        console.error("Error copying link:", error);
      }
    }
  };

  const handleAddFavoriteProduct = async () => {
    if (!productId) {
      toast.error(MESSAGES.productIdNotFound);
      return;
    }

    const action = isFavorite ? "remove" : "add";
    setIsLoading(true);
    const res = await fetchEditUserInfo({
      accessToken,
      data: { productId, action },
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
    <div className="flex items-center gap-4 text-[16px]">
      {isLoading ? (
        <Loader size={4} />
      ) : (
        <span
          onClick={handleAddFavoriteProduct}
          className={`cursor-pointer p-2 rounded-full ${
            isFavorite ? "bg-mainRed text-white" : "bg-gray-200"
          }`}
        >
          {isFavorite ? icons.heartFill : icons.heart}
        </span>
      )}

      <span onClick={handleShare} className="cursor-pointer">
        {icons.share}
      </span>
    </div>
  );
}
