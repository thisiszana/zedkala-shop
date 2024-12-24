import { fetchBanner } from "@/services/req";
import React from "react";
import BannerSlider from "./BannerSlider";
import BannerSliderSkeleton from "./BannerSliderSkeleton";

export default async function BannerSection() {
  try {
    const { banner } = await fetchBanner();
    return <BannerSlider banner={banner} />;
  } catch (error) {
    console.error("Failed to fetch banners:", error.message);
    return <BannerSliderSkeleton />;
  }
}