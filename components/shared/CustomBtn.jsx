"use client";

import Loader from "./Loader";

export default function CustomBtn({
  type,
  classNames,
  isLoading,
  disabled,
  title,
  icon,
  style,
  onClick,
}) {
  const bassClassNames = `rounded-lg px-[20px] h-[40px] w-full Transition flex items-center justify-center gap-2 ${
    isLoading ? "bg-gray-200" : "bg-yellow-300 text-white"
  }`;
  return (
    <button
      type={type || "button"}
      style={style}
      className={classNames ? classNames : bassClassNames}
      disabled={disabled}
      onClick={onClick || null}
    >
      {isLoading ? (
        <Loader size={8} />
      ) : (
        <>
          {icon && icon}
          {title && title}
        </>
      )}
    </button>
  );
}
