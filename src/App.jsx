"use client";

import { useState, useEffect } from "react";
import {
  FiSun,
  FiMoon,
  FiInfo,
  FiPlus,
  FiTrash2,
  FiCoffee,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Support from "./components/Support";

function K12Calculator({ darkMode, getMotivationalMessage }) {
  const [gradeLevel, setGradeLevel] = useState("1");
  const [subjectType, setSubjectType] = useState("core");
  const [writtenWorks, setWrittenWorks] = useState([
    { name: "", score: "", maxScore: "" },
  ]);
  const [performanceTasks, setPerformanceTasks] = useState([
    { name: "", score: "", maxScore: "" },
  ]);
  const [quarterlyAssessment, setQuarterlyAssessment] = useState({
    score: "",
    maxScore: "",
  });

  // Grade level weights from DepEd Order No. 8, s. 2015
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

  const calculateFinalGrade = () => {
    const weights = gradeWeights[gradeLevel];

    // Calculate Written Works average
    const wwScores = writtenWorks.filter((w) => w.score && w.maxScore);
    const wwAverage =
      wwScores.length > 0
        ? wwScores.reduce(
            (sum, w) =>
              sum +
              (Number.parseFloat(w.score) / Number.parseFloat(w.maxScore)) *
                100,
            0
          ) / wwScores.length
        : 0;

    // Calculate Performance Tasks average
    const ptScores = performanceTasks.filter((p) => p.score && p.maxScore);
    const ptAverage =
      ptScores.length > 0
        ? ptScores.reduce(
            (sum, p) =>
              sum +
              (Number.parseFloat(p.score) / Number.parseFloat(p.maxScore)) *
                100,
            0
          ) / ptScores.length
        : 0;

    // Calculate Quarterly Assessment
    const qaScore =
      quarterlyAssessment.score && quarterlyAssessment.maxScore
        ? (Number.parseFloat(quarterlyAssessment.score) /
            Number.parseFloat(quarterlyAssessment.maxScore)) *
          100
        : 0;

    // Calculate final grade
    const finalGrade =
      wwAverage * weights.ww + ptAverage * weights.pt + qaScore * weights.qa;

    return {
      wwAverage: wwAverage.toFixed(2),
      ptAverage: ptAverage.toFixed(2),
      qaScore: qaScore.toFixed(2),
      finalGrade: finalGrade.toFixed(2),
    };
  };

  const addWrittenWork = () => {
    setWrittenWorks([...writtenWorks, { name: "", score: "", maxScore: "" }]);
  };

  const addPerformanceTask = () => {
    setPerformanceTasks([
      ...performanceTasks,
      { name: "", score: "", maxScore: "" },
    ]);
  };

  const removeWrittenWork = (index) => {
    const newWorks = writtenWorks.filter((_, i) => i !== index);
    setWrittenWorks(newWorks);
  };

  const removePerformanceTask = (index) => {
    const newTasks = performanceTasks.filter((_, i) => i !== index);
    setPerformanceTasks(newTasks);
  };

  const updateWrittenWork = (index, field, value) => {
    const newWorks = [...writtenWorks];
    newWorks[index][field] = value;
    setWrittenWorks(newWorks);
  };

  const updatePerformanceTask = (index, field, value) => {
    const newTasks = [...performanceTasks];
    newTasks[index][field] = value;
    setPerformanceTasks(newTasks);
  };

  const grades = calculateFinalGrade();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Grade Level</label>
          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "border-gray-600 bg-gray-800 text-gray-100"
                : "border-gray-300 bg-white text-gray-900"
            }`}
          >
            {Object.keys(gradeWeights).map((level) => (
              <option key={level} value={level}>
                {level === "shs" ? "Senior High School" : `Grade ${level}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Subject Type</label>
          <select
            value={subjectType}
            onChange={(e) => setSubjectType(e.target.value)}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "border-gray-600 bg-gray-800 text-gray-100"
                : "border-gray-300 bg-white text-gray-900"
            }`}
          >
            <option value="core">Core Subject</option>
            <option value="applied">Applied Track</option>
            <option value="specialized">Specialized Subject</option>
          </select>
        </div>
      </div>

      {/* Written Works Section */}
      <div
        className={`border rounded-lg p-4 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3 className="font-semibold text-lg mb-3">
          Written Works ({gradeWeights[gradeLevel].ww * 100}%)
        </h3>
        {writtenWorks.map((work, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3"
          >
            <input
              type="text"
              placeholder="Assignment name"
              value={work.name}
              onChange={(e) => updateWrittenWork(index, "name", e.target.value)}
              className={`p-2 border rounded ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
            <input
              type="number"
              placeholder="Score"
              value={work.score}
              onChange={(e) =>
                updateWrittenWork(index, "score", e.target.value)
              }
              className={`p-2 border rounded ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
            <input
              type="number"
              placeholder="Max Score"
              value={work.maxScore}
              onChange={(e) =>
                updateWrittenWork(index, "maxScore", e.target.value)
              }
              className={`p-2 border rounded ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
            <button
              onClick={() => removeWrittenWork(index)}
              className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
        <button
          onClick={addWrittenWork}
          className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <FiPlus className="inline mr-1" /> Add Written Work
        </button>
      </div>

      {/* Performance Tasks Section */}
      <div
        className={`border rounded-lg p-4 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3 className="font-semibold text-lg mb-3">
          Performance Tasks ({gradeWeights[gradeLevel].pt * 100}%)
        </h3>
        {performanceTasks.map((task, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3"
          >
            <input
              type="text"
              placeholder="Task name"
              value={task.name}
              onChange={(e) =>
                updatePerformanceTask(index, "name", e.target.value)
              }
              className={`p-2 border rounded ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
            <input
              type="number"
              placeholder="Score"
              value={task.score}
              onChange={(e) =>
                updatePerformanceTask(index, "score", e.target.value)
              }
              className={`p-2 border rounded ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
            <input
              type="number"
              placeholder="Max Score"
              value={task.maxScore}
              onChange={(e) =>
                updatePerformanceTask(index, "maxScore", e.target.value)
              }
              className={`p-2 border rounded ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
            <button
              onClick={() => removePerformanceTask(index)}
              className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
        <button
          onClick={addPerformanceTask}
          className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <FiPlus className="inline mr-1" /> Add Performance Task
        </button>
      </div>

      {/* Quarterly Assessment Section */}
      <div
        className={`border rounded-lg p-4 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3 className="font-semibold text-lg mb-3">
          Quarterly Assessment ({gradeWeights[gradeLevel].qa * 100}%)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Score"
            value={quarterlyAssessment.score}
            onChange={(e) =>
              setQuarterlyAssessment({
                ...quarterlyAssessment,
                score: e.target.value,
              })
            }
            className={`p-2 border rounded ${
              darkMode
                ? "border-gray-600 bg-gray-800 text-gray-100"
                : "border-gray-300 bg-white text-gray-900"
            }`}
          />
          <input
            type="number"
            placeholder="Max Score"
            value={quarterlyAssessment.maxScore}
            onChange={(e) =>
              setQuarterlyAssessment({
                ...quarterlyAssessment,
                maxScore: e.target.value,
              })
            }
            className={`p-2 border rounded ${
              darkMode
                ? "border-gray-600 bg-gray-800 text-gray-100"
                : "border-gray-300 bg-white text-gray-900"
            }`}
          />
        </div>
      </div>

      {/* Results Section */}
      {grades.finalGrade > 0 && (
        <div
          className={`border rounded-lg p-6 mt-6 ${
            darkMode
              ? "border-blue-800 bg-blue-900/20"
              : "border-blue-200 bg-blue-50"
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800 dark:text-blue-200">
            Final Grade: {grades.finalGrade}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Written Works
              </p>
              <p className="text-xl font-semibold">{grades.wwAverage}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Performance Tasks
              </p>
              <p className="text-xl font-semibold">{grades.ptAverage}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quarterly Assessment
              </p>
              <p className="text-xl font-semibold">{grades.qaScore}%</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm italic">
              {getMotivationalMessage(Number.parseFloat(grades.finalGrade))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function TertiaryCalculator({ darkMode, getMotivationalMessage }) {
  const [subjects, setSubjects] = useState([
    { name: "", grade: "", units: "" },
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { name: "", grade: "", units: "" }]);
  };

  const removeSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const updateSubject = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const calculateGPA = () => {
    const validSubjects = subjects.filter((s) => s.grade && s.units);
    if (validSubjects.length === 0) return 0;

    const totalPoints = validSubjects.reduce((sum, subject) => {
      return (
        sum +
        Number.parseFloat(subject.grade) * Number.parseFloat(subject.units)
      );
    }, 0);

    const totalUnits = validSubjects.reduce((sum, subject) => {
      return sum + Number.parseFloat(subject.units);
    }, 0);

    return totalUnits > 0 ? totalPoints / totalUnits : 0;
  };

  const gpa = calculateGPA();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Subjects</h3>
        {subjects.map((subject, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Subject name"
                value={subject.name}
                onChange={(e) => updateSubject(index, "name", e.target.value)}
                className={`p-2 border rounded ${
                  darkMode
                    ? "border-gray-600 bg-gray-800 text-gray-100"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
              />
              <input
                type="number"
                placeholder="Grade (1.0-5.0)"
                value={subject.grade}
                onChange={(e) => updateSubject(index, "grade", e.target.value)}
                step="0.25"
                min="1.0"
                max="5.0"
                className={`p-2 border rounded ${
                  darkMode
                    ? "border-gray-600 bg-gray-800 text-gray-100"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
              />
              <input
                type="number"
                placeholder="Units"
                value={subject.units}
                onChange={(e) => updateSubject(index, "units", e.target.value)}
                min="0"
                step="0.5"
                className={`p-2 border rounded ${
                  darkMode
                    ? "border-gray-600 bg-gray-800 text-gray-100"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
              />
              <button
                onClick={() => removeSubject(index)}
                className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addSubject}
          className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <FiPlus className="inline mr-1" /> Add Subject
        </button>
      </div>

      {gpa > 0 && (
        <div
          className={`border rounded-lg p-6 mt-6 ${
            darkMode
              ? "border-blue-800 bg-blue-900/20"
              : "border-blue-200 bg-blue-50"
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800 dark:text-blue-200">
            GPA: {gpa.toFixed(2)}
          </h2>
          <div className="text-center">
            <p className="text-sm italic">
              {getMotivationalMessage(gpa, true)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function TermBasedCalculator({ darkMode, getMotivationalMessage }) {
  const [subjects, setSubjects] = useState([
    {
      name: "",
      units: "",
      weights: {
        prelim: 20,
        midterm: 20,
        prefinal: 20,
        final: 40,
      },
      grades: {
        prelim: "",
        midterm: "",
        prefinal: "",
        final: "",
      },
      targetGrade: "",
      collapsed: false,
    },
  ]);

  const [weightError, setWeightError] = useState("");

  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        name: "",
        units: "",
        weights: {
          prelim: 20,
          midterm: 20,
          prefinal: 20,
          final: 40,
        },
        grades: {
          prelim: "",
          midterm: "",
          prefinal: "",
          final: "",
        },
        targetGrade: "",
        collapsed: false,
      },
    ]);
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const toggleSubjectCollapse = (index) => {
    const newSubjects = [...subjects];
    newSubjects[index].collapsed = !newSubjects[index].collapsed;
    setSubjects(newSubjects);
  };

  const handleWeightChange = (subjectIndex, term, value) => {
    const newSubjects = [...subjects];
    newSubjects[subjectIndex].weights[term] = Number.parseFloat(value) || 0;

    // Validate weights sum to 100
    const weights = newSubjects[subjectIndex].weights;
    const total =
      weights.prelim + weights.midterm + weights.prefinal + weights.final;

    if (total !== 100) {
      setWeightError(`Weights must sum to 100% (current: ${total}%)`);
    } else {
      setWeightError("");
    }

    setSubjects(newSubjects);
  };

  const handleGradeChange = (subjectIndex, term, value) => {
    const newSubjects = [...subjects];
    newSubjects[subjectIndex].grades[term] = value;
    setSubjects(newSubjects);
  };

  const calculateCurrentGrade = (subject) => {
    const { weights, grades } = subject;
    let total = 0;
    let totalWeight = 0;

    // Calculate based on completed terms
    if (grades.prelim) {
      total += (Number.parseFloat(grades.prelim) || 0) * (weights.prelim / 100);
      totalWeight += weights.prelim;
    }
    if (grades.midterm) {
      total +=
        (Number.parseFloat(grades.midterm) || 0) * (weights.midterm / 100);
      totalWeight += weights.midterm;
    }
    if (grades.prefinal) {
      total +=
        (Number.parseFloat(grades.prefinal) || 0) * (weights.prefinal / 100);
      totalWeight += weights.prefinal;
    }

    if (totalWeight === 0) return null;

    return {
      currentGrade: total / (totalWeight / 100),
      completedWeight: totalWeight,
    };
  };

  const calculateRequiredFinalGrade = (subject) => {
    if (!subject.targetGrade) return null;

    const target = Number.parseFloat(subject.targetGrade);
    if (isNaN(target)) return null;

    const current = calculateCurrentGrade(subject);
    if (!current) return null;

    const remainingWeight = 100 - current.completedWeight;
    if (remainingWeight <= 0) return null;

    const required =
      (target - current.currentGrade * (current.completedWeight / 100)) /
      (remainingWeight / 100);

    return {
      required,
      isPossible: required >= 0 && required <= 100,
    };
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Subjects</h3>
        {subjects.map((subject, index) => {
          const currentGrade = calculateCurrentGrade(subject);
          const requiredFinal = calculateRequiredFinalGrade(subject);

          return (
            <div
              key={index}
              className={`border rounded-lg p-4 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              {/* Subject Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-lg">
                  {subject.name || `Subject ${index + 1}`}
                </h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSubjectCollapse(index)}
                    className={`flex items-center px-3 py-1 rounded-lg transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    {subject.collapsed ? (
                      <>
                        <FiChevronDown className="mr-1" /> Show Details
                      </>
                    ) : (
                      <>
                        <FiChevronUp className="mr-1" /> Hide Details
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleRemoveSubject(index)}
                    className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              {!subject.collapsed && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Subject Name
                      </label>
                      <input
                        type="text"
                        className={`w-full p-2 border rounded ${
                          darkMode
                            ? "border-gray-600 bg-gray-800 text-gray-100"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                        value={subject.name}
                        onChange={(e) =>
                          handleSubjectChange(index, "name", e.target.value)
                        }
                        placeholder="e.g., Math 101"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Units
                        <span
                          className="ml-1 cursor-help"
                          title="Credit units for this subject"
                        >
                          <FiInfo size={14} />
                        </span>
                      </label>
                      <input
                        type="number"
                        className={`w-full p-2 border rounded ${
                          darkMode
                            ? "border-gray-600 bg-gray-800 text-gray-100"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                        value={subject.units}
                        onChange={(e) =>
                          handleSubjectChange(index, "units", e.target.value)
                        }
                        placeholder="0"
                        min="0"
                        step="0.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Target Grade
                      </label>
                      <input
                        type="number"
                        className={`w-full p-2 border rounded ${
                          darkMode
                            ? "border-gray-600 bg-gray-800 text-gray-100"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                        value={subject.targetGrade}
                        onChange={(e) =>
                          handleSubjectChange(
                            index,
                            "targetGrade",
                            e.target.value
                          )
                        }
                        placeholder="0"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Term Weights</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Prelim (%)
                        </label>
                        <input
                          type="number"
                          className={`w-full p-2 border rounded ${
                            darkMode
                              ? "border-gray-600 bg-gray-800 text-gray-100"
                              : "border-gray-300 bg-white text-gray-900"
                          }`}
                          value={subject.weights.prelim}
                          onChange={(e) =>
                            handleWeightChange(index, "prelim", e.target.value)
                          }
                          min="0"
                          max="100"
                          step="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Midterm (%)
                        </label>
                        <input
                          type="number"
                          className={`w-full p-2 border rounded ${
                            darkMode
                              ? "border-gray-600 bg-gray-800 text-gray-100"
                              : "border-gray-300 bg-white text-gray-900"
                          }`}
                          value={subject.weights.midterm}
                          onChange={(e) =>
                            handleWeightChange(index, "midterm", e.target.value)
                          }
                          min="0"
                          max="100"
                          step="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Pre-Final (%)
                        </label>
                        <input
                          type="number"
                          className={`w-full p-2 border rounded ${
                            darkMode
                              ? "border-gray-600 bg-gray-800 text-gray-100"
                              : "border-gray-300 bg-white text-gray-900"
                          }`}
                          value={subject.weights.prefinal}
                          onChange={(e) =>
                            handleWeightChange(
                              index,
                              "prefinal",
                              e.target.value
                            )
                          }
                          min="0"
                          max="100"
                          step="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Final (%)
                        </label>
                        <input
                          type="number"
                          className={`w-full p-2 border rounded ${
                            darkMode
                              ? "border-gray-600 bg-gray-800 text-gray-100"
                              : "border-gray-300 bg-white text-gray-900"
                          }`}
                          value={subject.weights.final}
                          onChange={(e) =>
                            handleWeightChange(index, "final", e.target.value)
                          }
                          min="0"
                          max="100"
                          step="1"
                        />
                      </div>
                    </div>
                    {weightError && (
                      <p className="text-red-500 text-sm mt-2">{weightError}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div
                      className={`p-3 rounded ${
                        darkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <h4 className="font-medium mb-2">Prelim Grade</h4>
                      <input
                        type="number"
                        className={`w-full p-2 border rounded ${
                          darkMode
                            ? "border-gray-600 bg-gray-800 text-gray-100"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                        value={subject.grades.prelim}
                        onChange={(e) =>
                          handleGradeChange(index, "prelim", e.target.value)
                        }
                        placeholder="0"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>

                    <div
                      className={`p-3 rounded ${
                        darkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <h4 className="font-medium mb-2">Midterm Grade</h4>
                      <input
                        type="number"
                        className={`w-full p-2 border rounded ${
                          darkMode
                            ? "border-gray-600 bg-gray-800 text-gray-100"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                        value={subject.grades.midterm}
                        onChange={(e) =>
                          handleGradeChange(index, "midterm", e.target.value)
                        }
                        placeholder="0"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>

                    <div
                      className={`p-3 rounded ${
                        darkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <h4 className="font-medium mb-2">Pre-Final Grade</h4>
                      <input
                        type="number"
                        className={`w-full p-2 border rounded ${
                          darkMode
                            ? "border-gray-600 bg-gray-800 text-gray-100"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                        value={subject.grades.prefinal}
                        onChange={(e) =>
                          handleGradeChange(index, "prefinal", e.target.value)
                        }
                        placeholder="0"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>

                    <div
                      className={`p-3 rounded ${
                        darkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <h4 className="font-medium mb-2">Final Grade</h4>
                      <input
                        type="number"
                        className={`w-full p-2 border rounded ${
                          darkMode
                            ? "border-gray-600 bg-gray-800 text-gray-100"
                            : "border-gray-300 bg-white text-gray-900"
                        }`}
                        value={subject.grades.final}
                        onChange={(e) =>
                          handleGradeChange(index, "final", e.target.value)
                        }
                        placeholder="0"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {(currentGrade || requiredFinal) && (
                    <div
                      className={`mt-4 p-4 rounded-lg ${
                        darkMode
                          ? "bg-blue-900/20 border-blue-800"
                          : "bg-blue-50 border-blue-200"
                      } border`}
                    >
                      <h4 className="font-semibold mb-2">Grade Projection</h4>

                      {currentGrade && (
                        <p className="mb-2">
                          Current Weighted Grade:{" "}
                          <span className="font-bold">
                            {currentGrade.currentGrade.toFixed(2)}%
                          </span>{" "}
                          (based on {currentGrade.completedWeight}% of total
                          weight)
                        </p>
                      )}

                      {requiredFinal && (
                        <div
                          className={`p-3 rounded ${
                            darkMode ? "bg-gray-800" : "bg-gray-100"
                          }`}
                        >
                          <p>
                            To achieve your target grade of{" "}
                            <span className="font-bold">
                              {subject.targetGrade}%
                            </span>
                            , you need:
                          </p>
                          <p className="text-xl font-bold mt-2">
                            {requiredFinal.isPossible ? (
                              <span className="text-blue-600 dark:text-blue-400">
                                {requiredFinal.required.toFixed(2)}% in Final
                              </span>
                            ) : (
                              <span className="text-red-500">
                                Target not possible with current grades
                              </span>
                            )}
                          </p>
                          {!requiredFinal.isPossible && (
                            <p className="text-sm mt-1">
                              Your current grades are too low to reach this
                              target. Consider adjusting your expectations or
                              focusing on extra credit opportunities.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Collapsed Summary */}
              {subject.collapsed && currentGrade && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Current Grade: {currentGrade.currentGrade.toFixed(2)}%
                  {subject.targetGrade && requiredFinal && (
                    <span className="ml-4">
                      Target: {subject.targetGrade}% | Need:{" "}
                      {requiredFinal.isPossible
                        ? `${requiredFinal.required.toFixed(2)}%`
                        : "Not possible"}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={handleAddSubject}
          className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <FiPlus className="inline mr-1" /> Add Subject
        </button>
      </div>

      {subjects.some((subject) => calculateCurrentGrade(subject)) && (
        <div
          className={`border rounded-lg p-6 mt-6 ${
            darkMode
              ? "border-blue-800 bg-blue-900/20"
              : "border-blue-200 bg-blue-50"
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800 dark:text-blue-200">
            Semester Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-4 rounded-lg shadow ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="font-semibold text-lg mb-3">Subject Grades</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead
                    className={`${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                  >
                    <tr>
                      <th className="px-4 py-2 text-left text-sm">Subject</th>
                      <th className="px-4 py-2 text-left text-sm">
                        Current Grade
                      </th>
                      <th className="px-4 py-2 text-left text-sm">Target</th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y divide-gray-200 dark:divide-gray-700 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    {subjects.map((subject, index) => {
                      const current = calculateCurrentGrade(subject);
                      if (!current) return null;

                      return (
                        <tr key={index}>
                          <td className="px-4 py-2">
                            {subject.name || `Subject ${index + 1}`}
                          </td>
                          <td className="px-4 py-2">
                            {current.currentGrade.toFixed(2)}%
                          </td>
                          <td className="px-4 py-2">
                            {subject.targetGrade
                              ? `${subject.targetGrade}%`
                              : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg shadow ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="font-semibold text-lg mb-3">
                Semester GPA Projection
              </h3>
              <div className="text-center py-4">
                <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                  {(
                    subjects.reduce((sum, subject) => {
                      const current = calculateCurrentGrade(subject);
                      if (!current) return sum;
                      return sum + current.currentGrade;
                    }, 0) /
                    subjects.filter((subject) => calculateCurrentGrade(subject))
                      .length
                  ).toFixed(2)}
                </p>
                <p className="text-lg mt-2">Average Grade</p>
                <p className="mt-4 text-sm italic">
                  {getMotivationalMessage(
                    subjects.reduce((sum, subject) => {
                      const current = calculateCurrentGrade(subject);
                      if (!current) return sum;
                      return sum + current.currentGrade;
                    }, 0) /
                      subjects.filter((subject) =>
                        calculateCurrentGrade(subject)
                      ).length,
                    true
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState("calculator");
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : false;
    } catch (error) {
      console.warn("Failed to load dark mode preference:", error);
      return false;
    }
  });
  const [activeTab, setActiveTab] = useState("k12");
  const [showInstructions, setShowInstructions] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    } catch (error) {
      console.warn("Failed to save dark mode preference:", error);
    }

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getMotivationalMessage = (grade, isTertiary = false) => {
    if (isTertiary) {
      if (grade <= 1.5)
        return "Summa Cum Laude potential! Your dedication is truly inspiring!";
      if (grade <= 1.75)
        return "Magna Cum Laude potential! Keep up the excellent work!";
      if (grade <= 2.0) return "Cum Laude potential! You're doing great!";
      if (grade <= 2.5) return "Very Good! You're on the right track!";
      if (grade <= 3.0)
        return "Good! With a little more effort, you can reach even higher!";
      if (grade <= 4.0)
        return "Satisfactory. There's room for improvement - you can do it!";
      return "Don't give up! Every challenge is an opportunity to learn and grow.";
    } else {
      if (grade >= 90) return "Outstanding! Your hard work is paying off!";
      if (grade >= 85) return "Very Satisfactory! Keep up the great work!";
      if (grade >= 80) return "Satisfactory! You're doing well!";
      if (grade >= 75)
        return "Fairly Satisfactory. Keep pushing - you can improve!";
      return "Don't be discouraged! Use this as motivation to work harder next time.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Campus Companion PH"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold font-chicle">
              Campus Companion PH
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setCurrentView("calculator")}
              className={`px-3 py-2 rounded transition-colors ${
                currentView === "calculator"
                  ? "bg-blue-700 dark:bg-blue-900"
                  : "hover:bg-blue-700 dark:hover:bg-blue-900"
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setCurrentView("about")}
              className={`px-3 py-2 rounded transition-colors ${
                currentView === "about"
                  ? "bg-blue-700 dark:bg-blue-900"
                  : "hover:bg-blue-700 dark:hover:bg-blue-900"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setCurrentView("faq")}
              className={`px-3 py-2 rounded transition-colors ${
                currentView === "faq"
                  ? "bg-blue-700 dark:bg-blue-900"
                  : "hover:bg-blue-700 dark:hover:bg-blue-900"
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setCurrentView("support")}
              className={`px-3 py-2 rounded transition-colors flex items-center ${
                currentView === "support"
                  ? "bg-blue-700 dark:bg-blue-900"
                  : "hover:bg-blue-700 dark:hover:bg-blue-900"
              }`}
            >
              <FiCoffee className="mr-1" /> Support
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1">
                <div
                  className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></div>
              </div>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-16 right-4 bg-blue-700 dark:bg-blue-900 rounded-lg shadow-lg py-2 z-50 min-w-[150px] md:hidden">
              <button
                onClick={() => {
                  setCurrentView("calculator");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-950 transition-colors ${
                  currentView === "calculator"
                    ? "bg-blue-800 dark:bg-blue-950"
                    : ""
                }`}
              >
                Calculator
              </button>
              <button
                onClick={() => {
                  setCurrentView("about");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-950 transition-colors ${
                  currentView === "about" ? "bg-blue-800 dark:bg-blue-950" : ""
                }`}
              >
                About
              </button>
              <button
                onClick={() => {
                  setCurrentView("faq");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-950 transition-colors ${
                  currentView === "faq" ? "bg-blue-800 dark:bg-blue-950" : ""
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  setCurrentView("support");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-blue-800 dark:hover:bg-blue-950 transition-colors flex items-center ${
                  currentView === "support"
                    ? "bg-blue-800 dark:bg-blue-950"
                    : ""
                }`}
              >
                <FiCoffee className="mr-2" /> Support
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4">
        {currentView === "about" ? (
          <div className="py-8">
            <About darkMode={darkMode} />
          </div>
        ) : currentView === "faq" ? (
          <div className="py-8">
            <FAQ darkMode={darkMode} />
          </div>
        ) : currentView === "support" ? (
          <div className="py-8">
            <Support darkMode={darkMode} />
          </div>
        ) : (
          <>
            {showInstructions && (
              <div
                className={`mb-8 p-6 rounded-lg shadow-md border relative ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-blue-50 border-blue-200 text-gray-900"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2
                    className={`text-xl font-semibold ${
                      darkMode ? "text-blue-300" : "text-blue-800"
                    }`}
                  >
                    Welcome to Campus Companion PH
                  </h2>
                  <button
                    onClick={() => setShowInstructions(false)}
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Close
                  </button>
                </div>
                <p className="mb-4">
                  This calculator uses the official DepEd K-12 guidelines (DepEd
                  Order No. 8, s. 2015) for Grades 1-12 and provides flexible
                  tools for tertiary-level grading.
                </p>

                <h3
                  className={`font-semibold mb-2 ${
                    darkMode ? "text-blue-400" : "text-blue-700"
                  }`}
                >
                  How to use:
                </h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Choose Your Education Level</strong> - Select
                    between K-12 or Tertiary (College)
                  </li>
                  <li>
                    <strong>Select Your Context</strong> - K-12 students select
                    Grade Level and Subject, college students select their
                    grading system
                  </li>
                  <li>
                    <strong>Enter Your Scores</strong> - Input raw scores and
                    highest possible scores (K-12) or final grades and units
                    (Tertiary)
                  </li>
                  <li>
                    <strong>View Your Grade</strong> - See your calculated grade
                    with detailed breakdown
                  </li>
                </ol>
              </div>
            )}

            {!showInstructions && (
              <button
                onClick={() => setShowInstructions(true)}
                className="mb-6 flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <FiInfo className="mr-1" /> Show Instructions
              </button>
            )}

            <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "k12"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("k12")}
              >
                K-12 Calculator
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "tertiary"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("tertiary")}
              >
                Tertiary (College) Calculator
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "term-based"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("term-based")}
              >
                Term-Based Calculator
              </button>
            </div>

            {activeTab === "k12" ? (
              <K12Calculator
                darkMode={darkMode}
                getMotivationalMessage={getMotivationalMessage}
              />
            ) : activeTab === "tertiary" ? (
              <TertiaryCalculator
                darkMode={darkMode}
                getMotivationalMessage={getMotivationalMessage}
              />
            ) : (
              <TermBasedCalculator
                darkMode={darkMode}
                getMotivationalMessage={getMotivationalMessage}
              />
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} Campus Companion PH | Developed by
          CodeWithClarence
        </p>
      </footer>
    </div>
  );
}

export default App;
