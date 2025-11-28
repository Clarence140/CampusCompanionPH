"use client";

import { FiTrash2 } from "react-icons/fi";
import ModernCard from "./ModernCard";

export default function ScoreItemCard({
  item,
  onUpdate,
  onRemove,
  showPercentage = true,
  color = "blue",
}) {
  const percentage =
    item.score && item.maxScore
      ? Math.round((parseFloat(item.score) / parseFloat(item.maxScore)) * 100)
      : 0;

  const isLowScore = percentage > 0 && percentage < 75;

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      progress: "bg-blue-500",
      text: "text-blue-700",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      progress: "bg-green-500",
      text: "text-green-700",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      progress: "bg-purple-500",
      text: "text-purple-700",
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <ModernCard
      className={`p-4 mb-3 border-2 ${
        isLowScore ? "border-danger-200 bg-danger-50/30" : colors.border
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
        {/* Item Name */}
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Item name"
            value={item.name || ""}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>

        {/* Score */}
        <div>
          <input
            type="number"
            placeholder="Score"
            value={item.score || ""}
            onChange={(e) => onUpdate({ score: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>

        {/* Max Score */}
        <div>
          <input
            type="number"
            placeholder="Out of"
            value={item.maxScore || ""}
            onChange={(e) => onUpdate({ maxScore: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>

        {/* Percentage & Actions */}
        <div className="flex items-center gap-3">
          {showPercentage && item.score && item.maxScore && (
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">
                  {percentage}%
                </span>
                {isLowScore && (
                  <span className="text-xs text-danger-600 font-medium">
                    Low
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${colors.progress} transition-all duration-300 ${
                    isLowScore ? "bg-danger-500" : ""
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Remove Button */}
          <button
            onClick={onRemove}
            className="p-2 text-gray-500 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-all duration-200 flex-shrink-0"
            title="Remove this item"
            aria-label="Remove item"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </ModernCard>
  );
}

