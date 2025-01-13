"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { motion } from "framer-motion";

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
            <li key={title} className="relative">
              <Link
                href={link}
                className="block font-light text-[14px] py-[5px]"
              >
                <div className="flex justify-center items-center hover:text-secondaryRed transition-colors">
                  <span className="text-[20px] ml-3">{icon}</span>
                  <p>{title}</p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-mainRed"
                  initial={{ width: isActive ? "100%" : "0%" }}
                  animate={{ width: isActive ? "100%" : "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
