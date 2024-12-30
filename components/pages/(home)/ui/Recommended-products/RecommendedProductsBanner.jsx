"use client";

import Image from "next/image";

import { motion } from "framer-motion";

export default function RecommendedProductsBanner({ productBanner }) {
  return (
    <>
      {productBanner.map((image, index) => (
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
    </>
  );
}
