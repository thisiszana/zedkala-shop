"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Loader from "@/components/shared/Loader";
import { Image } from "@nextui-org/react";
import { shorterText, sp } from "@/utils/clientFun";
import Link from "next/link";
import { images } from "@/constants";
import { LeftAngle, RightAngle } from "@/components/icons/Icons";
import DiscountBadge from "@/components/pages/products/ui/DiscountBadge";

export default function DisProductSlider({ discountProduct }) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const productsWithStatic = [
    {
      static: true,
      content: (
        <Link
          href={"/products?sort=2"}
          className="flex flex-col items-center justify-between text-white text-center mb-4 px-[40px]"
        >
          <Image src={images.disIcon1} width={90} height={90} alt="Icon" />
          <div className="flex items-center justify-center my-4">
            <Image src={images.disIcon} width={60} height={60} alt="Icon" />
          </div>
          <span className="text-[14px] inline-flex items-center mx-auto gap-1">
            <p className="text-center my-auto text-[12px] ">مشاهده همه</p>
            <LeftAngle size={10} />
          </span>
        </Link>
      ),
    },
    ...discountProduct,
    {
      static: true,
      content: (
        <div className="bg-white p-2 shadow-md w-[180px] h-[200px] flex flex-col items-center justify-center rounded-tl-[15px] rounded-bl-[15px]">
          <Link
            href={"/products?sort=2"}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[14px] flex items-center justify-center gap-1 border border-gray-400 rounded-full p-4">
              <LeftAngle size={16} />
            </span>
            <p className="text-center text-gray-700 font-bold text-[12px]">
              مشاهده همه
            </p>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="relative bg-red-500 p-4 pl-0 lg:rounded-[25px] flex w-[100%] mt-5 lg:mt-0">
      <Swiper
        modules={[Navigation]}
        spaceBetween={4}
        slidesPerView="auto"
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="h-full overflow-hidden"
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {productsWithStatic ? (
          productsWithStatic.map((product, index) =>
            product.static ? (
              <SwiperSlide
                key={`static-${index}`}
                className="flex items-center justify-center w-auto"
                style={{ width: "180px" }}
              >
                {product.content}
              </SwiperSlide>
            ) : (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center w-auto"
                style={{ width: "180px" }}
              >
                <Link href={`product/${product._id}`}>
                  <div className="bg-white p-2 shadow-md h-[200px]">
                    <div className="flex justify-center items-center mb-4 relative">
                      <Image
                        src={product.images[0]}
                        width={80}
                        height={80}
                        alt={shorterText(product.title, 5)}
                        className="object-contain"
                      />
                      {product.colors.length > 0 && (
                        <div className="flex flex-col space-y-2 absolute left-0 top-0">
                          {product.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-[6px] h-[6px] rounded-full border border-dark1"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                      )}
                    </div>
                    <h3 className="text-[12px] font-bold text-gray-700 mb-2 truncate">
                      {product.title}
                    </h3>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-red-500 font-bold line-through">
                        {sp(product.price)} تومان
                      </span>
                      <p className="text-gray-800">
                        {sp(
                          product.discount?.value > 0
                            ? Math.floor(
                                product.price *
                                  (1 - product.discount.value / 100)
                              )
                            : product.price
                        )}{" "}
                        <span className="text-[10px]">تومان</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-[10px] text-white bg-red-500 px-2 py-2 font-bold rounded-full mt-2 w-fit">
                        {product.discount?.value}٪
                      </div>
                      <DiscountBadge
                        discount={product.discount}
                        showTimerOnly={true}
                      />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          )
        ) : (
          <main className="flex items-center justify-center">
            <Loader />
          </main>
        )}
      </Swiper>
      {!isBeginning && (
        <button className="custom-prev z-20 absolute right-4 top-[50%] ml-2 -translate-y-1/2 text-gray-400 bg-white border p-2 rounded-full shadow-md">
          <RightAngle size={16} />
        </button>
      )}
      {!isEnd && (
        <button className="custom-next z-20 absolute left-4 top-[50%] mr-2 -translate-y-1/2 text-gray-400 bg-white border p-2 rounded-full shadow-md">
          <LeftAngle size={16} />
        </button>
      )}
    </div>
  );
}
