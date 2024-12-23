import { useState, useEffect } from "react";

import { Drawer } from "antd";

import { RightAngle, Search } from "../icons/Icons";

import CustomBtn from "./CustomBtn";
import CustomInp from "./CustomInp";

export default function SearchWithModal() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="relative mx-auto sm:hidden">
        <div
          className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-gray-500 text-sm cursor-pointer"
          onClick={toggleDrawer}
        >
          <Search />
          <span className="flex">
            جستجو در{" "}
            <span className="text-red-600 font-bold mr-4">زد - کالا</span>
          </span>
        </div>
      </div>

      <Drawer
        open={isDrawerOpen}
        placement="bottom"
        closable={false}
        onClose={() => setIsDrawerOpen(false)}
        height="100%"
        className="custom-drawer"
      >
        <div className="relative p-4">
          <div className="flex items-center mb-4">
            <CustomBtn
              type="button"
              icon={<RightAngle />}
              onClick={() => setIsDrawerOpen(false)}
              classNames="text-gray-500 hover:text-gray-700 ml-5"
            />
            <CustomInp
              type="text"
              wrapperClassName="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              label="جستجو کنید..."
            />
          </div>
          <div className="text-gray-500 text-sm">
            می‌توانید هر چیزی که نیاز دارید اینجا جستجو کنید.
          </div>
        </div>
      </Drawer>
    </>
  );
}
