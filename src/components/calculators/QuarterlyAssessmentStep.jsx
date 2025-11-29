"use client";

import ModernCard from "../ui/ModernCard";
import ModernButton from "../ui/ModernButton";
import ModernInput from "../ui/ModernInput";
import { FiFileText } from "react-icons/fi";

export default function QuarterlyAssessmentStep({
  quarterlyAssessment,
  setQuarterlyAssessment,
  weights,
  onBack,
  onComplete,
}) {
  const updateQA = (field, value) => {
    setQuarterlyAssessment({ ...quarterlyAssessment, [field]: value });
  };

  // Calculate QA score
  const qaScore =
    quarterlyAssessment.score && quarterlyAssessment.maxScore
      ? (Number.parseFloat(quarterlyAssessment.score) /
          Number.parseFloat(quarterlyAssessment.maxScore)) *
        100
      : 0;

  return (
    <ModernCard className="p-6" elevation="md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-xl">
          <FiFileText className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-900">
            Quarterly Assessment
          </h3>
          <p className="text-gray-600">Major examination at the end of the quarter</p>
        </div>
      </div>

      {/* Weight Indicator */}
      <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-purple-900">
            Weight: {weights.qa * 100}%
          </span>
        </div>
        <p className="text-sm text-purple-600">
          This contributes {weights.qa * 100}% to your final grade
        </p>
        {qaScore > 0 && (
          <p className="text-sm font-semibold text-purple-800 mt-2">
            Your Score: {qaScore.toFixed(1)}%
          </p>
        )}
      </div>

      {/* QA Input */}
      <div className="space-y-4 mb-6">
        <ModernInput
          label="Quarterly Assessment Score"
          type="number"
          value={quarterlyAssessment.score || ""}
          onChange={(e) => updateQA("score", e.target.value)}
          placeholder="Enter your score"
          helperText="Enter the score you received on your quarterly exam"
        />

        <ModernInput
          label="Maximum Score"
          type="number"
          value={quarterlyAssessment.maxScore || ""}
          onChange={(e) => updateQA("maxScore", e.target.value)}
          placeholder="Enter maximum score"
          helperText="Enter the total possible points (e.g., 50, 100)"
        />
      </div>

      {/* Score Display */}
      {qaScore > 0 && (
        <ModernCard className="p-4 bg-purple-100/50 border-purple-200 mb-6">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">Your Percentage:</span>
            <span className="text-2xl font-bold text-purple-600">
              {qaScore.toFixed(1)}%
            </span>
          </div>
        </ModernCard>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <ModernButton variant="outline" onClick={onBack}>
          ← Back
        </ModernButton>
        <ModernButton variant="primary" onClick={onComplete}>
          View Results →
        </ModernButton>
      </div>
    </ModernCard>
  );
}


