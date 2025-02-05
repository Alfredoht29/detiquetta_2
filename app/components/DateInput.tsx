"use client";

import React, { useRef } from "react";

interface DateInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDisplayClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const formattedDate = value
    ? new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Selecciona una fecha";

  return (
    <div className="mb-4 relative">
      {label && (
        <label
          className="block text-lg text-customor mb-2"
          htmlFor="date-input"
        >
          {label}
        </label>
      )}

      {/* Custom Display Field */}
      <div
        className="text-lg text-customor rounded bg-white p-4 w-full cursor-pointer border border-gray-300 flex items-center justify-between"
        onClick={handleDisplayClick}
      >
        <span>{formattedDate}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Native Input Field */}
      <input
        ref={inputRef}
        id="date-input"
        type="date"
        className="absolute inset-0 opacity-0 cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateInput;
