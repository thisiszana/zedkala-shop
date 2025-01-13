"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { icons, images } from "@/constants";
import ProductSpecifications from "./ProductSpecifications";
import Link from "next/link";
import SidebarProduct from "./SidebarProduct";
import ImagePreview from "./ImagePreview";
import InsuranceCard from "./InsuranceCard";
import DeliveryOptions from "./DeliveryOptions";
import SelectColorAndSize from "./SelectColorAndSize";
import DescriptionProductInfo from "./DescriptionProductInfo";
import ShareFavorite from "./ShareFavorite";
import ShippingInfo from "./ShippingInfo";
import BackBtn from "@/components/shared/BackBtn";

export default function ProductInformation({ product }) {
  const targetRef = useRef(null);

  const handleShowAll = () => {
    setTimeout(() => {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  console.log(product);
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="fixed top-[65px] left-0 md:static w-full lg:w-[30%]">
          <div className="flex items-center justify-between border-b pb-3">
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
                          <span className="mx-1 text-gray-400 text-[12px]">
                            /
                          </span>
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

          <ImagePreview product={product} />
        </div>

        <div className="flex flex-col mt-[390px] md:mt-0 w-full lg:w-[65%] z-40">
          <div className="w-full p-2 md:p-6 lg:p-8 flex justify-between flex-col lg:flex-row gap-6 bg-white border-t md:border-t-[0] rounded-tr-[30px] md:rounded-tr-[0] rounded-tl-[30px] md:rounded-tl-[0] shadow-boxProductInfo lg:shadow-none">
            <div className="space-y-6 w-full lg:w-full">
              <div className="flex flex-col gap-3 md:w-[65%]">
                <div className="flex flex-wrap items-center justify-between text-xs md:text-sm text-gray-700 mx-4 md:mx-0 mt-2 lg:mt-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {product.keywords.map((key, index) => (
                      <span key={index} className="flex items-center mb-2">
                        <p className="truncate font-bold text-[#19bfd3] cursor-pointer text-[10px] md:text-[12px]">
                          {key}
                        </p>
                        {index < product.keywords.length - 1 && (
                          <span className="pr-1 text-gray-300">/</span>
                        )}
                      </span>
                    ))}
                  </div>

                  <ShareFavorite productId={product._id} />
                </div>
                <h1 className="text-[12px] md:text-[16px] mr-4 md:mr-0 font-bold">
                  {product.title}
                </h1>
                {product.description && (
                  <div className="flex gap-2 mt-3">
                    <h3 className="text-lg font-medium mb-2">{icons.info}</h3>
                    <p className="text-[10px] md:text-[12px] text-gray-600">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
              <div className="lg:hidden">
                <SelectColorAndSize product={product} />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-3 border-t w-full md:w-[65%]">
                  <InsuranceCard insurance={product.insurance} />
                  <ProductSpecifications
                    specifications={product.specifications}
                    isGrocery={product?.isGrocery.value}
                    handleShowAll={handleShowAll}
                  />
                  <div className="hidden lg:block">
                    <SelectColorAndSize product={product} />
                  </div>

                  {product.returnPolicy && (
                    <div className="flex gap-2 mt-3">
                      <h3 className="text-lg font-medium mb-2">
                        {icons.important}
                      </h3>
                      <p className="text-[12px] md:text-[14px] text-gray-600 text-justify">
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
                        src={images.freeDeliverySvg}
                        width={100}
                        height={100}
                        alt="آیکون"
                      />
                    </div>
                  )}
                  {!product.deliveryOptions.freeDelivery && <ShippingInfo />}
                </div>
                <SidebarProduct product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeliveryOptions />
      <DescriptionProductInfo product={product} targetRef={targetRef} />
    </>
  );
}
