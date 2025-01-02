"use client";

import { LeftAngle } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomInp from "@/components/shared/CustomInp";
import { useState } from "react";

export default function InsuranceCard({ insurance }) {
  const [isChecked, setIsChecked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (!insurance.insuranceType) return null;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <CustomInp
            type="checkbox"
            id="insuranceCheckbox"
            classNames="w-6 h-6 cursor-pointer accent-blue-500"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="insuranceCheckbox"
            className="text-gray-700 font-medium cursor-pointer text-[12px] lg:text-[14px]"
          >
            {insurance.insuranceType}
          </label>
        </div>
        <p className="font-bold text-red-500 text-[13px] lg:text-[16px]">
          {Number(insurance.insuranceCost).toLocaleString()} تومان
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="mt-2 mr-6">
          <p className="text-[12px] text-gray-500">
            مدت زمان بیمه: {insurance.insuranceDuration} ماه
          </p>
          {insurance.mandatoryInsurance && (
            <span className="text-xs text-red-500 font-semibold">
              بیمه اجباری است
            </span>
          )}
        </div>

        <CustomBtn
          icon={<LeftAngle size={8} />}
          classNames="text-blue-500 text-[12px] mt-2 flex flex-row-reverse items-center gap-3"
          onClick={() => setShowDetails(!showDetails)}
          title={showDetails ? "بستن جزئیات بیمه" : "مشاهده جزئیات بیمه"}
        />
      </div>

      {showDetails && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <p className="text-gray-600 text-sm whitespace-pre-line">
            {insurance.insuranceTerms}
          </p>
          <div className="flex gap-2 mt-6">
            <CustomBtn
              title={<span>فعلا تمایل ندارم</span>}
              classNames="bg-red-500 text-white px-3 py-2 rounded text-[12px]"
            />
            <CustomBtn
              classNames={`${
                isChecked
                  ? "bg-green-500 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-3 py-2 rounded text-[12px]`}
              title={<span>افزودن کالا و بیمه به سبد</span>}
              disabled={!isChecked}
            />
          </div>
        </div>
      )}
    </div>
  );
}
