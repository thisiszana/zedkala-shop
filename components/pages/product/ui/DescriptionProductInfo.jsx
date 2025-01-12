"use client";

import CustomBtn from "@/components/shared/CustomBtn";
import { shorterText } from "@/utils/clientFun";
import React, { useState, useEffect } from "react";

export default function DescriptionProductInfo({ product, targetRef }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSection, setActiveSection] = useState("");

  const toggleExpand = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateText = (text, maxLength, isExpanded) => {
    if (isExpanded || text?.length <= maxLength) return text;
    return `${text?.slice(0, maxLength)}...`;
  };

  const sections = [
    ...(product?.introduction
      ? [
          {
            id: "introduction",
            title: product?.introduction?.title,
            description: product?.introduction?.description,
          },
        ]
      : []),
    ...(product?.expertReview?.length > 0
      ? product.expertReview.map((review) => ({
          id: review?._id,
          title: review?.title,
          description: review?.description,
        }))
      : []),
  ];

  const allSections = [...sections];

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = allSections.map((section) => ({
        id: section.id,
        offsetTop: document.getElementById(section.id)?.offsetTop || 0,
      }));
      const scrollPosition = window.scrollY + 100;

      const currentSection = sectionOffsets.find(
        (section, index) =>
          scrollPosition >= section.offsetTop &&
          (index === sectionOffsets.length - 1 ||
            scrollPosition < sectionOffsets[index + 1].offsetTop)
      );

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allSections]);

  return (
    <div className="bg-white relative z-30">
      <div className="sticky top-[60px] md:top-[85px] right-0 rounded-tl-[8px] rounded-bl-[8px] bg-white shadow-md w-fit">
        <div className="flex items-center flex-wrap px-4 py-2 border-b gap-5 overflow-x-auto">
          {allSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`text-[12px] md:text-[14px] font-semibold whitespace-nowrap pb-1 transition ${
                activeSection === section.id
                  ? "text-mainRed border-b-2 border-mainRed"
                  : "text-gray-700 hover:text-mainRed"
              }`}
            >
              {shorterText(section.title, 15)}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="mt-4 px-4 space-y-6 flex-1">
          {sections.map((section) => {
            const isExpanded = expandedSections[section.id] || false;
            return (
              <div
                key={section.id}
                id={section.id}
                className="border-t pb-4 transition-opacity"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed text-justify">
                  {truncateText(section?.description, 250, isExpanded)}
                </p>
                {section.description?.length > 250 && (
                  <CustomBtn
                    title={isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
                    onClick={() => toggleExpand(section.id)}
                    classNames="mt-2 text-sm font-semibold text-mainRed hover:underline"
                  />
                )}
              </div>
            );
          })}
        </div>
        <Specifications product={product} targetRef={targetRef} />
      </div>
    </div>
  );
}

function Specifications({ product, targetRef }) {
  const [showAllSpecifications, setShowAllSpecifications] = useState(false);

  const initialVisibleCount = 3;

  const toggleSpecifications = () => {
    setShowAllSpecifications((prev) => !prev);
  };

  const visibleSpecifications = showAllSpecifications
    ? product?.specifications || []
    : product?.specifications?.slice(0, initialVisibleCount) || [];

  return (
    <div
      ref={targetRef}
      className="h-fit p-4 mt-4 border-t pt-3 hidden lg:block w-[50%]"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">مشخصات</h2>
      <table className="w-full border-collapse">
        <tbody>
          {visibleSpecifications.map((spec) => (
            <React.Fragment key={spec._id}>
              <tr className="bg-gray-100">
                <td
                  colSpan={2}
                  className="py-2 px-4 text-sm font-bold text-gray-800"
                >
                  {spec.title}
                </td>
              </tr>
              {spec.items.map((item) => (
                <tr key={item._id} className="flex flex-col md:flex-row">
                  <td className="py-2 px-4 text-sm text-gray-600 md:w-1/3 border-b md:border-b-0 font-bold inline-flex">
                    {item.label} :
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-900 text-justify border-b md:border-b-0">
                    {item.value}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {product?.specifications?.length > initialVisibleCount && (
        <div className="mt-4 text-center">
          <CustomBtn
            title={showAllSpecifications ? "نمایش کمتر" : "نمایش بیشتر"}
            onClick={toggleSpecifications}
            classNames="text-sm font-semibold text-mainRed hover:underline"
          />
        </div>
      )}
    </div>
  );
}
