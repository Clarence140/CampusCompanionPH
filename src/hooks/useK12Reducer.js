import { useReducer, useEffect } from "react";

const STORAGE_KEY = "k12_calculator";

const initialState = {
  gradeLevel: "1",
  subjectType: "core",
  writtenWorks: [{ name: "", score: "", maxScore: "" }],
  performanceTasks: [{ name: "", score: "", maxScore: "" }],
  quarterlyAssessment: { score: "", maxScore: "" },
  targetGrade: "",
  gradeHistory: [],
};

function k12Reducer(state, action) {
  switch (action.type) {
    case "SET_GRADE_LEVEL":
      return { ...state, gradeLevel: action.payload };
    case "SET_SUBJECT_TYPE":
      return { ...state, subjectType: action.payload };

    // Written Works
    case "SET_WRITTEN_WORKS":
      return { ...state, writtenWorks: action.payload };
    case "ADD_WRITTEN_WORK":
      return {
        ...state,
        writtenWorks: [
          ...state.writtenWorks,
          { name: "", score: "", maxScore: "" },
        ],
      };
    case "ADD_MULTIPLE_WRITTEN_WORKS": {
      const newItems = Array.from({ length: action.payload }, () => ({
        name: "",
        score: "",
        maxScore: "",
      }));
      return {
        ...state,
        writtenWorks: [...state.writtenWorks, ...newItems],
      };
    }
    case "REMOVE_WRITTEN_WORK":
      return {
        ...state,
        writtenWorks: state.writtenWorks.filter(
          (_, i) => i !== action.payload
        ),
      };
    case "UPDATE_WRITTEN_WORK": {
      const newWorks = [...state.writtenWorks];
      newWorks[action.payload.index] = {
        ...newWorks[action.payload.index],
        [action.payload.field]: action.payload.value,
      };
      return { ...state, writtenWorks: newWorks };
    }
    case "BULK_IMPORT_WRITTEN_WORKS":
      return {
        ...state,
        writtenWorks: [...state.writtenWorks, ...action.payload],
      };

    // Performance Tasks
    case "SET_PERFORMANCE_TASKS":
      return { ...state, performanceTasks: action.payload };
    case "ADD_PERFORMANCE_TASK":
      return {
        ...state,
        performanceTasks: [
          ...state.performanceTasks,
          { name: "", score: "", maxScore: "" },
        ],
      };
    case "ADD_MULTIPLE_PERFORMANCE_TASKS": {
      const newItems = Array.from({ length: action.payload }, () => ({
        name: "",
        score: "",
        maxScore: "",
      }));
      return {
        ...state,
        performanceTasks: [...state.performanceTasks, ...newItems],
      };
    }
    case "REMOVE_PERFORMANCE_TASK":
      return {
        ...state,
        performanceTasks: state.performanceTasks.filter(
          (_, i) => i !== action.payload
        ),
      };
    case "UPDATE_PERFORMANCE_TASK": {
      const newTasks = [...state.performanceTasks];
      newTasks[action.payload.index] = {
        ...newTasks[action.payload.index],
        [action.payload.field]: action.payload.value,
      };
      return { ...state, performanceTasks: newTasks };
    }
    case "BULK_IMPORT_PERFORMANCE_TASKS":
      return {
        ...state,
        performanceTasks: [...state.performanceTasks, ...action.payload],
      };

    // Quarterly Assessment
    case "SET_QUARTERLY_ASSESSMENT":
      return { ...state, quarterlyAssessment: action.payload };
    case "UPDATE_QUARTERLY_ASSESSMENT":
      return {
        ...state,
        quarterlyAssessment: { ...state.quarterlyAssessment, ...action.payload },
      };

    // Target Grade
    case "SET_TARGET_GRADE":
      return { ...state, targetGrade: action.payload };

    // Grade History
    case "SET_GRADE_HISTORY":
      return { ...state, gradeHistory: action.payload };
    case "ADD_HISTORY_ENTRY":
      return {
        ...state,
        gradeHistory: [...state.gradeHistory, action.payload],
      };
    case "DELETE_HISTORY_ENTRY":
      return {
        ...state,
        gradeHistory: state.gradeHistory.filter(
          (e) => e.id !== action.payload
        ),
      };
    case "CLEAR_HISTORY":
      return { ...state, gradeHistory: [] };

    // Bulk actions
    case "LOAD_TEMPLATE":
      return {
        ...state,
        gradeLevel: action.payload.gradeLevel,
        subjectType: action.payload.subjectType,
        writtenWorks: action.payload.writtenWorks,
        performanceTasks: action.payload.performanceTasks,
        quarterlyAssessment: action.payload.quarterlyAssessment,
      };
    case "CLEAR_ALL_DATA":
      return {
        ...initialState,
        gradeHistory: state.gradeHistory,
      };

    default:
      return state;
  }
}

function loadInitialState() {
  try {
    // Try new unified key first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...initialState, ...JSON.parse(saved) };
    }

    // Migrate from old individual keys
    const migrated = { ...initialState };
    const oldKeys = {
      gradeLevel: "k12_gradeLevel",
      subjectType: "k12_subjectType",
      writtenWorks: "k12_writtenWorks",
      performanceTasks: "k12_performanceTasks",
      quarterlyAssessment: "k12_quarterlyAssessment",
      gradeHistory: "k12_gradeHistory",
    };

    let hasMigrated = false;
    for (const [stateKey, storageKey] of Object.entries(oldKeys)) {
      const value = localStorage.getItem(storageKey);
      if (value) {
        try {
          migrated[stateKey] = JSON.parse(value);
          hasMigrated = true;
        } catch {
          // skip invalid values
        }
      }
    }

    const targetGrade = localStorage.getItem("k12_targetGrade");
    if (targetGrade) {
      migrated.targetGrade = targetGrade;
      hasMigrated = true;
    }

    // Clean up old keys after migration
    if (hasMigrated) {
      Object.values(oldKeys).forEach((key) => localStorage.removeItem(key));
      localStorage.removeItem("k12_targetGrade");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    }

    return migrated;
  } catch {
    return initialState;
  }
}

export default function useK12Calculator() {
  const [state, dispatch] = useReducer(k12Reducer, null, loadInitialState);

  // Single useEffect syncs entire state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return {
    // State values
    gradeLevel: state.gradeLevel,
    subjectType: state.subjectType,
    writtenWorks: state.writtenWorks,
    performanceTasks: state.performanceTasks,
    quarterlyAssessment: state.quarterlyAssessment,
    targetGrade: state.targetGrade,
    gradeHistory: state.gradeHistory,

    // Backward-compatible setters
    setGradeLevel: (v) => dispatch({ type: "SET_GRADE_LEVEL", payload: v }),
    setSubjectType: (v) => dispatch({ type: "SET_SUBJECT_TYPE", payload: v }),
    setWrittenWorks: (v) => dispatch({ type: "SET_WRITTEN_WORKS", payload: v }),
    setPerformanceTasks: (v) =>
      dispatch({ type: "SET_PERFORMANCE_TASKS", payload: v }),
    setQuarterlyAssessment: (v) =>
      dispatch({ type: "SET_QUARTERLY_ASSESSMENT", payload: v }),
    setTargetGrade: (v) => dispatch({ type: "SET_TARGET_GRADE", payload: v }),
    setGradeHistory: (v) =>
      dispatch({ type: "SET_GRADE_HISTORY", payload: v }),

    // Dispatch for advanced reducer actions
    dispatch,
  };
}
