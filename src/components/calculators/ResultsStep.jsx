"use client";

import ModernCard from "../ui/ModernCard";
import ModernButton from "../ui/ModernButton";
import GoalPlanner from "../GoalPlanner";

export default function ResultsStep({
  grades,
  weights,
  gradeLevel,
  onBack,
  onRestart,
}) {
  const finalGrade = parseFloat(grades.finalGrade);

  // Get grade meaning
  const getGradeMeaning = (grade) => {
    if (grade >= 90) return "Outstanding";
    if (grade >= 85) return "Very Satisfactory";
    if (grade >= 80) return "Satisfactory";
    if (grade >= 75) return "Fairly Satisfactory";
    return "Below Expectations";
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 85) return "text-blue-600";
    if (grade >= 80) return "text-primary-600";
    if (grade >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const gradeMeaning = getGradeMeaning(finalGrade);

  return (
    <div className="space-y-6">
      {/* Final Grade Display */}
      <ModernCard className="p-8 text-center" elevation="lg" gradient>
        <h2 className="text-5xl font-bold mb-4 text-gray-900">
          Final Grade: <span className={getGradeColor(finalGrade)}>{finalGrade}%</span>
        </h2>
        <p className="text-2xl font-semibold text-gray-600 mb-2">
          {gradeMeaning}
        </p>
        <p className="text-sm text-gray-500">
          Based on DepEd Order No. 8, s. 2015
        </p>
      </ModernCard>

      {/* Component Breakdown */}
      <ModernCard className="p-6" elevation="md">
        <h3 className="font-bold text-xl mb-4 text-gray-900">
          Component Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Written Works</p>
            <p className="text-2xl font-bold text-blue-600">
              {grades.wwAverage}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Weight: {weights.ww * 100}%
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Performance Tasks</p>
            <p className="text-2xl font-bold text-green-600">
              {grades.ptAverage}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Weight: {weights.pt * 100}%
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Quarterly Assessment</p>
            <p className="text-2xl font-bold text-purple-600">
              {grades.qaScore}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Weight: {weights.qa * 100}%
            </p>
          </div>
        </div>
      </ModernCard>

      {/* Goal Planner - Show if QA is not yet entered */}
      {(!grades.qaScore || parseFloat(grades.qaScore) === 0) && (
        <GoalPlanner
          currentGrade={finalGrade}
          weights={weights}
          wwAverage={parseFloat(grades.wwAverage)}
          ptAverage={parseFloat(grades.ptAverage)}
          qaScore={null}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <ModernButton variant="outline" onClick={onBack}>
          ← Back
        </ModernButton>
        <ModernButton variant="primary" onClick={onRestart}>
          Calculate Another Grade
        </ModernButton>
      </div>
    </div>
  );
}




