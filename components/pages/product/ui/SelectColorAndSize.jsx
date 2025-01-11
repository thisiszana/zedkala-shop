"use client";

import { useState } from "react";

import CustomBtn from "@/components/shared/CustomBtn";

export default function SelectColorAndSize({ product }) {
  const [colorTitle, setColorTitle] = useState(product?.colors[0].title || "");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0].value || null
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || null);

  const handleSelectColor = (color) => {
    setSelectedColor(color.value);
    setColorTitle(color.title);
  };
  return (
    <>
      {product.colors.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[16px] font-medium">انتخاب رنگ :</span>
            <span className="text-[14px] font-bold">{colorTitle}</span>
          </div>
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <CustomBtn
                key={index}
                onClick={() => handleSelectColor(color)}
                style={{ backgroundColor: color.value }}
                classNames={`w-6 h-6  rounded-full border-2 ${
                  selectedColor === color.value
                    ? "border-black"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      {product.sizes.length > 0 && (
        <div>
          <h3 className="text-[16px] font-medium mb-2">انتخاب سایز :</h3>
          <div className="flex gap-2">
            {product.sizes.map((size, index) => (
              <CustomBtn
                key={index}
                onClick={() => setSelectedSize(size)}
                classNames={`px-2 py-1 rounded border ${
                  selectedSize === size ? "border-black" : "border-gray-300"
                }`}
                title={size}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
