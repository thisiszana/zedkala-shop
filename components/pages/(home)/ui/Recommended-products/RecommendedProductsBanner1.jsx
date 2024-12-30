"use client";

import { productBanner1 } from "@/constants";
import { motion } from "framer-motion";

import Image from "next/image";

export default function RecommendedProductsBanner1() {
  return (
    <div className="container mx-auto  mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productBanner1.map((image, index) => (
          <motion.div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: index * 0.2 },
            }}
            viewport={{ once: false }}
          >
            <Image
              className="w-full h-full object-cover"
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
