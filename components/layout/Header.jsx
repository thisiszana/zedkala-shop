import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { images } from "@/constants";
import SearchBox from "../shared/SearchBox";

export default function Header() {
  return (
    <header className="bg-white border-b fixed top-0 z-[1000] w-full">
      <div className="maxWidth w-full flex items-center justify-between max-lg:py-4">
        <div className="flex items-center lg:gap-[50px]">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <Image src={images.home_logo} width={100} height={100} alt="لوگو" />
          </Link>
          <SearchBox />
          <DesktopNav />
        </div>
        <div></div>
      </div>
    </header>
  );
}
