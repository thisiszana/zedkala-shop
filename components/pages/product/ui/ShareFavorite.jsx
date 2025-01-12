"use client";

import { icons } from "@/constants";

export default function ShareFavorite({ productId }) {
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

  return (
    <div className="flex items-center gap-4 text-[16px]">
      <span>{icons.heart}</span>
      <span onClick={handleShare} className="cursor-pointer">{icons.share}</span>
    </div>
  );
}
