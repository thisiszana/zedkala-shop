"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Drawer } from "antd";

import { icons, navLinks } from "@/constants";
import CustomBtn from "../shared/CustomBtn";
import { Close } from "../icons/Icons";

export default function MobileNav() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const [key, setKey] = useState(0);

  const closeDrawer = () => setOpenMenu(false);

  const drawerOption = {
    title: (
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1>زد - کالا</h1>{" "}
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
      <motion.ul
        className="space-y-[10px]"
        key={key} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {navLinks.map((item, index) => {
          const { link, title, icon } = item;
          const isActive = pathname === link;
          return (
            <motion.li
              key={title}
              onClick={closeDrawer}
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: index * 0.1, duration: 0.5 }} 
            >
              <Link
                href={link}
                className={`block hover:text-violet-600 hover:border-b-violet-400 transition1 text-[14px] py-[10px] ${
                  isActive
                    ? `bg-violet-50 pr-[15px] border-r-2 border-violet-500 text-violet-600 font-bold w-fit pl-3`
                    : "text-gray-500 border-transparent font-light"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[20px] mr-3 flex">{icon}</span>{" "}
                  <p>{title}</p>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    ),
  };

  useEffect(() => {
    if (openMenu) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [openMenu]);

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
