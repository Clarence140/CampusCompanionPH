"use client";

import { useState } from "react";
import ModernCard from "./ui/ModernCard";
import ModernButton from "./ui/ModernButton";
import GradeLevelCard from "./GradeLevelCard";

export default function SmartOnboarding({ onComplete, onSkip }) {
  const [step, setStep] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const steps = [
    {
      title: "Welcome to Campus Companion! 👋",
      subtitle: "Your personal grade calculator for Filipino students",
      icon: "🎓",
      content: (
        <div className="text-center py-4">
          <div className="text-6xl mb-6">🎓</div>
          <p className="text-gray-700 text-lg">
            We'll help you calculate your grades and understand how to improve
            them.
          </p>
          <p className="text-gray-600 mt-4">
            Let's get started with just a few simple questions.
          </p>
        </div>
      ),
    },
    {
      title: "What's your grade level?",
      subtitle: "Choose your educational level",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <GradeLevelCard
            icon="🏫"
            title="K-12 Student"
            subtitle="Grades 1-12"
            isSelected={selectedLevel === "k12"}
            onClick={() => setSelectedLevel("k12")}
          />
          <GradeLevelCard
            icon="🎓"
            title="College Student"
            subtitle="Tertiary Level"
            isSelected={selectedLevel === "college"}
            onClick={() => setSelectedLevel("college")}
          />
          <GradeLevelCard
            icon="📅"
            title="Custom System"
            subtitle="Special grading"
            isSelected={selectedLevel === "custom"}
            onClick={() => setSelectedLevel("custom")}
          />
        </div>
      ),
    },
    {
      title: "You're all set!",
      subtitle: "Let's start calculating your grades",
      content: (
        <div className="text-center py-4">
          <div className="text-5xl mb-4">✨</div>
          <p className="text-gray-700">
            Ready to help you succeed academically!
          </p>
        </div>
      ),
    },
  ];

  const handleContinue = () => {
    if (step === steps.length - 1) {
      if (onComplete) {
        onComplete(selectedLevel);
      }
    } else {
      if (step === 1 && !selectedLevel) {
        // Don't allow continuing without selection
        return;
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentStep = steps[step];

  return (
    <ModernCard className="p-8 text-center max-w-3xl mx-auto" elevation="lg">
      {/* Step Indicators */}
      <div className="flex justify-center mb-8">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index < steps.length - 1 ? "mr-4" : ""
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === step
                  ? "bg-primary-600 w-8"
                  : index < step
                  ? "bg-primary-400"
                  : "bg-gray-300"
              }`}
            />
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-1 transition-all duration-300 ${
                  index < step ? "bg-primary-400" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {currentStep.title}
        </h2>
        <p className="text-gray-600 mb-6">{currentStep.subtitle}</p>
        {currentStep.content}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <div className="flex-1">
          {onSkip && step === 0 && (
            <ModernButton variant="ghost" onClick={onSkip}>
              Skip for now
            </ModernButton>
          )}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <ModernButton variant="outline" onClick={handleBack}>
              Back
            </ModernButton>
          )}
          <ModernButton
            variant="primary"
            onClick={handleContinue}
            disabled={step === 1 && !selectedLevel}
          >
            {step === steps.length - 1 ? "Get Started" : "Continue"}
          </ModernButton>
        </div>
      </div>
    </ModernCard>
  );
}

