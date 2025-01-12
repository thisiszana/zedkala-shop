"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { productDetailIcons } from "@/constants";
import { shorterText } from "@/utils/clientFun";
import { Autoplay } from "swiper/modules";

export default function DeliveryOptions() {
  return (
    <div className="w-full border-y py-3 my-3 bg-white relative z-30">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={10}
        breakpoints={{
          1024: {
            slidesPerView: productDetailIcons.length,
          },

          768: {
            slidesPerView: 3,
          },

          480: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
            centeredSlides: true,
          },
        }}
      >
        {productDetailIcons.map((icon) => (
          <SwiperSlide key={icon.id}>
            <div className="flex items-center gap-2 border-t border-b justify-center bg-white">
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
