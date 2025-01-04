import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/red.css";

export default function BirthDateInput({ value, onChange }) {
  const yearLimit = new Date("2016-03-20");

  const handleDateChange = (date) => {
    onChange(date);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-gray-800 font-bold mb-2">تاریخ تولد</label>
      <DatePicker
        calendar={persian}
        className="red"
        locale={persian_fa}
        inputClass="rounded-md border-gray-300 py-2 px-4 w-32 text-center"
        placeholder="انتخاب کنید"
        style={{
          display: "flex",
          gap: "8px",
        }}
        maxDate={yearLimit}
        value={value}
        onChange={handleDateChange}
      />
    </div>
  );
}
