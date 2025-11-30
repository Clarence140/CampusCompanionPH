"use client";

import ModernCard from "../ui/ModernCard";
import ModernButton from "../ui/ModernButton";
import ModernSelect from "../ui/ModernSelect";
import { FiBook } from "react-icons/fi";

export default function SetupStep({ gradeLevel, setGradeLevel, onComplete }) {
  const gradeLevelOptions = [
    { value: "1", label: "Grade 1" },
    { value: "2", label: "Grade 2" },
    { value: "3", label: "Grade 3" },
    { value: "4", label: "Grade 4" },
    { value: "5", label: "Grade 5" },
    { value: "6", label: "Grade 6" },
    { value: "7", label: "Grade 7 (JHS)" },
    { value: "8", label: "Grade 8 (JHS)" },
    { value: "9", label: "Grade 9 (JHS)" },
    { value: "10", label: "Grade 10 (JHS)" },
    { value: "shs", label: "Senior High School (SHS)" },
  ];

  const gradeWeights = {
    1: { ww: 0.3, pt: 0.5, qa: 0.2 },
    2: { ww: 0.3, pt: 0.5, qa: 0.2 },
    3: { ww: 0.3, pt: 0.5, qa: 0.2 },
    4: { ww: 0.3, pt: 0.5, qa: 0.2 },
    5: { ww: 0.3, pt: 0.5, qa: 0.2 },
    6: { ww: 0.3, pt: 0.5, qa: 0.2 },
    7: { ww: 0.4, pt: 0.4, qa: 0.2 },
    8: { ww: 0.4, pt: 0.4, qa: 0.2 },
    9: { ww: 0.4, pt: 0.4, qa: 0.2 },
    10: { ww: 0.4, pt: 0.4, qa: 0.2 },
    shs: { ww: 0.5, pt: 0.3, qa: 0.2 },
  };

  const weights = gradeWeights[gradeLevel] || gradeWeights[1];

  return (
    <ModernCard className="p-6" elevation="md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary-100 rounded-xl">
          <FiBook className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-900">Basic Information</h3>
          <p className="text-gray-600">
            Select your grade level to get started
          </p>
        </div>
      </div>

      {/* Grade Level Selection */}
      <div className="mb-6">
        <ModernSelect
          label="Grade Level"
          icon={<FiBook className="w-5 h-5" />}
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          options={gradeLevelOptions}
        />
      </div>

      {/* Weight Display */}
      <ModernCard className="p-4 bg-primary-50/50 border-primary-200 mb-6">
        <h4 className="font-semibold text-primary-900 mb-3">
          Grade Weights for Your Level:
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {weights.ww * 100}%
            </div>
            <div className="text-sm text-gray-600">Written Works</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {weights.pt * 100}%
            </div>
            <div className="text-sm text-gray-600">Performance Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {weights.qa * 100}%
            </div>
            <div className="text-sm text-gray-600">Quarterly Assessment</div>
          </div>
        </div>
      </ModernCard>

      {/* Navigation */}
      <div className="flex justify-end">
        <ModernButton variant="primary" onClick={onComplete}>
          Continue to Written Works →
        </ModernButton>
      </div>
    </ModernCard>
  );
}
