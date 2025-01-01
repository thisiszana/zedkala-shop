"use client";

import { Modal } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import AddToCartInfo from "@/components/shared/cart/AddToCartInfo";
import { icons } from "@/constants";
import ProductSpecifications from "./ProductSpecifications";
import CustomBtn from "@/components/shared/CustomBtn";
import { LeftAngle } from "@/components/icons/Icons";
import Link from "next/link";
import SidebarProduct from "./SidebarProduct";

export default function ProductInformation({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || null);
  
  return (
    <div className="p-4 md:p-6 lg:p-8 flex justify-between flex-col lg:flex-row gap-6 relative">
      <div className="w-full lg:w-[30%]">
        <div className=" mb-4 relative">
          <Image
            src={product.images[0]}
            width={600}
            height={600}
            alt={product.title}
            preview={{
              mask: (
                <div className="flex items-center justify-center h-full rounded-[8px] text-white">
                  مشاهده
                </div>
              ),
            }}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {product.images.map((img, index) => (
            <div key={index} className="relative group">
              <Image
                src={img}
                width={80}
                height={80}
                alt={`Thumbnail ${index + 1}}
                preview={{
                  mask: (
                    <div className="flex items-center justify-center h-full bg-black/50 text-white">
                      مشاهده
                    </div>
                  ),
                }`}
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover cursor-pointer border hover:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 w-full lg:w-[70%]">
        <div className="flex flex-col gap-3 md:w-[70%]">
          <div className="text-lg text-gray-700 flex items-center border-b pb-3">
            {product.categoryName && (
              <Link
                href={`/category/${product.categoryName}`}
                className="text-gray-400 text-[12px]"
              >
                {product.categoryName}
              </Link>
            )}
            {product.subCategories.length > 0 &&
              product.subCategories.map((subCategory, index) => (
                <React.Fragment key={subCategory._id}>
                  <span className="mx-2 text-gray-400 text-[12px]">/</span>
                  <Link
                    href={`/category/${product.categoryName}/${subCategory.name}`}
                    className="text-gray-400 text-[12px]"
                  >
                    {subCategory.name}
                  </Link>
                </React.Fragment>
              ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-700">
            {product.keywords.map((key, index) => (
              <span key={index} className="flex items-center mb-2">
                <p className="truncate font-bold text-[#19bfd3] cursor-pointer">
                  {key}
                </p>
                {index < product.keywords.length - 1 && (
                  <span className="pr-1 text-gray-300">/</span>
                )}
              </span>
            ))}
          </div>
          <h1 className="text-h4 font-bold">{product.title}</h1>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 border-t md:w-[70%]">
            <ProductSpecifications specifications={product.specifications} />
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-[16px] font-medium mb-2">انتخاب رنگ :</h3>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <CustomBtn
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      classNames={`w-6 h-6  rounded-full border-2 ${
                        selectedColor === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-[16px] font-medium mb-2">انتخاب سایز :</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size, index) => (
                    <CustomBtn
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      classNames={`px-2 py-1 rounded border ${
                        selectedSize === size
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      title={size}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.returnPolicy && (
              <div className="flex gap-2 mt-3">
                <h3 className="text-lg font-medium mb-2">{icons.important}</h3>
                <p className="text-sm md:text-[12px] text-gray-600">
                  {product.returnPolicy}
                </p>
              </div>
            )}
          </div>

          <SidebarProduct product={product} />
        </div>
      </div>
    </div>
  );
}
