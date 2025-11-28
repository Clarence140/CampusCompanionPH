"use client";

import { useState } from "react";
import ModernCard from "../ui/ModernCard";
import ModernButton from "../ui/ModernButton";
import ScoreItemCard from "../ui/ScoreItemCard";
import { FiBook, FiPlus } from "react-icons/fi";

export default function WrittenWorksStep({
  writtenWorks,
  setWrittenWorks,
  weights,
  onBack,
  onComplete,
}) {
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkData, setBulkData] = useState("");

  const addItem = () => {
    setWrittenWorks([
      ...writtenWorks,
      { name: "", score: "", maxScore: "" },
    ]);
  };

  const removeItem = (index) => {
    const newWorks = writtenWorks.filter((_, i) => i !== index);
    setWrittenWorks(newWorks);
  };

  const updateItem = (index, updates) => {
    const newWorks = [...writtenWorks];
    newWorks[index] = { ...newWorks[index], ...updates };
    setWrittenWorks(newWorks);
  };

  // Calculate average
  const wwScores = writtenWorks.filter((w) => w.score && w.maxScore);
  const wwAverage =
    wwScores.length > 0
      ? wwScores.reduce(
          (sum, w) =>
            sum +
            (Number.parseFloat(w.score) / Number.parseFloat(w.maxScore)) * 100,
          0
        ) / wwScores.length
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
        setWrittenWorks([...writtenWorks, ...parsed]);
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
        <div className="p-3 bg-blue-100 rounded-xl">
          <FiBook className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-900">Written Works</h3>
          <p className="text-gray-600">Quizzes, tests, and exams</p>
        </div>
      </div>

      {/* Weight Indicator */}
      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-blue-900">
            Weight: {weights.ww * 100}%
          </span>
          <span className="text-sm text-blue-700">
            {writtenWorks.filter((w) => w.score && w.maxScore).length} items
            added
          </span>
        </div>
        <p className="text-sm text-blue-600">
          This contributes {weights.ww * 100}% to your final grade
        </p>
        {wwAverage > 0 && (
          <p className="text-sm font-semibold text-blue-800 mt-2">
            Current Average: {wwAverage.toFixed(1)}%
          </p>
        )}
      </div>

      {/* Add Button */}
      <ModernButton
        variant="primary"
        fullWidth
        icon={<FiPlus />}
        className="mb-6"
        onClick={addItem}
      >
        Add Quiz/Test
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
              Bulk Add Written Works
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Paste from Excel/Google Sheets (Name [TAB] Score [TAB] Max Score -
              one per line)
            </p>
            <textarea
              value={bulkData}
              onChange={(e) => setBulkData(e.target.value)}
              placeholder={`Quiz 1\t18\t20\nQuiz 2\t22\t25\nLong Test\t38\t50`}
              className="w-full h-24 p-2 border rounded-lg bg-white border-gray-300 font-mono text-sm mb-2"
            />
            <div className="flex gap-2">
              <ModernButton
                variant="primary"
                size="sm"
                onClick={parseBulkData}
              >
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
                Preview: {bulkData.trim().split("\n").filter(l => l.trim()).length} items detected
              </p>
            )}
          </div>
        )}
      </div>

      {/* Items List */}
      <div className="space-y-3 mb-6">
        {writtenWorks.map((work, index) => (
          <ScoreItemCard
            key={index}
            item={work}
            onUpdate={(updates) => updateItem(index, updates)}
            onRemove={() => removeItem(index)}
            color="blue"
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <ModernButton variant="outline" onClick={onBack}>
          ← Back
        </ModernButton>
        <ModernButton variant="primary" onClick={onComplete}>
          Continue to Performance Tasks →
        </ModernButton>
      </div>
    </ModernCard>
  );
}

