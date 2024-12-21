"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

import { Drawer } from "antd";

import { Close, MenuBars, MenuDots } from "../icons/Icons";
import CustomBtn from "../shared/CustomBtn";
import { icons, navLinks } from "@/constants";

export default function MobileNav() {
  const [openMenu, setOpenMenu] = useState(false);

  const pathname = usePathname();

  const closeDrawer = () => setOpenMenu(false);

  const drawerOption = {
    title: (
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1>زدکالا</h1>{" "}
        </Link>
        <CustomBtn
          type="button"
          icon={<Close size={14} />}
          classNames="iconSize"
          onClick={closeDrawer}
        />
      </div>
    ),
    styles: {
      body: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "20px",
      },
    },
    drawerContent: (
      <ul className="space-y-[10px]">
        {navLinks.map((item) => {
          const { link, title, icon } = item;
          const isActive = pathname === link;
          return (
            <li key={title} onClick={closeDrawer}>
              <Link
                href={link}
                className={`block hover:text-violet-600 hover:border-b-violet-400 transition1 text-[14px] py-[10px] ${
                  isActive
                    ? "bg-violet-50 pr-[15px] border-r-2 border-violet-500 text-violet-600 font-bold w-fit pl-3"
                    : "text-gray-500 border-transparent font-light"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[20px] mr-3 flex">{icon}</span>{" "}
                  <p>{title}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    ),
  };
  return (
    <>
      <CustomBtn
        type="button"
        classNames="iconSize lg:hidden paddingIcon mr-4"
        icon={icons.menuBars}
        onClick={() => setOpenMenu(true)}
      />
      <Drawer
        title={drawerOption.title}
        styles={drawerOption.styles}
        placement="left"
        open={openMenu}
        closeIcon={false}
        width={230}
      >
        {drawerOption.drawerContent}
      </Drawer>
    </>
  );
}
