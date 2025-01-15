"use client";

import BackBtn from "@/components/shared/BackBtn";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CategorySlider({ product }) {
  const allCategories = [
    { name: "زد کالا", link: "/products" },
    { name: product.categoryName, link: `/products/${product.slug}` },
    ...product.subCategories.map((subCategory) => ({
      name: subCategory.name,
      link: `/products/${subCategory.slug}`,
    })),
    ...product.subCategories.flatMap((subCategory) =>
      subCategory.items.map((item) => ({
        name: item.name,
        link: `/products/${item.slug}`,
      }))
    ),
  ].filter((category) => category.name);

  return (
    <>
      <div className="w-full py-2 fixed top-[65px] left-0 md:static lg:hidden z-10 pb-2 border-b">
        <BackBtn backLink="/products" />
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          className="w-full mr-2"
        >
          {allCategories.map((category, index) => (
            <SwiperSlide key={index} className="mr-2 mt-3" style={{ width: "auto" }}>
              <Link href={category.link} className="text-gray-400 text-[12px]">
                {category.name}
              </Link>
              <span className="mx-1 text-gray-400 text-[12px]">/</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden lg:flex lg:items-center lg:justify-between lg:border-b lg:pb-3">
        <div className="text-lg text-gray-700 flex items-center flex-wrap mx-1 lg:mx-0 mr-2">
          <Link href="/products" className="text-gray-400 text-[12px]">
            زد کالا
          </Link>
          <span className="mx-1 text-gray-400 text-[12px]">/</span>
          {product.categoryName && (
            <Link
              href={`/products/${product.slug}`}
              className="text-gray-400 text-[12px]"
            >
              {product.categoryName}
            </Link>
          )}
          {product.subCategories.length > 0 &&
            product.subCategories.map((subCategory) => (
              <React.Fragment key={subCategory._id}>
                <span className="mx-1 text-gray-400 text-[12px]">/</span>
                <Link
                  href={`/products/${subCategory.slug}`}
                  className="text-gray-400 text-[12px]"
                >
                  {subCategory.name}
                </Link>
                {subCategory.items.length > 0 &&
                  subCategory.items.map((item) => (
                    <div className="flex items-center" key={item._id}>
                      <span className="mx-1 text-gray-400 text-[12px]">/</span>
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-gray-400 text-[12px]"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
              </React.Fragment>
            ))}
        </div>
        <BackBtn backLink="/products" />
      </div>
    </>
  );
}
