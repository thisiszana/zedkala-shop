"use client";

import { useState } from "react";
import CustomBtn from "@/components/shared/CustomBtn";

export default function SelectColorAndSize({ product }) {
  const [colorTitle, setColorTitle] = useState(product?.colors[0]?.title || "");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.value || null
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || null);
  const [selectedWeight, setSelectedWeight] = useState(
    product?.weight.value || ""
  );

  const handleSelectColor = (color) => {
    setSelectedColor(color.value);
    setColorTitle(color.title);
  };

  const handleSelectSize = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleSelectWeight = (e) => {
    setSelectedWeight(e.target.value);
  };

  return (
    <div className="border-t pt-2">
      {product.colors.length > 0 && (
        <div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[12px] md:text-[16px] font-medium">
              انتخاب رنگ :
            </span>
            <span className="text-[10px] md:text-[14px] font-bold">
              {colorTitle}
            </span>
          </div>
          <div className="flex gap-2">
            {product.colors?.map((color) => (
              <div
                key={color._id}
                className="flex items-center gap-2 border rounded-lg px-2 py-1"
              >
                <CustomBtn
                  onClick={() => handleSelectColor(color)}
                  style={{ backgroundColor: color.value }}
                  classNames={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color.value
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                />
                <span className="text-[10px] md:text-[14px] font-bold">
                  {color.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {product.sizes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-[16px] font-medium mb-2">انتخاب سایز :</h3>
          <select
            value={selectedSize}
            onChange={handleSelectSize}
            className="w-full p-2 border border-gray-300 rounded-lg text-[14px] font-medium focus:ring-2 focus:ring-mainRed focus:outline-none"
          >
            {product.sizes.map((size, index) => (
              <option value={size} key={index} className="text-gray-700">
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
      {product.weight.value > 0 && (
        <div className="mt-4">
          <h3 className="text-[16px] font-medium mb-2">انتخاب وزن :</h3>
          <select
            value={selectedWeight}
            onChange={handleSelectWeight}
            className="w-full p-2 border border-gray-300 rounded-lg text-[14px] font-medium focus:ring-2 focus:ring-mainRed focus:outline-none"
          >
            <option value={product.weight.value} className="text-gray-700">
              {product.weight.value} {product.weight.unit}
            </option>
          </select>
        </div>
      )}
    </div>
  );
}
