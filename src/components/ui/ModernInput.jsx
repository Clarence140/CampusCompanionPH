"use client";

import { useState } from "react";

export default function ModernInput({
  label,
  icon,
  error,
  helperText,
  value = "",
  onChange,
  className = "",
  type = "text",
  placeholder = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;

  return (
    <div className={`relative ${className}`}>
      {/* Input Container */}
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

        {/* Input */}
        <input
          {...props}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused || hasValue ? placeholder : ""}
          className={`
            w-full px-4 py-3.5 bg-transparent 
            text-gray-900 placeholder-transparent
            focus:outline-none
            ${icon ? "pl-2" : "pl-4"}
          `}
        />

        {/* Floating Label */}
        <label
          className={`absolute transition-all duration-200 pointer-events-none ${
            icon ? "left-12" : "left-4"
          } ${
            focused || hasValue
              ? "top-2 text-xs font-medium text-primary-600"
              : "top-1/2 -translate-y-1/2 text-gray-500"
          }`}
        >
          {label}
        </label>

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


