"use client";

export default function ModernCard({
  children,
  hover = false,
  elevation = "md",
  gradient = false,
  className = "",
  ...props
}) {
  const elevations = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-lg shadow-gray-200/50",
    lg: "shadow-xl shadow-gray-300/50",
    xl: "shadow-2xl shadow-gray-400/50",
  };

  const hoverEffects = hover
    ? "transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 hover:-translate-y-1 cursor-pointer"
    : "";

  const gradientBg = gradient
    ? "bg-gradient-to-br from-white via-gray-50 to-primary-50/30"
    : "bg-white";

  return (
    <div
      {...props}
      className={`
        rounded-2xl border border-gray-200/60
        ${gradientBg}
        ${elevations[elevation]}
        ${hoverEffects}
        ${className}
      `}
    >
      {children}
    </div>
  );
}


