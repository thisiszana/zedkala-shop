import Skeleton from "@/components/shared/Skeleton";

export default function BannerSliderSkeleton() {
  return (
    <div className="w-full max-w-full mx-auto mt-4">
      <div className="relative">
        <div className="swiper-container">
          <Skeleton
            className="
              relative 
              overflow-hidden 
              mx-auto 
              mt-[90px]
              max-sm:w-[98%] max-sm:h-[180px] max-sm:rounded-[20px]
              sm:w-full sm:h-[180px] sm:rounded-[20px]
              md:w-full md:h-[230px] md:rounded-[30px]
              lg:w-full lg:h-[260px] lg:rounded-none
              xl:w-full xl:h-[300px]
            "
          >
            <div className="w-full h-full bg-gray-300"></div>
          </Skeleton>
        </div>
        <div className="custom-pagination absolute bottom-[.5rem] left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="w-3 h-3 rounded-full bg-gray-400"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
