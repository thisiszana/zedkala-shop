import Image from "next/image";
import Link from "next/link";

import CategorySection from "./ui/category/CategorySection";
import { images, productBanner, productBanner1 } from "@/constants";
import DiscountProduct from "./ui/discount-product/DiscountProduct";
import RecommendedProductsBanner from "./ui/RecommendedProductsBanner";

export default async function HomePage() {
  return (
    <div>
      <Link
        href="/"
        alt="زد - کالا"
        className="block lg:hidden sm:h-[140px] md:h-[180px]"
      >
        <Image
          className="rounded-[20px] overflow-hidden shadow-lg h-full"
          src={images.shopBanner}
          width={1920}
          height={800}
          alt="بننر"
          priority={true}
        />
      </Link>
      <DiscountProduct />
      <RecommendedProductsBanner productBanner={productBanner} />
      <CategorySection />
      <RecommendedProductsBanner productBanner={productBanner1} />
    </div>
  );
}
