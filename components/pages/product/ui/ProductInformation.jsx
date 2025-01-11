"use client";

import { Modal } from "antd";
import React, { useRef, useState } from "react";
import Image from "next/image";
import AddToCartInfo from "@/components/shared/cart/AddToCartInfo";
import { icons, images } from "@/constants";
import ProductSpecifications from "./ProductSpecifications";
import Link from "next/link";
import SidebarProduct from "./SidebarProduct";
import ImagePreview from "./ImagePreview";
import InsuranceCard from "./InsuranceCard";
import DeliveryOptions from "./DeliveryOptions";
import SelectColorAndSize from "./SelectColorAndSize";
import DescriptionProductInfo from "./DescriptionProductInfo";

export default function ProductInformation({ product }) {
  const targetRef = useRef(null);

  const handleShowAll = () => {
    setTimeout(() => {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  console.log(product);
  return (
    <div className="flex flex-col">
      <div className="text-lg text-gray-700 flex items-center border-b pb-3 flex-wrap mx-5 lg:mx-0">
        {product.categoryName && (
          <Link href={product.slug} className="text-gray-400 text-[12px]">
            {product.categoryName}
          </Link>
        )}
        {product.subCategories.length > 0 &&
          product.subCategories.map((subCategory, index) => (
            <React.Fragment key={subCategory._id}>
              <span className="mx-2 text-gray-400 text-[12px]">/</span>
              <Link
                href={subCategory.slug}
                className="text-gray-400 text-[12px]"
              >
                {subCategory.name}
              </Link>
            </React.Fragment>
          ))}
      </div>
      <div className="p-4 md:p-6 lg:p-8 flex justify-between flex-col lg:flex-row gap-6 relative">
        <ImagePreview product={product} />

        <div className="space-y-6 w-full lg:w-[65%]">
          <div className="flex flex-col gap-3 md:w-[65%]">
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
            {product.description && (
              <div className="flex gap-2 mt-3">
                <h3 className="text-lg font-medium mb-2">{icons.info}</h3>
                <p className="text-[14px] text-gray-600">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-3 border-t w-full md:w-[65%]">
              <InsuranceCard insurance={product.insurance} />
              <ProductSpecifications
                specifications={product.specifications}
                handleShowAll={handleShowAll}
              />

              <SelectColorAndSize product={product} />

              {product.returnPolicy && (
                <div className="flex gap-2 mt-3">
                  <h3 className="text-lg font-medium mb-2">
                    {icons.important}
                  </h3>
                  <p className="text-sm md:text-[12px] text-gray-600 text-justify">
                    {product.returnPolicy}
                  </p>
                </div>
              )}

              {product.deliveryOptions.freeDelivery && (
                <div className="flex items-center justify-between px-[10px] py-2 rounded-[8px] border">
                  <p className=" text-gray-600 text-[12px] mdtext-[14px] font-bold">
                    ارسال رایگان این کالا
                  </p>
                  <Image
                    src="/icon/free-delivery.svg"
                    width={100}
                    height={100}
                    alt="آیکون"
                  />
                </div>
              )}
            </div>

            <SidebarProduct product={product} />
          </div>
        </div>
      </div>
      <DeliveryOptions />
      <DescriptionProductInfo product={product} targetRef={targetRef} />
    </div>
  );
}
