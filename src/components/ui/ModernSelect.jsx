"use client";

import { useState } from "react";

export default function ModernSelect({
  label,
  icon,
  error,
  helperText,
  value,
  onChange,
  options = [],
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;

  return (
    <div className={`relative ${className}`}>
      {/* Select Container */}
      <div
        className={`relative flex items-center border-2 rounded-xl transition-all duration-200 ${
          error
            ? "border-danger-500 bg-danger-50/50"
            : focused
            ? "border-primary-500 bg-primary-50/30 shadow-lg shadow-primary-500/10"
            : "border-gray-300 bg-white hover:border-gray-400"
        }`}
      >
        {/* Icon */}
        {icon && (
          <div className="pl-4 text-gray-400 flex-shrink-0">{icon}</div>
        )}

        {/* Select */}
        <select
          {...props}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full px-4 py-3.5 bg-transparent 
            text-gray-900
            focus:outline-none
            appearance-none
            cursor-pointer
            ${icon ? "pl-2" : "pl-4"}
          `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Arrow */}
        <div className="absolute right-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Floating Label */}
        {label && (
          <label
            className={`absolute transition-all duration-200 pointer-events-none ${
              icon ? "left-12" : "left-4"
            } ${
              focused || hasValue
                ? "top-2 text-xs font-medium text-primary-600 bg-white px-1"
                : "top-1/2 -translate-y-1/2 text-gray-500"
            }`}
          >
            {label}
          </label>
        )}

        {/* Error Icon */}
        {error && (
          <div className="pr-4 text-danger-500 flex-shrink-0">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Helper Text / Error Message */}
      {(helperText || error) && (
        <p
          className={`mt-1.5 text-sm px-1 ${
            error ? "text-danger-600" : "text-gray-500"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

