"use client";

import { useEffect, useState } from "react";

import { EyeClosed, EyeOpen } from "../icons/Icons";

export default function CustomInp({
  type,
  name,
  value,
  onChange,
  label,
  placeholder,
  wrapperClassName,
  inputClassName,
  min,
  max,
  readOnly,
  disabled,
}) {
  const [active, setActive] = useState(false);
  const [inputType, setInputType] = useState(type || "text");

  const onFocus = () => {
    setActive(true);
  };

  const onBlur = () => {
    if (value?.length === 0) setActive(false);
  };

  useEffect(() => {
    if (value?.length !== 0) setActive(true);
  }, [value]);

  return (
    <div className={`input-group ${wrapperClassName && wrapperClassName}`}>
      <input
        type={inputType}
        name={name || "input"}
        value={value}
        onChange={onChange || null}
        min={min || min}
        max={max || max}
        readOnly={readOnly || false}
        disabled={disabled || false}
        placeholder={placeholder}
        className={inputClassName ? inputClassName : "input w-full h-full"}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {label && (
        <label className={`user-label ${active && "active"}`}>{label}</label>
      )}
      {type === "password" && (
        <div
          className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2"
          onClick={() =>
            setInputType(inputType === "password" ? "text" : "password")
          }
        >
          {inputType === "password" ? <EyeClosed /> : <EyeOpen />}
        </div>
      )}
    </div>
  );
}
