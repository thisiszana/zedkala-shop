"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { productDetailIcons } from "@/constants";
import { shorterText } from "@/utils/clientFun";

export default function DeliveryOptions() {
  return (
    <div className="w-full p-4 border-t pt-3">
      <Swiper
        spaceBetween={10}
        breakpoints={{
          1024: {
            slidesPerView: productDetailIcons.length ,
          },

          768: {
            slidesPerView: 3,
          },

          480: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
            centeredSlides: true
          },
        }}
      >
        {productDetailIcons.map((icon) => (
          <SwiperSlide key={icon.id}>
            <div className="flex items-center gap-2 border-t border-b justify-center">
              <Image
                src={icon.src}
                alt={shorterText(icon.title, 3)}
                width={50}
                height={50}
                className="mb-2"
              />
              <p className="text-[10px] text-center font-[900]">{icon.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
