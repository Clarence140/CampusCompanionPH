"use client";

import ModernCard from "./ui/ModernCard";

export default function GradeLevelCard({
  icon,
  title,
  subtitle,
  onClick,
  isSelected = false,
  disabled = false,
}) {
  return (
    <ModernCard
      hover={!disabled}
      elevation={isSelected ? "lg" : "md"}
      className={`
        p-6 sm:p-8 text-center cursor-pointer transition-all duration-200
        ${isSelected ? "border-2 border-primary-500 bg-primary-50/50" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={disabled ? undefined : onClick}
    >
      <div className="text-5xl sm:text-6xl mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
      {isSelected && (
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
            Selected
          </div>
        </div>
      )}
    </ModernCard>
  );
}

