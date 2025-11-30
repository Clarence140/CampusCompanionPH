"use client";

import { useState } from "react";
import ModernCard from "../ui/ModernCard";
import ModernButton from "../ui/ModernButton";
import ScoreItemCard from "../ui/ScoreItemCard";
import { FiTarget, FiPlus } from "react-icons/fi";

export default function PerformanceTasksStep({
  performanceTasks,
  setPerformanceTasks,
  weights,
  onBack,
  onComplete,
}) {
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkData, setBulkData] = useState("");

  const addItem = () => {
    setPerformanceTasks([
      ...performanceTasks,
      { name: "", score: "", maxScore: "" },
    ]);
  };

  const removeItem = (index) => {
    const newTasks = performanceTasks.filter((_, i) => i !== index);
    setPerformanceTasks(newTasks);
  };

  const updateItem = (index, updates) => {
    const newTasks = [...performanceTasks];
    newTasks[index] = { ...newTasks[index], ...updates };
    setPerformanceTasks(newTasks);
  };

  // Calculate average
  const ptScores = performanceTasks.filter((p) => p.score && p.maxScore);
  const ptAverage =
    ptScores.length > 0
      ? ptScores.reduce(
          (sum, p) =>
            sum +
            (Number.parseFloat(p.score) / Number.parseFloat(p.maxScore)) * 100,
          0
        ) / ptScores.length
      : 0;

  const parseBulkData = () => {
    try {
      const lines = bulkData.trim().split("\n");
      const parsed = lines
        .map((line) => {
          const parts = line.split("\t");
          if (parts.length >= 3) {
            return {
              name: parts[0].trim(),
              score: parts[1].trim(),
              maxScore: parts[2].trim(),
            };
          }
          return null;
        })
        .filter((item) => item && item.score && item.maxScore);

      if (parsed.length > 0) {
        setPerformanceTasks([...performanceTasks, ...parsed]);
        setBulkData("");
        setShowBulkImport(false);
      }
    } catch (error) {
      console.error("Error parsing bulk data:", error);
    }
  };

  return (
    <ModernCard className="p-6" elevation="md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-xl">
          <FiTarget className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-900">Performance Tasks</h3>
          <p className="text-gray-600">
            Projects, presentations, and hands-on activities
          </p>
        </div>
      </div>

      {/* Weight Indicator */}
      <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-green-900">
            Weight: {weights.pt * 100}%
          </span>
          <span className="text-sm text-green-700">
            {performanceTasks.filter((p) => p.score && p.maxScore).length} items
            added
          </span>
        </div>
        <p className="text-sm text-green-600">
          This contributes {weights.pt * 100}% to your final grade
        </p>
        {ptAverage > 0 && (
          <p className="text-sm font-semibold text-green-800 mt-2">
            Current Average: {ptAverage.toFixed(1)}%
          </p>
        )}
      </div>

      {/* Add Button */}
      <ModernButton
        variant="success"
        fullWidth
        icon={<FiPlus />}
        className="mb-6"
        onClick={addItem}
      >
        Add Performance Task
      </ModernButton>

      {/* Bulk Import */}
      <div className="mb-6">
        <button
          onClick={() => setShowBulkImport(!showBulkImport)}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          {showBulkImport ? "▼ Hide" : "▶ Bulk Import from Excel"}
        </button>

        {showBulkImport && (
          <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-semibold mb-2 text-purple-800">
              Bulk Add Performance Tasks
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Paste from Excel/Google Sheets (Name [TAB] Score [TAB] Max Score -
              one per line)
            </p>
            <textarea
              value={bulkData}
              onChange={(e) => setBulkData(e.target.value)}
              placeholder={`Project 1\t45\t50\nPresentation\t28\t30`}
              className="w-full h-24 p-2 border rounded-lg bg-white border-gray-300 font-mono text-sm mb-2"
            />
            <div className="flex gap-2">
              <ModernButton variant="primary" size="sm" onClick={parseBulkData}>
                Import
              </ModernButton>
              <ModernButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowBulkImport(false);
                  setBulkData("");
                }}
              >
                Cancel
              </ModernButton>
            </div>
            {bulkData.trim() && (
              <p className="text-xs text-purple-600 mt-2">
                Preview:{" "}
                {
                  bulkData
                    .trim()
                    .split("\n")
                    .filter((l) => l.trim()).length
                }{" "}
                items detected
              </p>
            )}
          </div>
        )}
      </div>

      {/* Items List */}
      <div className="space-y-3 mb-6">
        {performanceTasks.map((task, index) => (
          <ScoreItemCard
            key={index}
            item={task}
            onUpdate={(updates) => updateItem(index, updates)}
            onRemove={() => removeItem(index)}
            color="green"
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <ModernButton variant="outline" onClick={onBack}>
          ← Back
        </ModernButton>
        <ModernButton variant="primary" onClick={onComplete}>
          Continue to Quarterly Assessment →
        </ModernButton>
      </div>
    </ModernCard>
  );
}
