import React, { useState } from "react";
import CustomDrawer from "./CustomDrawer";
import CustomBtn from "@/components/shared/CustomBtn";

const maxVisibleSpecifications = 3;

export default function ProductSpecifications({
  specifications,
  handleShowAll,
}) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const handleShowDrawer = () => setIsDrawerVisible(true);
  const handleCloseDrawer = () => setIsDrawerVisible(false);

  return (
    <div className="mt-6 border rounded-lg shadow-sm bg-white">
      <div className="bg-mainRed text-white py-2 rounded-t-lg text-center">
        <h3 className="text-sm font-bold">مشخصات محصول</h3>
      </div>

      <div className="p-4 grid grid-cols-1 gap-3 lg:hidden">
        {specifications
          .flatMap((spec) => spec.items)
          .slice(0, maxVisibleSpecifications)
          .map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-gray-50 border rounded-md p-3"
            >
              <span className="text-gray-700 text-sm truncate">
                {item.label}
              </span>
              <span className="text-gray-900 text-sm font-medium truncate">
                {item.value}
              </span>
            </div>
          ))}
        {specifications.flatMap((spec) => spec.items).length >
          maxVisibleSpecifications && (
          <CustomBtn
            onClick={handleShowDrawer}
            classNames="mt-4 w-full text-center py-2 text-sm text-mainRed border border-mainRed rounded-md transition hover:bg-mainRed hover:text-white"
            title="مشاهده همه"
          />
        )}
      </div>

      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-3 p-4">
        {specifications
          .flatMap((spec) => spec.items)
          .slice(0, maxVisibleSpecifications)
          .map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-gray-50 border rounded-md p-3"
            >
              <span className="text-gray-700 text-[13px] truncate">
                {item.label}
              </span>
              <span className="text-gray-900 text-[13px] font-medium truncate">
                {item.value}
              </span>
            </div>
          ))}
        {specifications.flatMap((spec) => spec.items).length >
          maxVisibleSpecifications && (
          <CustomBtn
            onClick={handleShowAll}
            classNames="w-full text-center py-2 text-sm text-mainRed border border-mainRed rounded-md transition hover:bg-mainRed hover:text-white"
            title="مشاهده همه"
          />
        )}
      </div>

      <CustomDrawer
        isVisible={isDrawerVisible}
        onClose={handleCloseDrawer}
        specifications={specifications}
      />
    </div>
  );
}
