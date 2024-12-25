"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { images } from "@/constants";

export default function BannerSlider({ banner }) {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  const sortedBanners = banner
    .filter((item) => item.published)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="w-full max-w-full mx-auto mt-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={false}
        spaceBetween={1}
        centeredSlides={true}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        breakpoints={{
          0: {
            slidesPerView: 1.1,
            spaceBetween: 1,
            centeredSlides: true,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: false,
          },
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} custom-bullet"></span>`,
        }}
        className="relative"
      >
        {sortedBanners.map((item) => (
          <SwiperSlide
            key={item._id}
            className="transition-all duration-1000 ease-in-out transform"
          >
            <div
              className="
                relative 
                overflow-hidden 
                mx-auto 
                mt-[90px]
                max-sm:w-[98%] max-sm:h-[180px] max-sm:rounded-[20px]
                sm:w-full sm:h-[180px] sm:rounded-[20px]
                md:w-full md:h-[230px] md:rounded-[30px]
                lg:w-full lg:h-[260px] lg:rounded-none
                xl:w-full xl:h-[350px]
              "
            >
              <Image
                src={item.images[0] || images.imageNotFound}
                width={1920}
                height={1080}
                alt={item.title}
                className="
                  w-full h-full 
                  object-cover 
                  object-center
                  transition-all duration-500 ease-in-out
                "
                priority={true}
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-pagination absolute bottom-[.5rem] left-1/2 transform -translate-x-1/2 flex gap-2 z-50"></div>
      </Swiper>
    </div>
  );
}
