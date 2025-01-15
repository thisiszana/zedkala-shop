import BannerSliderSkeleton from "./BannerSliderSkeleton";
import { fetchBanner } from "@/services/req";
import BannerSlider from "./BannerSlider";

export default async function BannerSection() {
  try {
    const { banner } = await fetchBanner();
    return <BannerSlider banner={banner} />;
  } catch (error) {
    console.error("Failed to fetch banners:", error.message);
    return <BannerSliderSkeleton />;
  }
}
