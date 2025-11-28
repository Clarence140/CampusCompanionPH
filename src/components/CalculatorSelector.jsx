"use client";

import { useState } from "react";
import ModernCard from "./ui/ModernCard";
import ModernButton from "./ui/ModernButton";
import GradeLevelCard from "./GradeLevelCard";

export default function CalculatorSelector({
  onSelectCalculator,
  recentCalculation = null,
}) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [secondarySelection, setSecondarySelection] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setSecondarySelection(null); // Reset secondary selection
  };

  const handleSecondarySelect = (value) => {
    setSecondarySelection(value);
  };

  const handleProceed = () => {
    if (selectedLevel === "k12" && secondarySelection) {
      onSelectCalculator({
        type: "k12",
        gradeLevel: secondarySelection,
      });
    } else if (selectedLevel === "college" && secondarySelection) {
      onSelectCalculator({
        type: "tertiary",
        gradingScale: secondarySelection,
      });
    } else if (selectedLevel === "custom") {
      onSelectCalculator({
        type: "term-based",
      });
    }
  };

  const k12GradeLevels = [
    { value: "elementary", label: "Elementary (Grades 1-6)", icon: "👶" },
    { value: "jhs", label: "Junior High (Grades 7-10)", icon: "🧒" },
    { value: "shs", label: "Senior High (Grades 11-12)", icon: "🎓" },
  ];

  const collegeScales = [
    { value: "1-5", label: "1.0 - 5.0 Scale", icon: "📊" },
    { value: "1-4", label: "1.0 - 4.0 Scale (UP System)", icon: "🏛️" },
    { value: "percentage", label: "Percentage (%)", icon: "📈" },
  ];

  const canProceed =
    (selectedLevel === "k12" && secondarySelection) ||
    (selectedLevel === "college" && secondarySelection) ||
    selectedLevel === "custom";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Quick Calculate Card */}
      <ModernCard
        hover
        elevation="lg"
        gradient
        className="p-6 sm:p-8 border-l-4 border-primary-500"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Calculate Your Final Grade
            </h3>
            <p className="text-gray-600 mb-4">
              Get instant grade calculations with DepEd-compliant formulas and
              actionable insights to improve your performance.
            </p>
            <ModernButton
              variant="primary"
              size="lg"
              onClick={() => {
                // Default to K-12 JHS
                onSelectCalculator({ type: "k12", gradeLevel: "jhs" });
              }}
            >
              Quick Calculate
            </ModernButton>
          </div>
          <div className="text-6xl ml-4">📊</div>
        </div>
      </ModernCard>

      {/* Recent Calculation Snapshot */}
      {recentCalculation && (
        <ModernCard className="p-4 bg-primary-50/50 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your Last Calculation</p>
              <p className="text-lg font-semibold text-gray-900">
                {recentCalculation.subject} - {recentCalculation.grade}
              </p>
            </div>
            <ModernButton
              variant="outline"
              size="sm"
              onClick={() => {
                onSelectCalculator({
                  type: recentCalculation.type,
                  ...recentCalculation.metadata,
                });
              }}
            >
              View
            </ModernButton>
          </div>
        </ModernCard>
      )}

      {/* Primary Selection */}
      <ModernCard className="p-6 sm:p-8" elevation="md">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          What is your educational level?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <GradeLevelCard
            icon="🏫"
            title="K-12 (DepEd)"
            subtitle="Elementary to Senior High"
            isSelected={selectedLevel === "k12"}
            onClick={() => handleLevelSelect("k12")}
          />
          <GradeLevelCard
            icon="🎓"
            title="College/University"
            subtitle="Tertiary Education"
            isSelected={selectedLevel === "college"}
            onClick={() => handleLevelSelect("college")}
          />
          <GradeLevelCard
            icon="📅"
            title="Custom Term System"
            subtitle="Special grading periods"
            isSelected={selectedLevel === "custom"}
            onClick={() => handleLevelSelect("custom")}
          />
        </div>
      </ModernCard>

      {/* Secondary Selection - K-12 */}
      {selectedLevel === "k12" && (
        <ModernCard className="p-6 sm:p-8 animate-fade-in" elevation="md">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Select your Grade Level
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {k12GradeLevels.map((level) => (
              <GradeLevelCard
                key={level.value}
                icon={level.icon}
                title={level.label.split(" ")[0]}
                subtitle={level.label.split(" ").slice(1).join(" ")}
                isSelected={secondarySelection === level.value}
                onClick={() => handleSecondarySelect(level.value)}
              />
            ))}
          </div>
        </ModernCard>
      )}

      {/* Secondary Selection - College */}
      {selectedLevel === "college" && (
        <ModernCard className="p-6 sm:p-8 animate-fade-in" elevation="md">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            What is your grading scale?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {collegeScales.map((scale) => (
              <GradeLevelCard
                key={scale.value}
                icon={scale.icon}
                title={scale.label.split(" ")[0]}
                subtitle={scale.label.split(" ").slice(1).join(" ")}
                isSelected={secondarySelection === scale.value}
                onClick={() => handleSecondarySelect(scale.value)}
              />
            ))}
          </div>
        </ModernCard>
      )}

      {/* Proceed Button */}
      {canProceed && (
        <div className="flex justify-center animate-fade-in pt-4">
          <ModernButton variant="primary" size="lg" onClick={handleProceed}>
            Start Calculator →
          </ModernButton>
        </div>
      )}
    </div>
  );
}

