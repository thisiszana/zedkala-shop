"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RecommendedProductsBanner({ productBanner }) {
  const numberOfImages = productBanner.length;

  const gridColumns = numberOfImages === 1
    ? "grid-cols-1"
    : numberOfImages === 2
    ? "grid-cols-2"
    : numberOfImages === 3
    ? "grid-cols-3"
    : "grid-cols-4"; 

  return (
    <div className="container mx-auto mt-5">
      <div className={`grid ${gridColumns} gap-6`}>
        {productBanner.map((image, index) => (
          <motion.div
            key={index}
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
