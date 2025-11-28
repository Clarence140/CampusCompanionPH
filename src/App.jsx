"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Support from "./components/Support";
import { AspectRatio } from "./components/ui/AspectRatio";

// Reusable Modal Component
function Modal({ isOpen, onClose, title, message, type = "info" }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if () {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const typeStyles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      buttonBg: "bg-green-600 hover:bg-green-700",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      buttonBg: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-500",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      buttonBg: "bg-yellow-600 hover:bg-yellow-700",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in ${style.border} border-t-4`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`${style.bg} p-6 border-b border-gray-200`}>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-700">{message}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2 text-white rounded-lg transition-colors shadow-md ${style.buttonBg}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

// Confirmation Modal Component
function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in border-t-4 border-red-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-red-50 p-6 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-700">{message}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function K12Calculator({ getMotivationalMessage }) {
  // Load saved data from localStorage
  const [gradeLevel, setGradeLevel] = useState(() => {
    const saved = localStorage.getItem("k12_gradeLevel");
    return saved ? JSON.parse(saved) : "1";
  });
  const [subjectType, setSubjectType] = useState(() => {
    const saved = localStorage.getItem("k12_subjectType");
    return saved ? JSON.parse(saved) : "core";
  });
  const [writtenWorks, setWrittenWorks] = useState(() => {
    const saved = localStorage.getItem("k12_writtenWorks");
    return saved ? JSON.parse(saved) : [{ name: "", score: "", maxScore: "" }];
  });
  const [performanceTasks, setPerformanceTasks] = useState(() => {
    const saved = localStorage.getItem("k12_performanceTasks");
    return saved ? JSON.parse(saved) : [{ name: "", score: "", maxScore: "" }];
  });
  const [quarterlyAssessment, setQuarterlyAssessment] = useState(() => {
    const saved = localStorage.getItem("k12_quarterlyAssessment");
    return saved ? JSON.parse(saved) : { score: "", maxScore: "" };
  });
  const [targetGrade, setTargetGrade] = useState(() => {
    const saved = localStorage.getItem("k12_targetGrade");
    return saved || "";
  });
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [gradeHistory, setGradeHistory] = useState(() => {
    const saved = localStorage.getItem("k12_gradeHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const [historyEntryName, setHistoryEntryName] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBulkWW, setShowBulkWW] = useState(false);
  const [showBulkPT, setShowBulkPT] = useState(false);
  const [bulkWWData, setBulkWWData] = useState("");
  const [bulkPTData, setBulkPTData] = useState("");

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showModal = (title, message, type = "info") => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: "", message: "", type: "info" });
  };

  const showConfirm = (title, message, onConfirm) => {
    setConfirmModal({ isOpen: true, title, message, onConfirm });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  };

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("k12_gradeLevel", JSON.stringify(gradeLevel));
  }, [gradeLevel]);

  useEffect(() => {
    localStorage.setItem("k12_subjectType", JSON.stringify(subjectType));
  }, [subjectType]);

  useEffect(() => {
    localStorage.setItem("k12_writtenWorks", JSON.stringify(writtenWorks));
  }, [writtenWorks]);

  useEffect(() => {
    localStorage.setItem(
      "k12_performanceTasks",
      JSON.stringify(performanceTasks)
    );
  }, [performanceTasks]);

  useEffect(() => {
    localStorage.setItem(
      "k12_quarterlyAssessment",
      JSON.stringify(quarterlyAssessment)
    );
  }, [quarterlyAssessment]);

  useEffect(() => {
    localStorage.setItem("k12_targetGrade", targetGrade);
  }, [targetGrade]);

  useEffect(() => {
    localStorage.setItem("k12_gradeHistory", JSON.stringify(gradeHistory));
  }, [gradeHistory]);

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

  const clearAllData = () => {
    showConfirm(
      "Clear All Data?",
      "Are you sure you want to clear all data? This cannot be undone.",
      () => {
        setGradeLevel("1");
        setSubjectType("core");
        setWrittenWorks([{ name: "", score: "", maxScore: "" }]);
        setPerformanceTasks([{ name: "", score: "", maxScore: "" }]);
        setQuarterlyAssessment({ score: "", maxScore: "" });
        setTargetGrade("");
        localStorage.removeItem("k12_gradeLevel");
        localStorage.removeItem("k12_subjectType");
        localStorage.removeItem("k12_writtenWorks");
        localStorage.removeItem("k12_performanceTasks");
        localStorage.removeItem("k12_quarterlyAssessment");
        localStorage.removeItem("k12_targetGrade");
        showModal(
          "Data Cleared",
          "All your data has been cleared successfully.",
          "success"
        );
      }
    );
  };

  const calculateRequiredGrade = () => {
    if (!targetGrade) return null;

    const target = parseFloat(targetGrade);
    const weights = gradeWeights[gradeLevel];
    const grades = calculateFinalGrade();

    // Calculate current contribution from WW and PT
    const wwContribution = parseFloat(grades.wwAverage) * weights.ww;
    const ptContribution = parseFloat(grades.ptAverage) * weights.pt;

    // What's needed from QA to reach target
    const needed = target - wwContribution - ptContribution;
    const requiredQA = needed / weights.qa;

    return {
      required: requiredQA,
      isPossible: requiredQA >= 0 && requiredQA <= 100,
      currentTotal: wwContribution + ptContribution,
    };
  };

  const exportToHTML = () => {
    const grades = calculateFinalGrade();
    const weights = gradeWeights[gradeLevel];
    const date = new Date().toLocaleDateString("en-PH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Grade Report - Campus Companion PH</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #3b82f6;
      margin: 0;
      font-size: 28px;
    }
    .header p {
      color: #6b7280;
      margin: 5px 0;
    }
    .info-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 30px;
      background: #f3f4f6;
      padding: 15px;
      border-radius: 8px;
    }
    .info-item {
      display: flex;
      justify-content: space-between;
    }
    .info-label {
      font-weight: bold;
      color: #374151;
    }
    .final-grade {
      text-align: center;
      font-size: 48px;
      font-weight: bold;
      color: #3b82f6;
      margin: 30px 0;
      padding: 20px;
      background: #dbeafe;
      border-radius: 12px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #d1d5db;
      padding: 12px;
      text-align: left;
    }
    th {
      background: #3b82f6;
      color: white;
      font-weight: bold;
    }
    tr:nth-child(even) {
      background: #f9fafb;
    }
    .component-score {
      font-weight: bold;
      font-size: 18px;
    }
    .details-section {
      margin-top: 30px;
    }
    .detail-box {
      background: #f9fafb;
      padding: 15px;
      border-left: 4px solid #3b82f6;
      margin: 10px 0;
    }
    .detail-box h4 {
      margin: 0 0 10px 0;
      color: #1f2937;
    }
    .item-list {
      list-style: none;
      padding: 0;
    }
    .item-list li {
      padding: 5px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .item-list li:last-child {
      border-bottom: none;
    }
    .footer {
      margin-top: 50px;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
      border-top: 1px solid #e5e7eb;
      padding-top: 20px;
    }
    @media print {
      body {
        margin: 0;
        padding: 20px;
      }
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Grade Report</h1>
    <p><strong>Campus Companion PH</strong></p>
    <p>Generated: ${date}</p>
  </div>

  <div class="info-section">
    <div class="info-item">
      <span class="info-label">Grade Level:</span>
      <span>${
        gradeLevel === "shs" ? "Senior High School" : `Grade ${gradeLevel}`
      }</span>
    </div>
    <div class="info-item">
      <span class="info-label">Subject Type:</span>
      <span>${subjectType.charAt(0).toUpperCase() + subjectType.slice(1)}</span>
    </div>
  </div>

  <div class="final-grade">
    Final Grade: ${grades.finalGrade}
  </div>

  <h3>Component Breakdown</h3>
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th>Average Score</th>
        <th>Weight</th>
        <th>Contribution</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Written Works</td>
        <td class="component-score">${grades.wwAverage}%</td>
        <td>${weights.ww * 100}%</td>
        <td>${(parseFloat(grades.wwAverage) * weights.ww).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Performance Tasks</td>
        <td class="component-score">${grades.ptAverage}%</td>
        <td>${weights.pt * 100}%</td>
        <td>${(parseFloat(grades.ptAverage) * weights.pt).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Quarterly Assessment</td>
        <td class="component-score">${grades.qaScore}%</td>
        <td>${weights.qa * 100}%</td>
        <td>${(parseFloat(grades.qaScore) * weights.qa).toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  <div class="details-section">
    ${
      writtenWorks.filter((w) => w.score && w.maxScore).length > 0
        ? `
    <div class="detail-box">
      <h4>Written Works Details</h4>
      <ul class="item-list">
        ${writtenWorks
          .filter((w) => w.score && w.maxScore)
          .map(
            (w, i) => `
          <li>
            <strong>${w.name || `Activity ${i + 1}`}:</strong> 
            ${w.score}/${w.maxScore} 
            (${((parseFloat(w.score) / parseFloat(w.maxScore)) * 100).toFixed(
              2
            )}%)
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
    `
        : ""
    }

    ${
      performanceTasks.filter((p) => p.score && p.maxScore).length > 0
        ? `
    <div class="detail-box">
      <h4>Performance Tasks Details</h4>
      <ul class="item-list">
        ${performanceTasks
          .filter((p) => p.score && p.maxScore)
          .map(
            (p, i) => `
          <li>
            <strong>${p.name || `Task ${i + 1}`}:</strong> 
            ${p.score}/${p.maxScore} 
            (${((parseFloat(p.score) / parseFloat(p.maxScore)) * 100).toFixed(
              2
            )}%)
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
    `
        : ""
    }
  </div>

  <div class="footer">
    <p>Generated by Campus Companion PH - Your Grade Calculation Companion</p>
    <p>Based on DepEd Order No. 8, s. 2015</p>
  </div>

  <div class="no-print" style="text-align: center; margin-top: 30px;">
    <button onclick="window.print()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
      🖨️ Print This Report
    </button>
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Grade_Report_${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveToHistory = () => {
    const grades = calculateFinalGrade();
    if (parseFloat(grades.finalGrade) === 0) {
      showModal(
        "No Data to Save",
        "Please enter some grades before saving to history.",
        "warning"
      );
      return;
    }

    const entry = {
      id: Date.now(),
      name: historyEntryName || `Entry ${gradeHistory.length + 1}`,
      date: new Date().toISOString(),
      gradeLevel,
      subjectType,
      finalGrade: parseFloat(grades.finalGrade),
      wwAverage: parseFloat(grades.wwAverage),
      ptAverage: parseFloat(grades.ptAverage),
      qaScore: parseFloat(grades.qaScore),
    };

    setGradeHistory([...gradeHistory, entry]);
    setHistoryEntryName("");
    showModal(
      "Grade Saved Successfully",
      `Your grade has been saved as "${entry.name}" in your history.`,
      "success"
    );
  };

  const deleteHistoryEntry = (id) => {
    const entry = gradeHistory.find((e) => e.id === id);
    showConfirm(
      "Delete Entry?",
      `Are you sure you want to delete "${
        entry?.name || "this entry"
      }"? This cannot be undone.`,
      () => {
        setGradeHistory(gradeHistory.filter((entry) => entry.id !== id));
        showModal(
          "Entry Deleted",
          "The grade entry has been removed from your history.",
          "success"
        );
      }
    );
  };

  const clearHistory = () => {
    showConfirm(
      "Clear All History?",
      "Are you sure you want to clear all grade history? This cannot be undone.",
      () => {
        setGradeHistory([]);
        localStorage.removeItem("k12_gradeHistory");
        showModal(
          "History Cleared",
          "All your grade history has been cleared.",
          "success"
        );
      }
    );
  };

  // Quick Input Templates
  const templates = {
    grade7_sample: {
      name: "Grade 7 Sample Data",
      gradeLevel: "7",
      subjectType: "core",
      writtenWorks: [
        { name: "Quiz 1", score: "18", maxScore: "20" },
        { name: "Quiz 2", score: "22", maxScore: "25" },
        { name: "Long Test", score: "38", maxScore: "50" },
      ],
      performanceTasks: [
        { name: "Science Project", score: "45", maxScore: "50" },
        { name: "Oral Presentation", score: "28", maxScore: "30" },
      ],
      quarterlyAssessment: { score: "42", maxScore: "50" },
    },
    grade10_sample: {
      name: "Grade 10 Sample Data",
      gradeLevel: "10",
      subjectType: "core",
      writtenWorks: [
        { name: "Quiz 1", score: "9", maxScore: "10" },
        { name: "Quiz 2", score: "14", maxScore: "15" },
        { name: "Unit Test", score: "48", maxScore: "50" },
      ],
      performanceTasks: [
        { name: "Research Paper", score: "90", maxScore: "100" },
        { name: "Group Project", score: "48", maxScore: "50" },
      ],
      quarterlyAssessment: { score: "85", maxScore: "100" },
    },
    shs_sample: {
      name: "SHS Sample Data",
      gradeLevel: "shs",
      subjectType: "specialized",
      writtenWorks: [
        { name: "Quiz 1", score: "19", maxScore: "20" },
        { name: "Quiz 2", score: "24", maxScore: "25" },
        { name: "Midterm Exam", score: "95", maxScore: "100" },
      ],
      performanceTasks: [
        { name: "Capstone Project", score: "95", maxScore: "100" },
      ],
      quarterlyAssessment: { score: "92", maxScore: "100" },
    },
    empty: {
      name: "Empty Template",
      gradeLevel: "1",
      subjectType: "core",
      writtenWorks: [{ name: "", score: "", maxScore: "" }],
      performanceTasks: [{ name: "", score: "", maxScore: "" }],
      quarterlyAssessment: { score: "", maxScore: "" },
    },
  };

  const loadTemplate = (templateKey) => {
    const template = templates[templateKey];
    showConfirm(
      "Load Template?",
      "This will replace your current data. Are you sure you want to continue?",
      () => {
        setGradeLevel(template.gradeLevel);
        setSubjectType(template.subjectType);
        setWrittenWorks(template.writtenWorks);
        setPerformanceTasks(template.performanceTasks);
        setQuarterlyAssessment(template.quarterlyAssessment);
        setShowTemplates(false);
        showModal(
          "Template Loaded",
          `Template "${template.name}" loaded successfully!`,
          "success"
        );
      }
    );
  };

  const parseBulkWW = () => {
    try {
      const lines = bulkWWData.trim().split("\n");
      const parsed = lines
        .map((line) => {
          const parts = line.split("\t"); // Tab-separated
          if (parts.length >= 3) {
            return {
              name: parts[0].trim(),
              score: parts[1].trim(),
              maxScore: parts[2].trim(),
            };
          } else if (parts.length === 1) {
            // Try comma-separated as fallback
            const commaParts = line.split(",");
            if (commaParts.length >= 3) {
              return {
                name: commaParts[0].trim(),
                score: commaParts[1].trim(),
                maxScore: commaParts[2].trim(),
              };
            }
          }
          return null;
        })
        .filter((item) => item && item.score && item.maxScore);

      if (parsed.length > 0) {
        setWrittenWorks([...writtenWorks, ...parsed]);
        setBulkWWData("");
        setShowBulkWW(false);
        showModal(
          "Import Successful",
          `Successfully added ${parsed.length} Written Works!`,
          "success"
        );
      } else {
        showModal(
          "Invalid Format",
          "No valid data found. Please use format: Name [TAB] Score [TAB] MaxScore (one per line)",
          "warning"
        );
      }
    } catch (error) {
      showModal(
        "Import Error",
        "Error parsing data. Please check your format and try again.",
        "error"
      );
    }
  };

  const parseBulkPT = () => {
    try {
      const lines = bulkPTData.trim().split("\n");
      const parsed = lines
        .map((line) => {
          const parts = line.split("\t"); // Tab-separated
          if (parts.length >= 3) {
            return {
              name: parts[0].trim(),
              score: parts[1].trim(),
              maxScore: parts[2].trim(),
            };
          } else if (parts.length === 1) {
            // Try comma-separated as fallback
            const commaParts = line.split(",");
            if (commaParts.length >= 3) {
              return {
                name: commaParts[0].trim(),
                score: commaParts[1].trim(),
                maxScore: commaParts[2].trim(),
              };
            }
          }
          return null;
        })
        .filter((item) => item && item.score && item.maxScore);

      if (parsed.length > 0) {
        setPerformanceTasks([...performanceTasks, ...parsed]);
        setBulkPTData("");
        setShowBulkPT(false);
        showModal(
          "Import Successful",
          `Successfully added ${parsed.length} Performance Tasks!`,
          "success"
        );
      } else {
        showModal(
          "Invalid Format",
          "No valid data found. Please use format: Name [TAB] Score [TAB] MaxScore (one per line)",
          "warning"
        );
      }
    } catch (error) {
      showModal(
        "Import Error",
        "Error parsing data. Please check your format and try again.",
        "error"
      );
    }
  };

  const shareResults = async () => {
    const grades = calculateFinalGrade();
    const shareText = `My Grade Report - Campus Companion PH

Final Grade: ${grades.finalGrade}

Component Breakdown:
Written Works: ${grades.wwAverage}%
Performance Tasks: ${grades.ptAverage}%
Quarterly Assessment: ${grades.qaScore}%

Grade Level: ${
      gradeLevel === "shs" ? "Senior High School" : `Grade ${gradeLevel}`
    }

Calculate your grades too at Campus Companion PH!`;

    if (navigator.share) {
      // Use Web Share API (mobile/modern browsers)
      try {
        await navigator.share({
          title: "My Grade Report",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          // Fallback to clipboard
          copyToClipboard(shareText);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showModal(
            "Copied to Clipboard",
            "Results copied to clipboard! You can now paste and share anywhere.",
            "success"
          );
        })
        .catch(() => {
          showModal(
            "Copy Failed",
            "Could not copy to clipboard. Please select and copy manually.",
            "error"
          );
        });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        showModal(
          "Copied to Clipboard",
          "Results copied to clipboard! You can now paste and share anywhere.",
          "success"
        );
      } catch (err) {
        showModal("Copy Failed", "Could not copy to clipboard.", "error");
      }
      document.body.removeChild(textArea);
    }
  };

  const printReport = () => {
    const grades = calculateFinalGrade();
    const weights = gradeWeights[gradeLevel];
    const date = new Date().toLocaleDateString("en-PH");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Grade Report - ${date}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
            h1 { color: #3b82f6; margin: 0; }
            .info { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .final-grade { text-align: center; font-size: 48px; font-weight: bold; color: #3b82f6; margin: 30px 0; padding: 20px; background: #dbeafe; border-radius: 12px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background: #3b82f6; color: white; }
            tr:nth-child(even) { background: #f9fafb; }
            .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Grade Report</h1>
            <p><strong>Campus Companion PH</strong></p>
            <p>Generated: ${date}</p>
          </div>
          
          <div class="info">
            <p><strong>Grade Level:</strong> ${
              gradeLevel === "shs"
                ? "Senior High School"
                : `Grade ${gradeLevel}`
            }</p>
            <p><strong>Subject Type:</strong> ${subjectType}</p>
          </div>

          <div class="final-grade">Final Grade: ${grades.finalGrade}</div>

          <h3>Component Breakdown</h3>
          <table>
            <tr><th>Component</th><th>Average</th><th>Weight</th><th>Contribution</th></tr>
            <tr>
              <td>Written Works</td>
              <td>${grades.wwAverage}%</td>
              <td>${weights.ww * 100}%</td>
              <td>${(parseFloat(grades.wwAverage) * weights.ww).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Performance Tasks</td>
              <td>${grades.ptAverage}%</td>
              <td>${weights.pt * 100}%</td>
              <td>${(parseFloat(grades.ptAverage) * weights.pt).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Quarterly Assessment</td>
              <td>${grades.qaScore}%</td>
              <td>${weights.qa * 100}%</td>
              <td>${(parseFloat(grades.qaScore) * weights.qa).toFixed(2)}</td>
            </tr>
          </table>

          <div class="footer">
            <p>Generated by Campus Companion PH</p>
            <p>Based on DepEd Order No. 8, s. 2015</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const grades = calculateFinalGrade();

  return (
    <div className="space-y-6">
      {/* Auto-save indicator */}
      <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span className="text-sm text-green-700">
            Your data is automatically saved
          </span>
        </div>
        <button
          onClick={clearAllData}
          className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Clear All Data
        </button>
      </div>

      {/* Quick Templates */}
      <div className="border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="w-full flex items-center justify-between mb-2"
        >
          <h3 className="text-md font-bold text-cyan-800 flex items-center gap-2">
            Quick Start Templates
          </h3>
        </button>

        {showTemplates && (
          <div className="space-y-3 mt-4">
            <p className="text-sm text-gray-700">
              Load sample data to try out the calculator instantly, or start
              fresh:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => loadTemplate("grade7_sample")}
                className="p-3 bg-white border-2 border-cyan-300 rounded-lg hover:bg-cyan-50 transition-colors text-left"
              >
                <p className="font-semibold text-cyan-700">Grade 7</p>
                <p className="text-xs text-gray-600 mt-1">
                  Sample scores for JHS
                </p>
              </button>
              <button
                onClick={() => loadTemplate("grade10_sample")}
                className="p-3 bg-white border-2 border-cyan-300 rounded-lg hover:bg-cyan-50 transition-colors text-left"
              >
                <p className="font-semibold text-cyan-700">Grade 10</p>
                <p className="text-xs text-gray-600 mt-1">
                  High performing data
                </p>
              </button>
              <button
                onClick={() => loadTemplate("shs_sample")}
                className="p-3 bg-white border-2 border-cyan-300 rounded-lg hover:bg-cyan-50 transition-colors text-left"
              >
                <p className="font-semibold text-cyan-700">SHS</p>
                <p className="text-xs text-gray-600 mt-1">Senior High School</p>
              </button>
              <button
                onClick={() => loadTemplate("empty")}
                className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <p className="font-semibold text-gray-700">✨ Start Fresh</p>
                <p className="text-xs text-gray-600 mt-1">Empty template</p>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Grade Level</label>
          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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
            className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
          >
            <option value="core">Core Subject</option>
            <option value="applied">Applied Track</option>
            <option value="specialized">Specialized Subject</option>
          </select>
        </div>
      </div>

      {/* Written Works Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-xl text-blue-700 flex items-center gap-2">
            Written Works
            <span className="text-sm font-normal text-gray-500">
              ({gradeWeights[gradeLevel].ww * 100}%)
            </span>
          </h3>
        </div>
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
              className="p-2 border rounded border-gray-300 bg-white text-gray-900"
            />
            <input
              type="number"
              placeholder="Score"
              value={work.score}
              onChange={(e) =>
                updateWrittenWork(index, "score", e.target.value)
              }
              className="p-2 border rounded border-gray-300 bg-white text-gray-900"
            />
            <input
              type="number"
              placeholder="Max Score"
              value={work.maxScore}
              onChange={(e) =>
                updateWrittenWork(index, "maxScore", e.target.value)
              }
              className="p-2 border rounded border-gray-300 bg-white text-gray-900"
            />
            <button
              onClick={() => removeWrittenWork(index)}
              className="px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group flex items-center gap-1.5"
              title="Remove this item"
            >
              <button
                size={16}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="hidden sm:inline text-sm font-medium">
                Remove
              </span>
            </button>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addWrittenWork}
            className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Add Written Work
          </button>
          <button
            onClick={() => setShowBulkWW(!showBulkWW)}
            className="p-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
          >
            Bulk Add (Paste from Excel)
          </button>
        </div>

        {showBulkWW && (
          <div className="mt-3 p-4 bg-purple-50/20 border border-purple-200 rounded-lg">
            <h4 className="font-semibold mb-2 text-purple-800">
              Bulk Add Written Works
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Paste from Excel/Google Sheets (Name, Score, Max Score - one per
              line):
            </p>
            <textarea
              value={bulkWWData}
              onChange={(e) => setBulkWWData(e.target.value)}
              placeholder={`Quiz 1\t18\t20\nQuiz 2\t22\t25\nLong Test\t38\t50`}
              className="w-full h-24 p-2 border rounded-lg bg-white border-gray-300 font-mono text-sm"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={parseBulkWW}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Import Data
              </button>
              <button
                onClick={() => {
                  setShowBulkWW(false);
                  setBulkWWData("");
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Performance Tasks Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-xl text-green-700 flex items-center gap-2">
            Performance Tasks
            <span className="text-sm font-normal text-gray-500">
              ({gradeWeights[gradeLevel].pt * 100}%)
            </span>
          </h3>
        </div>
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
              className="p-2 border rounded border-gray-300 bg-white text-gray-900"
            />
            <input
              type="number"
              placeholder="Score"
              value={task.score}
              onChange={(e) =>
                updatePerformanceTask(index, "score", e.target.value)
              }
              className="p-2 border rounded border-gray-300 bg-white text-gray-900"
            />
            <input
              type="number"
              placeholder="Max Score"
              value={task.maxScore}
              onChange={(e) =>
                updatePerformanceTask(index, "maxScore", e.target.value)
              }
              className="p-2 border rounded border-gray-300 bg-white text-gray-900"
            />
            <button
              onClick={() => removePerformanceTask(index)}
              className="px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group flex items-center gap-1.5"
              title="Remove this item"
            >
              <button
                size={16}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="hidden sm:inline text-sm font-medium">
                Remove
              </span>
            </button>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addPerformanceTask}
            className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Add Performance Task
          </button>
          <button
            onClick={() => setShowBulkPT(!showBulkPT)}
            className="p-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
          >
            Bulk Add (Paste from Excel)
          </button>
        </div>

        {showBulkPT && (
          <div className="mt-3 p-4 bg-purple-50/20 border border-purple-200 rounded-lg">
            <h4 className="font-semibold mb-2 text-purple-800">
              Bulk Add Performance Tasks
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Paste from Excel/Google Sheets (Name, Score, Max Score - one per
              line):
            </p>
            <textarea
              value={bulkPTData}
              onChange={(e) => setBulkPTData(e.target.value)}
              placeholder={`Project 1\t45\t50\nPresentation\t28\t30\nExperiment\t95\t100`}
              className="w-full h-24 p-2 border rounded-lg bg-white border-gray-300 font-mono text-sm"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={parseBulkPT}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Import Data
              </button>
              <button
                onClick={() => {
                  setShowBulkPT(false);
                  setBulkPTData("");
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quarterly Assessment Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-xl text-orange-700 flex items-center gap-2">
            Quarterly Assessment
            <span className="text-sm font-normal text-gray-500">
              ({gradeWeights[gradeLevel].qa * 100}%)
            </span>
          </h3>
        </div>
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
            className="p-2 border rounded border-gray-300 bg-white text-gray-900"
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
            className="p-2 border rounded border-gray-300 bg-white text-gray-900"
          />
        </div>
      </div>

      {/* Passing Grade Analysis */}
      {grades.wwAverage > 0 &&
        grades.ptAverage > 0 &&
        !quarterlyAssessment.score && (
          <div className="border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
              Can I Still Pass? (75% Analysis)
            </h3>

            {(() => {
              const weights = gradeWeights[gradeLevel];
              const currentContribution =
                parseFloat(grades.wwAverage) * weights.ww +
                parseFloat(grades.ptAverage) * weights.pt;
              const passingGrade = 75;
              const needed = passingGrade - currentContribution;
              const requiredQA = needed / weights.qa;
              const canPass = requiredQA >= 0 && requiredQA <= 100;

              return (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg border-2 ${
                      canPass
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                    }`}
                  >
                    <div className="text-center mb-3">
                      <p className="text-3xl font-bold mb-2">
                        {canPass ? "YES!" : "CRITICAL"}
                      </p>
                      <p className="text-lg">
                        {canPass
                          ? `You can pass with ${requiredQA.toFixed(2)}% on QA`
                          : "Passing is mathematically difficult"}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Total:</span>
                        <span className="font-bold">
                          {currentContribution.toFixed(2)} points
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Needed to Pass (75):</span>
                        <span className="font-bold">{passingGrade} points</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining Points Available:</span>
                        <span className="font-bold">
                          {(weights.qa * 100).toFixed(0)} points
                        </span>
                      </div>
                      <div className="flex justify-between border-t-2 pt-2">
                        <span>Required QA Score:</span>
                        <span
                          className={`font-bold text-lg ${
                            canPass ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {requiredQA.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {canPass && (
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-700">
                        Action Plan:
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {requiredQA < 60 && (
                          <li className="flex items-start gap-2">
                            <span>
                              Great news! You only need {requiredQA.toFixed(2)}%
                              on the QA. This is very achievable with basic
                              review!
                            </span>
                          </li>
                        )}
                        {requiredQA >= 60 && requiredQA < 80 && (
                          <>
                            <li className="flex items-start gap-2">
                              <span>
                                You need {requiredQA.toFixed(2)}% on the QA.
                                Start reviewing now and focus on key topics.
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span>👥</span>
                              <span>
                                Consider forming a study group or getting help
                                from classmates.
                              </span>
                            </li>
                          </>
                        )}
                        {requiredQA >= 80 && requiredQA <= 100 && (
                          <>
                            <li className="flex items-start gap-2">
                              <span>
                                You need {requiredQA.toFixed(2)}% on the QA.
                                This requires excellent performance!
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span>👨‍🏫</span>
                              <span>
                                Seek extra help from your teacher immediately.
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span>
                                Review all lessons thoroughly and practice past
                                exam questions.
                              </span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                  {!canPass && (
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-red-700">
                        Important Steps:
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span>👨‍🏫</span>
                          <span>
                            Talk to your teacher IMMEDIATELY about extra credit
                            opportunities.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>
                            Ask if any scores can be improved through remedial
                            activities.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>
                            Still give your best on the QA - every point counts!
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>
                            Inform your parents and seek their support.
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

      {/* What If Calculator */}
      {grades.wwAverage > 0 &&
        grades.ptAverage > 0 &&
        !quarterlyAssessment.score && (
          <div className="border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
            <button
              onClick={() => setShowWhatIf(!showWhatIf)}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="text-lg font-bold text-purple-800 flex items-center gap-2">
                Goal Planner: "What If" Calculator
              </h3>
            </button>

            {showWhatIf && (
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Set your target final grade and see what you need to score on
                  your Quarterly Assessment!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Target Final Grade
                    </label>
                    <input
                      type="number"
                      value={targetGrade}
                      onChange={(e) => setTargetGrade(e.target.value)}
                      placeholder="e.g., 90"
                      min="75"
                      max="100"
                      step="0.01"
                      className="w-full p-3 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {targetGrade && calculateRequiredGrade() && (
                    <div className="flex items-center justify-center">
                      <div
                        className={`text-center p-4 rounded-lg border-2 ${
                          calculateRequiredGrade().isPossible
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                        }`}
                      >
                        <p className="text-sm font-medium mb-1">
                          {calculateRequiredGrade().isPossible
                            ? "Achievable!"
                            : "Very Difficult"}
                        </p>
                        <p className="text-2xl font-bold">
                          {calculateRequiredGrade().required.toFixed(2)}%
                        </p>
                        <p className="text-xs mt-1">needed on QA</p>
                      </div>
                    </div>
                  )}
                </div>

                {targetGrade && calculateRequiredGrade() && (
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <h4 className="font-semibold mb-2">Breakdown:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>
                          Written Works ({gradeWeights[gradeLevel].ww * 100}%):
                        </span>
                        <span className="font-medium">
                          {(
                            parseFloat(grades.wwAverage) *
                            gradeWeights[gradeLevel].ww
                          ).toFixed(2)}{" "}
                          points
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Performance Tasks ({gradeWeights[gradeLevel].pt * 100}
                          %):
                        </span>
                        <span className="font-medium">
                          {(
                            parseFloat(grades.ptAverage) *
                            gradeWeights[gradeLevel].pt
                          ).toFixed(2)}{" "}
                          points
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Current Total:</span>
                        <span className="font-bold">
                          {calculateRequiredGrade().currentTotal.toFixed(2)}{" "}
                          points
                        </span>
                      </div>
                      <div className="flex justify-between text-purple-700">
                        <span>Target Final Grade:</span>
                        <span className="font-bold">{targetGrade}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t-2 pt-2">
                        <span>
                          You need on QA ({gradeWeights[gradeLevel].qa * 100}%):
                        </span>
                        <span
                          className={
                            calculateRequiredGrade().isPossible
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {calculateRequiredGrade().required.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    {!calculateRequiredGrade().isPossible && (
                      <div className="mt-4 p-3 bg-red-100 rounded-lg text-sm">
                        <p className="font-semibold text-red-800">
                          💡 Tip: Your target grade may be too high given your
                          current performance.
                        </p>
                        <p className="text-red-700 mt-1">
                          Try setting a more realistic target or focus on
                          improving your Written Works and Performance Tasks.
                        </p>
                      </div>
                    )}

                    {calculateRequiredGrade().isPossible &&
                      calculateRequiredGrade().required > 90 && (
                        <div className="mt-4 p-3 bg-yellow-100 rounded-lg text-sm">
                          <p className="font-semibold text-yellow-800">
                            Challenge Ahead!
                          </p>
                          <p className="text-yellow-700 mt-1">
                            You'll need to score very high on the Quarterly
                            Assessment. Start reviewing now and prepare
                            thoroughly!
                          </p>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      {/* Results Section */}
      {grades.finalGrade > 0 && (
        <div className="border rounded-lg p-6 mt-6 border-blue-200 bg-blue-50">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">
            Final Grade: {grades.finalGrade}
          </h2>

          {/* Grade Breakdown Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Written Works</p>
              <p className="text-xl font-semibold">{grades.wwAverage}%</p>
              <p className="text-xs text-gray-500">
                Weight: {gradeWeights[gradeLevel].ww * 100}%
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Performance Tasks</p>
              <p className="text-xl font-semibold">{grades.ptAverage}%</p>
              <p className="text-xs text-gray-500">
                Weight: {gradeWeights[gradeLevel].pt * 100}%
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Quarterly Assessment</p>
              <p className="text-xl font-semibold">{grades.qaScore}%</p>
              <p className="text-xs text-gray-500">
                Weight: {gradeWeights[gradeLevel].qa * 100}%
              </p>
            </div>
          </div>

          {/* Visual Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Pie Chart - Grade Contribution */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-center mb-2 text-gray-700">
                Grade Contribution Breakdown
              </h3>
              <AspectRatio
                presetResponsive={{
                  mobile: "square",
                  tablet: "video",
                  desktop: "video",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Written Works",
                          value:
                            parseFloat(grades.wwAverage) *
                            gradeWeights[gradeLevel].ww,
                          percent: gradeWeights[gradeLevel].ww * 100,
                        },
                        {
                          name: "Performance Tasks",
                          value:
                            parseFloat(grades.ptAverage) *
                            gradeWeights[gradeLevel].pt,
                          percent: gradeWeights[gradeLevel].pt * 100,
                        },
                        {
                          name: "Quarterly Assessment",
                          value:
                            parseFloat(grades.qaScore) *
                            gradeWeights[gradeLevel].qa,
                          percent: gradeWeights[gradeLevel].qa * 100,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.percent}%`}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#10b981" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                    <Tooltip
                      formatter={(value) => value.toFixed(2)}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </AspectRatio>
            </div>

            {/* Bar Chart - Component Comparison */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-center mb-2 text-gray-700">
                Component Performance
              </h3>
              <AspectRatio
                presetResponsive={{
                  mobile: "portrait",
                  tablet: "video",
                  desktop: "video",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "WW",
                        score: parseFloat(grades.wwAverage),
                      },
                      {
                        name: "PT",
                        score: parseFloat(grades.ptAverage),
                      },
                      {
                        name: "QA",
                        score: parseFloat(grades.qaScore),
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis domain={[0, 100]} stroke="#6b7280" />
                    <Tooltip
                      formatter={(value) => `${value}%`}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </AspectRatio>
            </div>
          </div>

          <div className="mt-4 text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <p className="text-sm italic font-medium">
              {getMotivationalMessage(Number.parseFloat(grades.finalGrade))}
            </p>
          </div>

          {/* Export/Print/Share Buttons */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={exportToHTML}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md"
            >
              Download HTML
            </button>
            <button
              onClick={printReport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
            >
              Print Report
            </button>
            <button
              onClick={shareResults}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
            >
              Share Results
            </button>
          </div>

          {/* Smart Study Recommendations */}
          <div className="mt-6 p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-lg border border-pink-200">
            <h4 className="font-semibold text-xl mb-4 text-purple-800 flex items-center gap-2">
              Smart Study Recommendations
            </h4>

            {(() => {
              const recommendations = [];
              const wwScore = parseFloat(grades.wwAverage);
              const ptScore = parseFloat(grades.ptAverage);
              const qaScore = parseFloat(grades.qaScore);
              const finalScore = parseFloat(grades.finalGrade);
              const weights = gradeWeights[gradeLevel];

              // Identify weakest area
              const components = [
                {
                  name: "Written Works",
                  score: wwScore,
                  weight: weights.ww,
                  icon: "",
                  tips: [
                    "Review your quiz mistakes and understand why answers were wrong",
                    "Create summary notes after each lesson",
                    "Practice with sample questions daily for 15-20 minutes",
                    "Form a study group to quiz each other before tests",
                  ],
                },
                {
                  name: "Performance Tasks",
                  score: ptScore,
                  weight: weights.pt,
                  icon: "",
                  tips: [
                    "Start projects early - don't wait until the deadline",
                    "Ask your teacher for the rubric and follow it exactly",
                    "Watch tutorial videos if you're unsure about the process",
                    "Show drafts to your teacher for feedback before final submission",
                    "Work with classmates to share ideas and learn techniques",
                  ],
                },
                {
                  name: "Quarterly Assessment",
                  score: qaScore,
                  weight: weights.qa,
                  icon: "",
                  tips: [
                    "Create a comprehensive review schedule 2 weeks before",
                    "Focus on topics that appeared most frequently in WW and PT",
                    "Practice past exam questions if available",
                    "Get enough sleep the night before - your brain needs rest!",
                    "Review your summary notes regularly, not just before the exam",
                  ],
                },
              ];

              const sorted = components.sort((a, b) => a.score - b.score);
              const weakest = sorted[0];
              const strongest = sorted[sorted.length - 1];

              // Generate recommendations based on performance
              if (weakest.score < 75) {
                recommendations.push({
                  type: "urgent",
                  icon: "",
                  title: `${weakest.name} Needs Immediate Attention!`,
                  message: `Your ${
                    weakest.name
                  } average is ${weakest.score.toFixed(
                    2
                  )}%, which is below passing. This component is ${
                    weights.ww * 100
                  }% of your grade - focus here first!`,
                  tips: weakest.tips,
                });
              } else if (weakest.score < 80) {
                recommendations.push({
                  type: "warning",
                  icon: "",
                  title: `${weakest.name} Could Be Improved`,
                  message: `Your ${
                    weakest.name
                  } average is ${weakest.score.toFixed(
                    2
                  )}%. With more effort, you can boost this significantly!`,
                  tips: weakest.tips.slice(0, 3),
                });
              }

              // Strength recognition
              if (strongest.score >= 90) {
                recommendations.push({
                  type: "success",
                  icon: "",
                  title: `Excellent ${strongest.name}!`,
                  message: `You're excelling in ${
                    strongest.name
                  } with ${strongest.score.toFixed(
                    2
                  )}%! Keep up this momentum and help classmates who are struggling.`,
                  tips: [
                    "Maintain your current study habits - they're working!",
                    "Offer to tutor classmates (teaching reinforces your own learning)",
                    "Document your strategies to help yourself in future subjects",
                  ],
                });
              }

              // Overall performance advice
              if (finalScore >= 90) {
                recommendations.push({
                  type: "success",
                  icon: "",
                  title: "Outstanding Performance!",
                  message: `Your final grade of ${finalScore} is excellent! You're on track for honors.`,
                  tips: [
                    "Challenge yourself with advanced materials",
                    "Consider joining academic competitions",
                    "Mentor other students who need help",
                  ],
                });
              } else if (finalScore >= 85) {
                recommendations.push({
                  type: "info",
                  icon: "",
                  title: "Great Work!",
                  message: `Your final grade of ${finalScore} is very satisfactory. A little more effort could push you to outstanding!`,
                  tips: [
                    `Focus on improving your ${
                      weakest.name
                    } (currently ${weakest.score.toFixed(2)}%)`,
                    "Aim for consistency across all components",
                    "Set specific goals for next quarter",
                  ],
                });
              } else if (finalScore >= 75) {
                recommendations.push({
                  type: "warning",
                  icon: "",
                  title: "Room for Improvement",
                  message: `Your final grade of ${finalScore} shows you're passing, but you have potential for much more!`,
                  tips: [
                    "Create a structured study schedule and stick to it",
                    "Identify specific topics you find difficult and ask for help",
                    "Review materials regularly, not just before exams",
                    "Join study groups for peer support",
                  ],
                });
              }

              // Balance advice
              const imbalance =
                Math.max(wwScore, ptScore, qaScore) -
                Math.min(wwScore, ptScore, qaScore);
              if (imbalance > 15) {
                recommendations.push({
                  type: "info",
                  icon: "",
                  title: "Balance Your Performance",
                  message:
                    "There's a significant gap between your best and worst components. Balanced performance leads to better overall grades.",
                  tips: [
                    `Work on your ${weakest.name} to match your ${strongest.name} performance`,
                    "Apply the strategies that work in your strong areas to weaker ones",
                    "Don't neglect any component - each one matters!",
                  ],
                });
              }

              return (
                <div className="space-y-4">
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-l-4 ${
                        rec.type === "urgent"
                          ? "bg-red-50 border-red-500"
                          : rec.type === "warning"
                          ? "bg-yellow-50 border-yellow-500"
                          : rec.type === "success"
                          ? "bg-green-50 border-green-500"
                          : "bg-blue-50 border-blue-500"
                      }`}
                    >
                      <h5 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="text-2xl">{rec.icon}</span>
                        {rec.title}
                      </h5>
                      <p className="mb-3 text-gray-700">{rec.message}</p>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="font-semibold text-sm mb-2">
                          Actionable Steps:
                        </p>
                        <ul className="space-y-1.5">
                          {rec.tips.map((tip, tipIdx) => (
                            <li
                              key={tipIdx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-purple-600 mt-0.5">✓</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Save to History */}
          <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
            <h4 className="font-semibold mb-2 text-indigo-800">
              Save to Grade History
            </h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={historyEntryName}
                onChange={(e) => setHistoryEntryName(e.target.value)}
                placeholder="Enter name (e.g., '1st Quarter', 'Midterm')"
                className="flex-1 p-2 border rounded-lg bg-white border-gray-300"
              />
              <button
                onClick={saveToHistory}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Save Grade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade History Section */}
      {gradeHistory.length > 0 && (
        <div className="border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="text-lg font-bold text-indigo-800 flex items-center gap-2">
              Grade History & Progress ({gradeHistory.length} entries)
            </h3>
          </button>

          {showHistory && (
            <div className="space-y-6">
              {/* Progress Line Chart */}
              {gradeHistory.length >= 2 && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-4 text-center">
                    Grade Progress Over Time
                  </h4>
                  <AspectRatio
                    presetResponsive={{
                      mobile: "portrait",
                      tablet: "video",
                      desktop: "widescreen",
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={gradeHistory.map((entry, index) => ({
                          name: entry.name,
                          grade: entry.finalGrade,
                          index: index + 1,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="name"
                          stroke="#6b7280"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis domain={[75, 100]} stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="grade"
                          stroke="#6366f1"
                          strokeWidth={3}
                          dot={{ fill: "#6366f1", r: 6 }}
                          activeDot={{ r: 8 }}
                          name="Final Grade"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </AspectRatio>
                </div>
              )}

              {/* History Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Final Grade
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          WW
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          PT
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          QA
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {gradeHistory.map((entry) => (
                        <tr
                          key={entry.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 whitespace-nowrap font-medium">
                            {entry.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {new Date(entry.date).toLocaleDateString("en-PH")}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {entry.finalGrade.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {entry.wwAverage.toFixed(2)}%
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {entry.ptAverage.toFixed(2)}%
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {entry.qaScore.toFixed(2)}%
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <button
                              onClick={() => deleteHistoryEntry(entry.id)}
                              className="px-2 py-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group flex items-center gap-1"
                              title="Delete this entry"
                            >
                              <button
                                size={14}
                                className="group-hover:scale-110 transition-transform"
                              />
                              <span className="text-xs font-medium">
                                Delete
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <p className="text-sm text-gray-600">Average Grade</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {(
                      gradeHistory.reduce(
                        (sum, entry) => sum + entry.finalGrade,
                        0
                      ) / gradeHistory.length
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <p className="text-sm text-gray-600">Highest Grade</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.max(
                      ...gradeHistory.map((entry) => entry.finalGrade)
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <p className="text-sm text-gray-600">Lowest Grade</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.min(
                      ...gradeHistory.map((entry) => entry.finalGrade)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Clear All History
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
}

function TertiaryCalculator({ getMotivationalMessage }) {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("tertiary_subjects");
    return saved ? JSON.parse(saved) : [{ name: "", grade: "", units: "" }];
  });
  const [showTemplates, setShowTemplates] = useState(false);

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showModal = (title, message, type = "info") => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: "", message: "", type: "info" });
  };

  const showConfirm = (title, message, onConfirm) => {
    setConfirmModal({ isOpen: true, title, message, onConfirm });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  };

  // Save to localStorage whenever subjects change
  useEffect(() => {
    localStorage.setItem("tertiary_subjects", JSON.stringify(subjects));
  }, [subjects]);

  // Tertiary Templates
  const templates = {
    excellent_student: {
      name: "Excellent Student (Summa Potential)",
      subjects: [
        { name: "Calculus 1", grade: "1.0", units: "3" },
        { name: "Physics 101", grade: "1.25", units: "3" },
        { name: "English 1", grade: "1.0", units: "3" },
        { name: "Chemistry 101", grade: "1.5", units: "4" },
        { name: "PE 1", grade: "1.0", units: "2" },
      ],
    },
    good_student: {
      name: "Good Student (Cum Laude Track)",
      subjects: [
        { name: "Mathematics 1", grade: "1.75", units: "3" },
        { name: "Filipino 1", grade: "2.0", units: "3" },
        { name: "Introduction to Psychology", grade: "1.5", units: "3" },
        { name: "Computer Science 101", grade: "2.0", units: "3" },
        { name: "NSTP 1", grade: "1.75", units: "3" },
      ],
    },
    average_student: {
      name: "Average Student (Passing)",
      subjects: [
        { name: "Accounting 1", grade: "2.5", units: "3" },
        { name: "Business Math", grade: "2.75", units: "3" },
        { name: "English 101", grade: "2.25", units: "3" },
        { name: "Economics 101", grade: "2.5", units: "3" },
        { name: "PE 101", grade: "2.0", units: "2" },
      ],
    },
    empty: {
      name: "Empty Template",
      subjects: [{ name: "", grade: "", units: "" }],
    },
  };

  const loadTemplate = (templateKey) => {
    const template = templates[templateKey];
    showConfirm(
      "Load Template?",
      "This will replace your current data. Are you sure you want to continue?",
      () => {
        setSubjects(template.subjects);
        setShowTemplates(false);
        showModal(
          "Template Loaded",
          `Template "${template.name}" loaded successfully!`,
          "success"
        );
      }
    );
  };

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

  const clearAllData = () => {
    showConfirm(
      "Clear All Data?",
      "Are you sure you want to clear all data? This cannot be undone.",
      () => {
        setSubjects([{ name: "", grade: "", units: "" }]);
        localStorage.removeItem("tertiary_subjects");
        showModal(
          "Data Cleared",
          "All your data has been cleared successfully.",
          "success"
        );
      }
    );
  };

  const gpa = calculateGPA();

  return (
    <div className="space-y-6">
      {/* Auto-save indicator */}
      <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span className="text-sm text-green-700">
            Your data is automatically saved
          </span>
        </div>
        <button
          onClick={clearAllData}
          className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Clear All Data
        </button>
      </div>

      {/* Quick Templates */}
      <div className="border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="w-full flex items-center justify-between mb-2"
        >
          <h3 className="text-md font-bold text-cyan-800 flex items-center gap-2">
            Quick Start Templates
          </h3>
        </button>

        {showTemplates && (
          <div className="space-y-3 mt-4">
            <p className="text-sm text-gray-700">
              Load sample GPA data to see the calculator in action:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => loadTemplate("excellent_student")}
                className="p-3 bg-white border-2 border-green-300 rounded-lg hover:bg-green-50 transition-colors text-left"
              >
                <p className="font-semibold text-green-700">Summa Level</p>
                <p className="text-xs text-gray-600 mt-1">
                  GPA ~1.15 (Excellent)
                </p>
              </button>
              <button
                onClick={() => loadTemplate("good_student")}
                className="p-3 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-50/30 transition-colors text-left"
              >
                <p className="font-semibold text-blue-700">Cum Laude</p>
                <p className="text-xs text-gray-600 mt-1">
                  GPA ~1.80 (Very Good)
                </p>
              </button>
              <button
                onClick={() => loadTemplate("average_student")}
                className="p-3 bg-white border-2 border-yellow-300 rounded-lg hover:bg-yellow-50 transition-colors text-left"
              >
                <p className="font-semibold text-yellow-700">Passing</p>
                <p className="text-xs text-gray-600 mt-1">
                  GPA ~2.44 (Average)
                </p>
              </button>
              <button
                onClick={() => loadTemplate("empty")}
                className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <p className="font-semibold text-gray-700">✨ Start Fresh</p>
                <p className="text-xs text-gray-600 mt-1">Empty template</p>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-heading font-bold text-2xl text-blue-700 mb-6 flex items-center gap-2">
          Your Subjects
        </h3>
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Subject name"
                value={subject.name}
                onChange={(e) => updateSubject(index, "name", e.target.value)}
                className="p-2 border rounded border-gray-300 bg-white text-gray-900"
              />
              <input
                type="number"
                placeholder="Grade (1.0-5.0)"
                value={subject.grade}
                onChange={(e) => updateSubject(index, "grade", e.target.value)}
                step="0.25"
                min="1.0"
                max="5.0"
                className="p-2 border rounded border-gray-300 bg-white text-gray-900"
              />
              <input
                type="number"
                placeholder="Units"
                value={subject.units}
                onChange={(e) => updateSubject(index, "units", e.target.value)}
                min="0"
                step="0.5"
                className="p-2 border rounded border-gray-300 bg-white text-gray-900"
              />
              <button
                onClick={() => removeSubject(index)}
                className="px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group flex items-center gap-1.5"
                title="Remove this subject"
              >
                <button
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="hidden sm:inline text-sm font-medium">
                  Remove
                </span>
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addSubject}
          className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
          Add Subject
        </button>
      </div>

      {gpa > 0 && (
        <div className="border rounded-lg p-6 mt-6 border-blue-200 bg-blue-50">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
            GPA: {gpa.toFixed(2)}
          </h2>

          {/* GPA Performance Chart - Inverted for Visual Clarity */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="text-sm font-semibold text-center mb-2 text-gray-700">
              Subject Performance Overview
            </h3>
            <p className="text-xs text-center text-gray-500 mb-4">
              📊 Taller bars = Better grades (inverted scale for clarity)
            </p>
            <AspectRatio
              presetResponsive={{
                mobile: "portrait",
                tablet: "video",
                desktop: "widescreen",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjects
                    .filter((s) => s.grade && s.units)
                    .map((s) => {
                      const gradeNum = parseFloat(s.grade);
                      // Invert for visual clarity: 1.0 becomes 5, 5.0 becomes 1
                      const visualScore = 6 - gradeNum;
                      // Color based on performance
                      let color = "#10b981"; // Green (good)
                      if (gradeNum <= 1.5)
                        color = "#10b981"; // Excellent - Green
                      else if (gradeNum <= 2.0)
                        color = "#3b82f6"; // Very Good - Blue
                      else if (gradeNum <= 2.5)
                        color = "#f59e0b"; // Good - Orange
                      else if (gradeNum <= 3.0) color = "#ef4444"; // Fair - Red
                      else color = "#991b1b"; // Poor - Dark Red

                      return {
                        name: s.name || "Subject",
                        actualGrade: gradeNum,
                        visualScore: visualScore,
                        fill: color,
                      };
                    })}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    domain={[0, 5]}
                    stroke="#6b7280"
                    label={{
                      value: "Performance (Higher = Better)",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 12 },
                    }}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={(value) => {
                      // Show actual grades: 5 = 1.0, 4 = 2.0, etc
                      return (6 - value).toFixed(1);
                    }}
                  />
                  <Tooltip
                    formatter={(value, name, props) => [
                      `Grade: ${props.payload.actualGrade.toFixed(2)}`,
                      "",
                    ]}
                    labelFormatter={(label) => `Subject: ${label}`}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="visualScore" radius={[8, 8, 0, 0]}>
                    {subjects
                      .filter((s) => s.grade && s.units)
                      .map((s, index) => {
                        const gradeNum = parseFloat(s.grade);
                        let color = "#10b981"; // Default green
                        if (gradeNum <= 1.5)
                          color = "#10b981"; // Excellent - Green
                        else if (gradeNum <= 2.0)
                          color = "#3b82f6"; // Very Good - Blue
                        else if (gradeNum <= 2.5)
                          color = "#f59e0b"; // Good - Orange
                        else if (gradeNum <= 3.0)
                          color = "#ef4444"; // Fair - Red
                        else color = "#991b1b"; // Poor - Dark Red

                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </AspectRatio>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>1.0-1.5 (Excellent)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>1.6-2.0 (Very Good)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>2.1-2.5 (Good)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>2.6-3.0 (Fair)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-900 rounded"></div>
                <span>3.0+ (Poor)</span>
              </div>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <p className="text-sm italic font-medium">
              {getMotivationalMessage(gpa, true)}
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
}

function TermBasedCalculator({ getMotivationalMessage }) {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("termbased_subjects");
    return saved
      ? JSON.parse(saved)
      : [
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
        ];
  });

  const [weightError, setWeightError] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showModal = (title, message, type = "info") => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: "", message: "", type: "info" });
  };

  const showConfirm = (title, message, onConfirm) => {
    setConfirmModal({ isOpen: true, title, message, onConfirm });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  };

  // Save to localStorage whenever subjects change
  useEffect(() => {
    localStorage.setItem("termbased_subjects", JSON.stringify(subjects));
  }, [subjects]);

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

  const clearAllData = () => {
    showConfirm(
      "Clear All Data?",
      "Are you sure you want to clear all data? This cannot be undone.",
      () => {
        setSubjects([
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
        localStorage.removeItem("termbased_subjects");
        showModal(
          "Data Cleared",
          "All your data has been cleared successfully.",
          "success"
        );
      }
    );
  };

  // Term-Based Templates
  const templates = {
    consistent_performer: {
      name: "Consistent Performer",
      subjects: [
        {
          name: "Calculus 2",
          units: "3",
          weights: { prelim: 20, midterm: 20, prefinal: 20, final: 40 },
          grades: { prelim: "85", midterm: "87", prefinal: "86", final: "88" },
          targetGrade: "90",
          collapsed: false,
        },
        {
          name: "Physics 2",
          units: "4",
          weights: { prelim: 20, midterm: 20, prefinal: 20, final: 40 },
          grades: { prelim: "82", midterm: "84", prefinal: "83", final: "85" },
          targetGrade: "85",
          collapsed: false,
        },
      ],
    },
    strong_finish: {
      name: "Strong Final Performance",
      subjects: [
        {
          name: "Programming 101",
          units: "3",
          weights: { prelim: 20, midterm: 20, prefinal: 20, final: 40 },
          grades: { prelim: "78", midterm: "80", prefinal: "82", final: "92" },
          targetGrade: "",
          collapsed: false,
        },
        {
          name: "Data Structures",
          units: "3",
          weights: { prelim: 20, midterm: 20, prefinal: 20, final: 40 },
          grades: { prelim: "75", midterm: "78", prefinal: "81", final: "90" },
          targetGrade: "",
          collapsed: false,
        },
      ],
    },
    planning_ahead: {
      name: "Planning Ahead (Partial Grades)",
      subjects: [
        {
          name: "Accounting 2",
          units: "3",
          weights: { prelim: 20, midterm: 20, prefinal: 20, final: 40 },
          grades: { prelim: "88", midterm: "85", prefinal: "", final: "" },
          targetGrade: "90",
          collapsed: false,
        },
        {
          name: "Marketing Management",
          units: "3",
          weights: { prelim: 30, midterm: 30, prefinal: 0, final: 40 },
          grades: { prelim: "82", midterm: "86", prefinal: "", final: "" },
          targetGrade: "88",
          collapsed: false,
        },
      ],
    },
    empty: {
      name: "Empty Template",
      subjects: [
        {
          name: "",
          units: "",
          weights: { prelim: 20, midterm: 20, prefinal: 20, final: 40 },
          grades: { prelim: "", midterm: "", prefinal: "", final: "" },
          targetGrade: "",
          collapsed: false,
        },
      ],
    },
  };

  const loadTemplate = (templateKey) => {
    const template = templates[templateKey];
    showConfirm(
      "Load Template?",
      "This will replace your current data. Are you sure you want to continue?",
      () => {
        setSubjects(template.subjects);
        setShowTemplates(false);
        showModal(
          "Template Loaded",
          `Template "${template.name}" loaded successfully!`,
          "success"
        );
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Auto-save indicator */}
      <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span className="text-sm text-green-700">
            Your data is automatically saved
          </span>
        </div>
        <button
          onClick={clearAllData}
          className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Clear All Data
        </button>
      </div>

      {/* Quick Templates */}
      <div className="border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="w-full flex items-center justify-between mb-2"
        >
          <h3 className="text-md font-bold text-cyan-800 flex items-center gap-2">
            Quick Start Templates
          </h3>
        </button>

        {showTemplates && (
          <div className="space-y-3 mt-4">
            <p className="text-sm text-gray-700">
              Load sample semester data to see how term-based grading works:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => loadTemplate("consistent_performer")}
                className="p-3 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-50/30 transition-colors text-left"
              >
                <p className="font-semibold text-blue-700">📊 Consistent</p>
                <p className="text-xs text-gray-600 mt-1">Steady performance</p>
              </button>
              <button
                onClick={() => loadTemplate("strong_finish")}
                className="p-3 bg-white border-2 border-green-300 rounded-lg hover:bg-green-50 transition-colors text-left"
              >
                <p className="font-semibold text-green-700">🚀 Strong Finish</p>
                <p className="text-xs text-gray-600 mt-1">Improved over time</p>
              </button>
              <button
                onClick={() => loadTemplate("planning_ahead")}
                className="p-3 bg-white border-2 border-purple-300 rounded-lg hover:bg-purple-50 transition-colors text-left"
              >
                <p className="font-semibold text-purple-700">🎯 Planning</p>
                <p className="text-xs text-gray-600 mt-1">
                  Partial grades + target
                </p>
              </button>
              <button
                onClick={() => loadTemplate("empty")}
                className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <p className="font-semibold text-gray-700">✨ Start Fresh</p>
                <p className="text-xs text-gray-600 mt-1">Empty template</p>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-heading font-bold text-2xl text-indigo-700 mb-6 flex items-center gap-2">
          <span className="text-3xl">📅</span>
          Your Subjects
        </h3>
        {subjects.map((subject, index) => {
          const currentGrade = calculateCurrentGrade(subject);
          const requiredFinal = calculateRequiredFinalGrade(subject);

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Subject Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-lg">
                  {subject.name || `Subject ${index + 1}`}
                </h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSubjectCollapse(index)}
                    className="flex items-center px-3 py-1 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600"
                  >
                    {subject.collapsed ? <>Show Details</> : <>Hide Details</>}
                  </button>
                  <button
                    onClick={() => handleRemoveSubject(index)}
                    className="px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group flex items-center gap-1.5"
                    title="Remove this subject"
                  >
                    <button
                      size={16}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="hidden sm:inline text-sm font-medium">
                      Remove
                    </span>
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
                        className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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
                        ></span>
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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
                        className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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
                          className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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
                          className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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
                          className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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
                          className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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
                    <div className={`p-3 rounded ${"bg-gray-100"}`}>
                      <h4 className="font-medium mb-2">Prelim Grade</h4>
                      <input
                        type="number"
                        className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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

                    <div className={`p-3 rounded ${"bg-gray-100"}`}>
                      <h4 className="font-medium mb-2">Midterm Grade</h4>
                      <input
                        type="number"
                        className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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

                    <div className={`p-3 rounded ${"bg-gray-100"}`}>
                      <h4 className="font-medium mb-2">Pre-Final Grade</h4>
                      <input
                        type="number"
                        className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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

                    <div className={`p-3 rounded ${"bg-gray-100"}`}>
                      <h4 className="font-medium mb-2">Final Grade</h4>
                      <input
                        type="number"
                        className="w-full p-2 border rounded border-gray-300 bg-white text-gray-900"
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
                    <div className="mt-4 p-4 rounded-lg bg-blue-50 border-blue-200 border">
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
                        <div className={`p-3 rounded ${"bg-gray-100"}`}>
                          <p>
                            To achieve your target grade of{" "}
                            <span className="font-bold">
                              {subject.targetGrade}%
                            </span>
                            , you need:
                          </p>
                          <p className="text-xl font-bold mt-2">
                            {requiredFinal.isPossible ? (
                              <span className="text-blue-600">
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
                <div className="text-sm text-gray-600">
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
          className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
          Add Subject
        </button>
      </div>

      {subjects.some((subject) => calculateCurrentGrade(subject)) && (
        <div className="border rounded-lg p-6 mt-6 border-blue-200 bg-blue-50">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">
            Semester Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-4 rounded-lg shadow ${"bg-white"}`}>
              <h3 className="font-semibold text-lg mb-3">Subject Grades</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm">Subject</th>
                      <th className="px-4 py-2 text-left text-sm">
                        Current Grade
                      </th>
                      <th className="px-4 py-2 text-left text-sm">Target</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-gray-200 ${"bg-white"}`}>
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

            <div className={`p-4 rounded-lg shadow ${"bg-white"}`}>
              <h3 className="font-semibold text-lg mb-3">
                Semester GPA Projection
              </h3>
              <div className="text-center py-4">
                <p className="text-5xl font-bold text-blue-600">
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

      {/* Modals */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState("calculator");
  const [activeTab, setActiveTab] = useState("k12");
  const [showInstructions, setShowInstructions] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-blue-600 text-white shadow-lg">
        <div className="w-full pl-2 pr-4 py-4 flex justify-between items-center sm:pl-3">
          {/* Logo and Title - Left Side */}
          <div className="flex items-center space-x-3 ml-2 sm:ml-3">
            <img
              src="/images/CampusCalcu.png"
              alt="Campus Companion PH"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-white/20"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-display leading-tight">
                Campus Companion PH
              </h1>
              <p className="text-xs text-blue-100 hidden sm:block">
                Your Grade Calculation Companion 🇵🇭
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setCurrentView("calculator")}
              className={`px-4 py-2 font-medium transition-all relative ${
                currentView === "calculator"
                  ? "text-white"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              Calculator
              {currentView === "calculator" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setCurrentView("about")}
              className={`px-4 py-2 font-medium transition-all relative ${
                currentView === "about"
                  ? "text-white"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              About
              {currentView === "about" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setCurrentView("faq")}
              className={`px-4 py-2 font-medium transition-all relative ${
                currentView === "faq"
                  ? "text-white"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              FAQ
              {currentView === "faq" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setCurrentView("support")}
              className={`px-4 py-2 font-medium transition-all flex items-center relative ${
                currentView === "support"
                  ? "text-white"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              Support
              {currentView === "support" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"></span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-blue-700 transition-colors"
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
            <div className="absolute top-16 right-4 bg-white rounded-xl shadow-2xl py-2 z-50 min-w-[180px] md:hidden border border-gray-200">
              <button
                onClick={() => {
                  setCurrentView("calculator");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 transition-all font-medium ${
                  currentView === "calculator"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Calculator
              </button>
              <button
                onClick={() => {
                  setCurrentView("about");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 transition-all font-medium ${
                  currentView === "about"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                About
              </button>
              <button
                onClick={() => {
                  setCurrentView("faq");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 transition-all font-medium ${
                  currentView === "faq"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  setCurrentView("support");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 transition-all font-medium flex items-center ${
                  currentView === "support"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <FiCoffee className="mr-2" /> Support
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Flex grow to push footer down */}
      <main className="flex-1 w-full">
        {currentView === "about" ? (
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <About />
          </div>
        ) : currentView === "faq" ? (
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <FAQ />
          </div>
        ) : currentView === "support" ? (
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <Support />
          </div>
        ) : (
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <>
              {/* Hero Welcome Section */}
              {showInstructions && (
                <div className="mb-8 sm:mb-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                  <div className="p-6 sm:p-8 lg:p-10 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-3xl font-heading font-bold mb-2">
                          Welcome to Campus Companion PH! 🎓
                        </h2>
                        <p className="text-blue-100 text-sm">
                          The Philippines' most comprehensive grade calculator
                        </p>
                      </div>
                      <button
                        onClick={() => setShowInstructions(false)}
                        className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {/* Left column */}
                      <div className="space-y-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                          <h3 className="font-heading font-semibold text-lg mb-3">
                            ✨ What You Can Do:
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-yellow-300">📊</span>
                              <span>
                                Calculate K-12, SHS, and College GPA with
                                DepEd-compliant formulas
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-yellow-300">🎯</span>
                              <span>
                                Plan ahead with "What If" goal calculator
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-yellow-300">📈</span>
                              <span>
                                Track your progress with beautiful charts
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-yellow-300">🧠</span>
                              <span>
                                Get personalized study recommendations
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Right column */}
                      <div className="space-y-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                          <h3 className="font-heading font-semibold text-lg mb-3">
                            🚀 Quick Start:
                          </h3>
                          <ol className="list-decimal pl-5 space-y-2 text-sm">
                            <li>
                              Choose your calculator type (K-12, Tertiary, or
                              Term-Based)
                            </li>
                            <li>Try Quick Templates for instant demo</li>
                            <li>Enter your grades and see results</li>
                            <li>Export, share, or save to history</li>
                          </ol>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                            💾 Auto-Save
                          </span>
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                            📱 Mobile Friendly
                          </span>
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                            🆓 100% Free
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!showInstructions && (
                <button
                  onClick={() => setShowInstructions(true)}
                  className="mb-6 sm:mb-8 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Show Welcome Guide
                </button>
              )}

              {/* Calculator Tabs - Better Design */}
              <div className="bg-white rounded-xl shadow-md mb-6 sm:mb-8 p-1.5 flex flex-wrap gap-2">
                <button
                  className={`flex-1 min-w-[150px] px-6 py-3 font-heading font-semibold rounded-lg transition-all ${
                    activeTab === "k12"
                      ? "bg-blue-600 text-white shadow-md transform scale-105"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("k12")}
                >
                  📚 K-12 Calculator
                </button>
                <button
                  className={`flex-1 min-w-[150px] px-6 py-3 font-heading font-semibold rounded-lg transition-all ${
                    activeTab === "tertiary"
                      ? "bg-blue-600 text-white shadow-md transform scale-105"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("tertiary")}
                >
                  🎓 Tertiary (College)
                </button>
                <button
                  className={`flex-1 min-w-[150px] px-6 py-3 font-heading font-semibold rounded-lg transition-all ${
                    activeTab === "term-based"
                      ? "bg-blue-600 text-white shadow-md transform scale-105"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("term-based")}
                >
                  📅 Term-Based
                </button>
              </div>

              {/* Calculator Content with better padding */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 min-h-[500px]">
                {activeTab === "k12" ? (
                  <K12Calculator
                    getMotivationalMessage={getMotivationalMessage}
                  />
                ) : activeTab === "tertiary" ? (
                  <TertiaryCalculator
                    getMotivationalMessage={getMotivationalMessage}
                  />
                ) : (
                  <TermBasedCalculator
                    getMotivationalMessage={getMotivationalMessage}
                  />
                )}
              </div>
            </>
          </div>
        )}
      </main>

      {/* Footer - Always at bottom */}
      <footer className="mt-auto bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 border-t-4 border-blue-600">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* About Section */}
            <div>
              <h3 className="text-white font-heading font-bold text-lg mb-3 flex items-center gap-2">
                <img
                  src="/images/CampusCalcu.png"
                  alt="Campus Companion PH"
                  className="w-8 h-8 rounded-full"
                />
                Campus Companion PH
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Your comprehensive Philippine grade calculator designed for
                K-12, SHS, and college students. Free, accurate, and easy to
                use.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-heading font-semibold mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentView("calculator")}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    📊 Grade Calculator
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView("about")}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    ℹ️ About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView("faq")}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    ❓ FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView("support")}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    ☕ Support Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Developer Info */}
            <div>
              <h4 className="text-white font-heading font-semibold mb-3">
                Developer
              </h4>
              <p className="text-sm text-gray-400 mb-2">
                Created with ❤️ by{" "}
                <span className="text-blue-400 font-semibold">
                  CodeWithClarence
                </span>
              </p>
              <a
                href="https://codewithclarence.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-block"
              >
                🌐 Visit Portfolio →
              </a>
              <p className="text-xs text-gray-500 mt-3">
                Based on DepEd Order No. 8, s. 2015
              </p>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Campus Companion PH. All rights
              reserved.
              <span className="mx-2">|</span>
              Made for Filipino Students 🇵🇭
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
