import { fetchBanner } from "@/services/req";
import React from "react";
import BannerSlider from "./BannerSlider";

export default async function BannerSection() {
  const { banner } = await fetchBanner();
  return <BannerSlider banner={banner} />;
}
