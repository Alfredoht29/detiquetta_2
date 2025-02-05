"use client";

import React, { useRef } from "react";

interface TimeInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  label,
  value,
  onChange,
  id = "time-input",
}) => {
  // Format the time for display
  const formattedTime = value
    ? new Date(`1970-01-01T${value}`).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Selecciona una hora";

  const inputRef = useRef<HTMLInputElement>(null);

  // If you want to *force* clicks, you can try this approach
  // but many times iOS Safari simply won't open a "wheel" time picker.
  const handleDisplayClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // sometimes .focus() helps in Safari
      inputRef.current.click(); // triggers the click
    }
  };

  return (
    <div className="mb-4 relative">
      {label && (
        <label
          className="block text-lg text-customor mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div
        className="relative"
        onClick={handleDisplayClick}
      >
        {/* Custom Display Field */}
        <div className="pointer-events-none text-lg text-customor rounded bg-white p-4 w-full border border-gray-300 flex items-center justify-between">
          <span>{formattedTime}</span>
          {/* Clock Icon */}
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        {/* Native Input Field */}
        <input
          ref={inputRef}
          id={id}
          type="time"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TimeInput;
