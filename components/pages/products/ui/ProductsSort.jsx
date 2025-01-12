"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { icons, sortOptions } from "@/constants";
import { e2p } from "@/utils/clientFun";

export default function ProductsSort({
  refetch,
  setSort,
  totalProducts,
  sort,
}) {
  const [activeSort, setActiveSort] = useState(
    sortOptions[sort - 1].title || "جدیدترین"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSort = (option) => {
    setActiveSort(option);
    setIsMenuOpen(false);
  };

  return (
    <div className="border-b pb-2 mx-6 lg:mx-0 mt-[70px] sm:mt-[100px]">
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium text-[15px] flex items-center gap-2">
            {icons.sort}
            مرتب سازی :
          </span>
          <motion.ul
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {sortOptions.map((option, index) => (
              <motion.li
                key={option.sort}
                onClick={() => {
                  handleSort(option.title);
                  setSort(option.sort);
                  refetch();
                }}
                className={`cursor-pointer text-[14px] ${
                  activeSort === option.title
                    ? "text-green-600 border-b border-green-600 pb-1"
                    : "text-gray-600"
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {option.title}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <span className="text-[12px] text-dark1 px-1 text-center">
          {e2p(totalProducts)} کالا
        </span>
      </div>

      <div className="relative md:hidden flex items-center justify-between">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-gray-600"
        >
          {icons.sort}
          <span className="text-[14px]">{activeSort}</span>
        </button>
        <span className="text-[12px] text-dark1 px-1 text-center">
          {e2p(totalProducts)} کالا
        </span>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg w-[150px] z-20 md:hidden"
            >
              {sortOptions.map((option) => (
                <li
                  key={option.sort}
                  onClick={() => {
                    setActiveSort(option.title);
                    setSort(option.sort);
                    refetch();
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-[14px] ${
                    activeSort === option.title
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {activeSort === option.title ? (
                    <span className="flex items-center gap-2">
                      {option.title}
                      {icons.check}
                    </span>
                  ) : (
                    option.title
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
