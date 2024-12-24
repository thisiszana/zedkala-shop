import Link from "next/link";
import { images } from "@/constants";
import Image from "next/image";
import CategorySection from "./ui/category/CategorySection";
import { Suspense } from "react";
import CategorySkeleton from "./ui/category/CategorySkeleton";

export default async function HomePage() {
  return (
    <div>
      <Link href="/" alt="زد - کالا" className="block lg:hidden">
        <Image
          className="rounded-[20px] overflow-hidden shadow-lg"
          src={images.shopBanner}
          width={1920}
          height={800}
          alt="بننر"
          priority={true}
        />
      </Link>
      <CategorySection />
    </div>
  );
}
