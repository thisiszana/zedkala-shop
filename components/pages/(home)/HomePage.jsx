import Image from "next/image";
import Link from "next/link";

import CategorySection from "./ui/category/CategorySection";
import { images } from "@/constants";

export default async function HomePage() {
  return (
    <div>
      <Link href="/" alt="زد - کالا" className="block lg:hidden h-[120px]">
        <Image
          className="rounded-[20px] overflow-hidden shadow-lg h-full"
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
