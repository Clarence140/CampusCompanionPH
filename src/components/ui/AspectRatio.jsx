"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

/**
 * AspectRatio Component
 * Maintains consistent aspect ratios across different screen sizes
 * 
 * @param {Object} props
 * @param {number} props.ratio - Custom aspect ratio (width/height)
 * @param {string} props.preset - Predefined aspect ratio: "square" | "video" | "portrait" | "widescreen" | "ultrawide" | "golden"
 * @param {boolean|string} props.rounded - Apply rounded corners (true, "xl", "2xl")
 * @param {boolean} props.bordered - Show border
 * @param {string} props.objectFit - Object fit style: "cover" | "contain" | "fill" | "none" | "scale-down"
 * @param {Object} props.presetResponsive - Responsive presets: { mobile?: string, tablet?: string, desktop?: string, default?: string }
 * @param {string} props.className - Additional CSS classes
 */
const AspectRatio = React.forwardRef(({ 
  className, 
  ratio: propRatio, 
  preset,
  presetResponsive,
  rounded = false, 
  bordered = false, 
  objectFit,
  style = {}, 
  children,
  ...props 
}, ref) => {
  const [paddingBottom, setPaddingBottom] = useState(null);

  // Predefined aspect ratios
  const presetRatios = {
    square: 1,             // 1:1
    video: 16/9,           // 16:9
    portrait: 3/4,         // 3:4
    widescreen: 16/9,      // 16:9
    ultrawide: 21/9,       // 21:9
    golden: 1.618          // Golden ratio
  };

  // Determine the final ratio to use
  const getRatio = (presetValue) => {
    if (presetValue && presetRatios[presetValue]) {
      return presetRatios[presetValue];
    }
    return propRatio || 1;
  };

  // Calculate responsive padding based on screen size
  useEffect(() => {
    if (!presetResponsive) {
      setPaddingBottom(null);
      return;
    }

    const updatePadding = () => {
      const width = window.innerWidth;
      let activePreset;

      if (width >= 1024) {
        // Desktop
        activePreset = presetResponsive.desktop || presetResponsive.tablet || presetResponsive.default || presetResponsive.mobile || "video";
      } else if (width >= 640) {
        // Tablet
        activePreset = presetResponsive.tablet || presetResponsive.default || presetResponsive.mobile || "video";
      } else {
        // Mobile
        activePreset = presetResponsive.mobile || presetResponsive.default || "square";
      }

      const ratio = getRatio(activePreset);
      setPaddingBottom((1 / ratio) * 100);
    };

    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, [presetResponsive]);

  // Calculate base ratio (for non-responsive)
  const baseRatio = !presetResponsive ? getRatio(preset) : null;

  // Final padding-bottom
  const finalPaddingBottom = paddingBottom !== null 
    ? paddingBottom 
    : (baseRatio ? (1 / baseRatio) * 100 : 100);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden",
        rounded === true && "rounded-md",
        rounded === "xl" && "rounded-xl",
        rounded === "2xl" && "rounded-2xl",
        rounded === "lg" && "rounded-lg",
        bordered && "border border-gray-200",
        className
      )}
      style={style}
      {...props}
    >
      {/* Aspect ratio container */}
      <div
        style={{
          paddingBottom: `${finalPaddingBottom}%`
        }}
      >
        {/* Content wrapper */}
        <div 
          className={cn(
            "absolute inset-0 w-full h-full",
            objectFit === "cover" && "[&>img]:object-cover [&>video]:object-cover [&>*]:w-full [&>*]:h-full",
            objectFit === "contain" && "[&>img]:object-contain [&>video]:object-contain [&>*]:w-full [&>*]:h-full",
            objectFit === "fill" && "[&>img]:object-fill [&>video]:object-fill [&>*]:w-full [&>*]:h-full",
            objectFit === "none" && "[&>img]:object-none [&>video]:object-none",
            objectFit === "scale-down" && "[&>img]:object-scale-down [&>video]:object-scale-down"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
