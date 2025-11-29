"use client";

export default function ProgressBar({ steps, currentStep }) {
  const stepNames = [
    "Basic Info",
    "Written Works",
    "Performance Tasks",
    "Quarterly Exam",
    "Results",
  ];

  const getStepIndex = (step) => {
    const stepMap = {
      setup: 0,
      "written-works": 1,
      "performance-tasks": 2,
      "quarterly-assessment": 3,
      results: 4,
    };
    return stepMap[step] || 0;
  };

  const currentIndex = getStepIndex(currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      {/* Step Labels */}
      <div className="flex justify-between mb-3 text-sm text-gray-600">
        {stepNames.slice(0, steps.length).map((name, index) => (
          <span
            key={index}
            className={`font-medium ${
              index <= currentIndex ? "text-primary-600" : "text-gray-400"
            }`}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-600 to-primary-700 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mt-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index <= currentIndex
                ? "bg-primary-600 scale-125"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


