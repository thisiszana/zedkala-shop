"use client";

import { shorterText } from "@/utils/clientFun";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Close } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import DiscountBadge from "../../products/ui/DiscountBadge";
import { images } from "@/constants";

export default function ImagePreview({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const openModal = (img) => {
    setActiveImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveImage(null);
  };

  return (
    <div className="fixed top-[135px] left-0 md:static w-full lg:w-[30%]">
      <div className="w-full flex flex-col lg:block">
      {product.discount?.value > 0 && (
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:bg-[#fdecf0] lg:w-full lg:px-4 lg:py-1 lg:rounded-[8px] lg:mt-[5px]">
          <span className="text-mainRed font-extrabold">
            {product.discount.title}
          </span>
          <DiscountBadge discount={product.discount} showTimerOnly={true} />
        </div>
      )}

      <div className="lg:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{
            el: ".custom-pagination_sm",
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} custom-bullet"></span>`,
          }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center h-[300px]">
                <Image
                  src={img || images.imageNotFound}
                  width={300}
                  height={300}
                  alt={shorterText(product.title, 5)}
                  className="rounded-lg object-center"
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="custom-pagination_sm z-50"></div>
        </Swiper>
      </div>

      <div className="hidden lg:block mt-5">
        <div className="grid grid-cols-1 gap-4 justify-center">
          <div
            className="relative cursor-pointer group"
            onClick={() => openModal(product.images[0])}
          >
            <div className="flex justify-center items-center">
              <Image
                src={product.images[0] || images.imageNotFound}
                width={400}
                height={400}
                alt={shorterText(product.title, 5)}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="w-full">
            <Swiper
              spaceBetween={10}
              breakpoints={{
                1024: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 2,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
            >
              {product.images.slice(1).map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => openModal(img)}
                  >
                    <div className="flex justify-center items-center h-[100px]">
                      <Image
                        src={img ? img : images.imageNotFound}
                        width={100}
                        height={100}
                        alt={shorterText(product.title, 4)}
                        className="rounded-lg object-cover border h-full"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-[700px] bg-white rounded-lg p-4 ">
            <Swiper
              modules={[Pagination]}
              pagination={{
                el: ".custom-pagination2",
                clickable: true,
                renderBullet: (index, className) =>
                  `<span class="${className} custom-bullet"></span>`,
              }}
              spaceBetween={10}
              slidesPerView={1}
              initialSlide={product.images.indexOf(activeImage)}
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={img}
                      width={400}
                      height={400}
                      alt={shorterText(product.title, 5)}
                      className="rounded-lg object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div className="custom-pagination2 absolute bottom-[.5rem] left-[80px]  transform -translate-x-1/2 flex gap-2 z-50"></div>
            </Swiper>

            <CustomBtn
              icon={<Close />}
              onClick={closeModal}
              classNames="absolute top-4 right-4 z-[50] bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
}
