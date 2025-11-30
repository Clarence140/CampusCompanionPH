"use client";

import { useState, useEffect } from "react";
import ModernCard from "./ui/ModernCard";

export default function GoalPlanner({
  currentGrade,
  weights,
  wwAverage,
  ptAverage,
  qaScore = null,
}) {
  const [targetGrade, setTargetGrade] = useState(85);

  // Calculate required QA score
  const calculateRequiredQA = () => {
    if (!weights || !wwAverage || !ptAverage) return null;

    const wwContribution = parseFloat(wwAverage) * weights.ww;
    const ptContribution = parseFloat(ptAverage) * weights.pt;
    const currentTotal = wwContribution + ptContribution;

    const needed = targetGrade - currentTotal;
    const requiredQA = needed / weights.qa;

    return {
      required: requiredQA,
      isPossible: requiredQA >= 0 && requiredQA <= 100,
      currentTotal: currentTotal,
      needed: needed,
    };
  };

  const requiredInfo = calculateRequiredQA();

  if (!requiredInfo || qaScore !== null) return null; // Don't show if QA already entered

  const requiredQA = requiredInfo.required;
  const difficulty =
    requiredQA <= 60
      ? "easy"
      : requiredQA <= 80
      ? "medium"
      : requiredQA <= 95
      ? "hard"
      : "very-hard";

  const difficultyInfo = {
    easy: {
      emoji: "😊",
      color: "green",
      message: "You can do this! Just basic review needed.",
      tips: [
        "Review your notes",
        "Get good sleep the night before",
        "Stay confident and focused",
      ],
    },
    medium: {
      emoji: "💪",
      color: "blue",
      message: "Challenging but achievable! Structured study needed.",
      tips: [
        "Create a study schedule 2 weeks before",
        "Join a study group for motivation",
        "Practice with past exam questions",
        "Focus on key topics from Written Works",
      ],
    },
    hard: {
      emoji: "🔥",
      color: "orange",
      message: "This will require serious effort!",
      tips: [
        "Ask your teacher for help immediately",
        "Identify and focus on your weakest areas",
        "Consider asking about extra credit opportunities",
        "Form a dedicated study group",
        "Review all lessons thoroughly",
      ],
    },
    "very-hard": {
      emoji: "🚨",
      color: "red",
      message:
        "Very difficult target. Consider adjusting goals or seeking help.",
      tips: [
        "Talk to your teacher ASAP about options",
        "Focus only on the most important topics",
        "Don't lose hope - every point counts!",
        "Ask about remedial activities or extra credit",
        "Inform your parents and seek their support",
      ],
    },
  };

  const info = difficultyInfo[difficulty];

  return (
    <ModernCard
      className={`p-6 border-l-4 border-${info.color}-500 mb-6`}
      elevation="md"
    >
      <div className="flex items-start gap-4">
        <div className="text-5xl flex-shrink-0">{info.emoji}</div>

        <div className="flex-1">
          <h3 className="font-bold text-2xl mb-2 text-gray-900">
            Quarterly Assessment Goal Setter
          </h3>
          <p className="text-gray-700 mb-6">
            Based on your current scores (WW: {wwAverage.toFixed(1)}%, PT:{" "}
            {ptAverage.toFixed(1)}%), adjust your target final grade to see what
            you need on your Quarterly Assessment.
          </p>

          {/* Target Grade Slider */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2 text-gray-600">
              <span>75% (Pass)</span>
              <span className="font-semibold text-primary-600">
                Target: {targetGrade}%
              </span>
              <span>100% (Perfect)</span>
            </div>
            <input
              type="range"
              min="75"
              max="100"
              value={targetGrade}
              onChange={(e) => setTargetGrade(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb:appearance-none slider-thumb:w-5 slider-thumb:h-5 slider-thumb:rounded-full slider-thumb:bg-primary-600 slider-thumb:cursor-pointer slider-thumb:shadow-lg"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${
                  ((targetGrade - 75) / 25) * 100
                }%, #e5e7eb ${((targetGrade - 75) / 25) * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>

          {/* Required Score Display */}
          <div
            className={`p-5 bg-${info.color}-50 rounded-xl mb-6 border-2 border-${info.color}-200`}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {requiredQA.toFixed(1)}% on Quarterly Assessment
              </div>
              <div className={`text-${info.color}-700 font-semibold text-lg`}>
                {info.message}
              </div>
            </div>
          </div>

          {/* Current Status Breakdown */}
          <div className="bg-white border rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-3 text-gray-900">
              Current Status Breakdown:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Total (WW + PT):</span>
                <span className="font-semibold">
                  {requiredInfo.currentTotal.toFixed(2)} points
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Needed to reach {targetGrade}%:
                </span>
                <span className="font-semibold">
                  {requiredInfo.needed.toFixed(2)} points
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Available from QA ({weights.qa * 100}%):
                </span>
                <span className="font-semibold">
                  {requiredQA.toFixed(1)} points
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-900 font-semibold">
                  Required QA Score:
                </span>
                <span className={`font-bold text-lg text-${info.color}-600`}>
                  {requiredQA.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Actionable Tips */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-gray-900">
              Recommended Action Plan:
            </h4>
            <div className="space-y-2">
              {info.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 bg-${info.color}-500 rounded-full mt-2 flex-shrink-0`}
                  />
                  <span className="text-sm text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Gauge Visual */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Easy</span>
              <span>Medium</span>
              <span>Hard</span>
              <span>Very Hard</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-success-400"></div>
                <div className="flex-1 bg-primary-400"></div>
                <div className="flex-1 bg-warning-400"></div>
                <div className="flex-1 bg-danger-400"></div>
              </div>
              <div
                className={`absolute top-0 bottom-0 w-1 bg-${info.color}-600 shadow-lg`}
                style={{
                  left: `${Math.min(
                    Math.max(((requiredQA - 0) / 100) * 100, 0),
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </ModernCard>
  );
}
