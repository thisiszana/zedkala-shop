import { usePathname } from "next/navigation";
import Link from "next/link";

import { navLinks } from "@/constants";

export default function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="max-lg:hidden">
      <ul className="flex items-center gap-[30px]">
        {navLinks.map((el) => {
          const { link, title, icon } = el;
          const isActive = pathname === link;
          return (
            <li key={title}>
              <Link
                href={link}
                className={`block hover:text-violet-600 hover:border-b-violet-400 transition1 font-light text-[14px] py-[5px] border-b-2 border-t-2 border-t-transparent ${
                  isActive
                    ? "border-mainRed text-secondaryRed"
                    : "text-gray-500 border-transparent"
                }`}
              >
                <div className="flex justify-center items-center">
                  <span className="text-[20px] ml-3">{icon}</span>
                  <p>{title}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
