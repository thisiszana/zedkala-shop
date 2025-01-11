"use client"

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function CustomDrawer({ isVisible, onClose, specifications }) {
  const [drawerHeight, setDrawerHeight] = useState(0.75 * window.innerHeight);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setDrawerHeight(0.75 * window.innerHeight);
      setIsClosing(false);
    }
  }, [isVisible]);

  const handleResizeStart = (e) => {
    const startY = e.clientY || e.touches[0].clientY; 
    const startHeight = drawerHeight;

    const handleMove = (moveEvent) => {
      const clientY =
        moveEvent.clientY ||
        (moveEvent.touches && moveEvent.touches[0].clientY);
      const newHeight = startHeight + (startY - clientY);

      if (newHeight < 150) {
        setDrawerHeight(0);
        setIsClosing(true);
        setTimeout(onClose, 300);
      } else {
        setDrawerHeight(Math.min(window.innerHeight, newHeight));
      }
    };

    const handleEnd = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleEnd);
  };

  if (!isVisible && !isClosing) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] ${
        isClosing ? "opacity-0" : "opacity-100"
      } transition-opacity duration-300`}
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={() => {
          setIsClosing(true);
          setTimeout(onClose, 300);
        }}
      ></div>

      <div
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-lg shadow-lg transition-transform duration-300 ${
          isClosing ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ height: drawerHeight }}
      >
        <div
          className="cursor-row-resize bg-secondaryRed h-2 w-[50px] rounded-b-lg mx-auto"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        ></div>

        <div className="p-4 overflow-auto h-full">
          <h2 className="text-lg font-bold text-gray-800 mb-4">مشخصات</h2>
          <table className="w-full border-collapse">
            <tbody>
              {specifications.map((spec) => (
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
                    <tr key={item._id} className="">
                      <td className="py-2 px-4 text-sm text-gray-600 w-1/3 border-b">
                        {item.label} :
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-900 text-justify border-b">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body
  );
}
