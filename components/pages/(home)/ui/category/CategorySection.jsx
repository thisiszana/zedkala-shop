"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import CategorySkeleton from "./CategorySkeleton";
import { fetchCategory } from "@/services/req";
import { images } from "@/constants";

export default function CategorySection() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategory();
        setCategory(data.category || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  if (loading) return <CategorySkeleton />;

  return (
    <div className="p-4">
      <h2 className="text-[20px] font-bold mb-6 text-center">
        خرید بر اساس دسته‌بندی
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {category.map((category, index) => (
          <motion.div
            key={category._id}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: index * 0.2 },
            }}
            viewport={{ once: false }}
          >
            <Link
              href={`/categories/${category._id}`}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border">
                <Image
                  src={category?.images?.[0] || images.imageNotFound}
                  width={100}
                  height={100}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-[12px] ">{category.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
