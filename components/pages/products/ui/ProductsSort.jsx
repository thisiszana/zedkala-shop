"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { icons, sortOptions } from "@/constants";

export default function ProductsSort() {
  const [activeSort, setActiveSort] = useState("پر بازدیدترین");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSort = (option) => {
    setActiveSort(option);
    setIsMenuOpen(false);
  };

  return (
    <div className="border-b pb-2">
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium flex items-center gap-2">
            {icons.sort}
            مرتب سازی:
          </span>
          <motion.ul
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {sortOptions.map((option, index) => (
              <motion.li
                key={option}
                onClick={() => handleSort(option)}
                className={`cursor-pointer text-[14px] ${
                  activeSort === option
                    ? "text-green-600 border-b border-green-600 pb-1"
                    : "text-gray-600"
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <span className="text-[14px]">تعداد محصول</span>
      </div>

      <div className="relative md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-gray-600"
        >
          {icons.sort}
          <span className="text-[14px]">{activeSort}</span>
        </button>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg w-[130px] z-20 md:hidden"
            >
              {sortOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setActiveSort(option);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-[14px] ${
                    activeSort === option ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {activeSort === option ? (
                    <span className="flex items-center gap-2">
                      {option}
                      {icons.check}
                    </span>
                  ) : (
                    option
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
