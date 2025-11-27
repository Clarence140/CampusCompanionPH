"use client";

import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiSearch,
  FiX,
} from "react-icons/fi";

const faqs = [
  {
    question: "What grading systems does this calculator support?",
    answer:
      "The calculator supports three main grading systems: DepEd K-12 grading system (Grades 1-12) as per DepEd Order No. 8, s. 2015, tertiary grading systems used in Philippine universities (1.0-5.0 scale), and customizable term-based grading systems.",
    details:
      "For K-12, it follows the exact transmutation table and weight distribution specified by DepEd. For tertiary, it supports both percentage-based and direct grade input systems with GPA calculations. The term-based calculator allows you to set custom weights for different assessment periods.",
  },
  {
    question:
      "What are Written Works, Performance Tasks, and Quarterly Assessment?",
    answer:
      "These are the three main components of the DepEd K-12 grading system, each with specific purposes and weight distributions.",
    details: (
      <div>
        <p className="mb-2">
          <strong>Written Works (WW):</strong>
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>Traditional pen-and-paper assessments</li>
          <li>Includes quizzes, tests, long tests, and unit exams</li>
          <li>Measures knowledge retention and understanding</li>
          <li>Weight: 30% (Grades 1-10), 40% (Grades 7-10), 50% (SHS)</li>
        </ul>
        <p className="mb-2">
          <strong>Performance Tasks (PT):</strong>
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>Hands-on, practical applications of learning</li>
          <li>Includes projects, presentations, experiments, demonstrations</li>
          <li>Measures ability to apply knowledge and skills</li>
          <li>Weight: 50% (Grades 1-6), 40% (Grades 7-10), 30% (SHS)</li>
        </ul>
        <p className="mb-2">
          <strong>Quarterly Assessment (QA):</strong>
        </p>
        <ul className="list-disc pl-5">
          <li>Major examination at the end of each quarter</li>
          <li>Comprehensive test covering all topics in the quarter</li>
          <li>Measures overall mastery of quarterly objectives</li>
          <li>Weight: 20% (All grade levels)</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How are the grade weights determined for each component?",
    answer:
      "The weights are based on official DepEd guidelines and vary by grade level to reflect developmental appropriateness.",
    details: (
      <div>
        <p className="mb-2">
          <strong>Elementary (Grades 1-6):</strong>
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>Written Works: 30% - Basic assessment of learning</li>
          <li>Performance Tasks: 50% - Emphasis on hands-on learning</li>
          <li>Quarterly Assessment: 20% - Summative evaluation</li>
        </ul>
        <p className="mb-2">
          <strong>Junior High School (Grades 7-10):</strong>
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>Written Works: 40% - Increased emphasis on written assessment</li>
          <li>Performance Tasks: 40% - Balanced practical application</li>
          <li>Quarterly Assessment: 20% - Consistent summative weight</li>
        </ul>
        <p className="mb-2">
          <strong>Senior High School:</strong>
        </p>
        <ul className="list-disc pl-5">
          <li>Written Works: 50% - Preparation for higher education</li>
          <li>Performance Tasks: 30% - Specialized skill demonstration</li>
          <li>Quarterly Assessment: 20% - Comprehensive evaluation</li>
        </ul>
      </div>
    ),
  },
  {
    question: "What formulas are used in grade calculations?",
    answer:
      "The calculator uses official DepEd formulas for K-12 and standard GPA formulas for tertiary education.",
    details: (
      <div>
        <p className="mb-2">
          <strong>K-12 Final Grade Formula:</strong>
        </p>
        <p className="mb-2 font-mono bg-gray-100 p-2 rounded">
          Final Grade = (WW Average × WW Weight) + (PT Average × PT Weight) +
          (QA Score × QA Weight)
        </p>
        <p className="mb-2">
          <strong>Component Average Formula:</strong>
        </p>
        <p className="mb-2 font-mono bg-gray-100 p-2 rounded">
          Component Average = Σ(Score/Max Score × 100) ÷ Number of Activities
        </p>
        <p className="mb-2">
          <strong>Tertiary GPA Formula:</strong>
        </p>
        <p className="mb-2 font-mono bg-gray-100 p-2 rounded">
          GPA = Σ(Grade × Units) ÷ Total Units
        </p>
        <p className="mb-2">
          <strong>Term-Based Formula:</strong>
        </p>
        <p className="font-mono bg-gray-100 p-2 rounded">
          Final Grade = (Prelim × Prelim%) + (Midterm × Midterm%) + (PreFinal ×
          PreFinal%) + (Final × Final%)
        </p>
      </div>
    ),
  },
  {
    question: "What is the DepEd transmutation table and how does it work?",
    answer:
      "The transmutation table converts percentage scores to the standard 75-100 grading scale used in the Philippines.",
    details: (
      <div>
        <p className="mb-2">The transmutation table ensures that:</p>
        <ul className="list-disc pl-5 mb-3">
          <li>A score of 0% becomes 75 (lowest passing grade)</li>
          <li>A score of 100% remains 100 (highest grade)</li>
          <li>Scores are proportionally distributed between 75-100</li>
          <li>
            The formula used is: Transmuted Grade = (Raw Score × 0.25) + 75
          </li>
        </ul>
        <p className="mb-2">
          <strong>Grade Descriptors:</strong>
        </p>
        <ul className="list-disc pl-5">
          <li>90-100: Outstanding</li>
          <li>85-89: Very Satisfactory</li>
          <li>80-84: Satisfactory</li>
          <li>75-79: Fairly Satisfactory</li>
          <li>Below 75: Did Not Meet Expectations</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How do I use the K-12 Calculator?",
    answer:
      "The K-12 Calculator is designed for elementary and high school students following the DepEd grading system.",
    details: (
      <div>
        <p className="mb-2">
          <strong>Step-by-step guide:</strong>
        </p>
        <ol className="list-decimal pl-5 mb-3">
          <li>Select your grade level (1-12 or SHS)</li>
          <li>Choose your subject type (Core, Applied, or Specialized)</li>
          <li>Add your Written Works with scores and maximum points</li>
          <li>Add your Performance Tasks with scores and maximum points</li>
          <li>Enter your Quarterly Assessment score and maximum points</li>
          <li>View your calculated final grade and component breakdowns</li>
        </ol>
        <p className="mb-2">
          <strong>Tips:</strong>
        </p>
        <ul className="list-disc pl-5">
          <li>You can add multiple activities for each component</li>
          <li>Leave fields empty if you haven't taken the assessment yet</li>
          <li>The calculator automatically applies the correct weights</li>
          <li>Use the "Add" buttons to include more activities</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How do I use the Tertiary Calculator?",
    answer:
      "The Tertiary Calculator is for college students who want to compute their GPA using the standard 1.0-5.0 grading scale.",
    details: (
      <div>
        <p className="mb-2">
          <strong>How to use:</strong>
        </p>
        <ol className="list-decimal pl-5 mb-3">
          <li>Enter the course name (optional but recommended)</li>
          <li>Input your final grade for the course (1.0-5.0 scale)</li>
          <li>Enter the number of units/credits for the course</li>
          <li>Add more courses using the "Add Course" button</li>
          <li>View your calculated GPA</li>
        </ol>
        <p className="mb-2">
          <strong>Grade Scale Reference:</strong>
        </p>
        <ul className="list-disc pl-5">
          <li>1.0-1.5: Excellent (Summa Cum Laude level)</li>
          <li>1.6-1.75: Very Good (Magna Cum Laude level)</li>
          <li>1.76-2.0: Good (Cum Laude level)</li>
          <li>2.1-3.0: Satisfactory</li>
          <li>3.1-5.0: Needs Improvement</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How do I use the Term-Based Calculator?",
    answer:
      "The Term-Based Calculator allows you to set custom weights for different grading periods and calculate what you need to achieve your target grade.",
    details: (
      <div>
        <p className="mb-2">
          <strong>Setup process:</strong>
        </p>
        <ol className="list-decimal pl-5 mb-3">
          <li>Enter course name and units</li>
          <li>Set your target grade for the course</li>
          <li>Adjust the percentage weights for each term (must total 100%)</li>
          <li>Enter grades as you complete each term</li>
          <li>View your current grade and required final grade</li>
        </ol>
        <p className="mb-2">
          <strong>Features:</strong>
        </p>
        <ul className="list-disc pl-5">
          <li>Collapsible course sections to save space</li>
          <li>Real-time calculation of required grades</li>
          <li>Validation that weights sum to 100%</li>
          <li>Semester GPA projection</li>
          <li>Possibility indicator for target grades</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Can I save my calculations for future reference?",
    answer:
      "Currently, the calculator doesn't have a permanent save feature, but your inputs persist during your session.",
    details:
      "Your data will remain as long as you don't refresh the page or close your browser. We're working on adding user accounts and cloud saving in future updates. For now, you can take screenshots of your results or manually record important calculations.",
  },
  {
    question: "How accurate are the calculations?",
    answer:
      "The calculations follow official DepEd guidelines for K-12 and standard university practices for tertiary education, ensuring high accuracy.",
    details:
      "All formulas are based on official documentation and have been tested extensively. However, always verify with your institution's specific policies as some schools may have slight variations in their grading systems or additional requirements.",
  },
  {
    question: "What if my school uses a different grading system?",
    answer:
      "You can adapt the calculators to your school's system or use the Term-Based Calculator for maximum flexibility.",
    details:
      "The Term-Based Calculator allows you to set custom weights that match your school's grading system. If your school uses a completely different scale, you may need to convert grades accordingly. Contact us if you need help adapting the calculator to your specific system.",
  },
  {
    question: "Why are my grades different from what my teacher calculated?",
    answer:
      "Differences may occur due to rounding methods, additional factors, or school-specific policies not reflected in the standard calculation.",
    details:
      "Some possible reasons include: different rounding rules, bonus points or extra credit, attendance or participation grades, school-specific adjustments, or manual calculation errors. Always consult with your teacher if there are significant discrepancies.",
  },
  {
    question: "Can parents and teachers use this calculator?",
    answer:
      "This calculator is designed to be useful for students, parents, and educators alike.",
    details:
      "Parents can use it to understand their child's grades better and help set realistic goals. Teachers can use it to verify their calculations, explain the grading system to students and parents, or demonstrate how different scores affect final grades. The transparent calculations help build trust and understanding in the grading process.",
  },
  {
    question: "Is this calculator free to use?",
    answer:
      "Yes, Campus Companion PH is completely free to use. There are no hidden fees, subscriptions, or premium features.",
    details:
      "This tool was created to help Filipino students succeed academically, regardless of their economic background. If you find it helpful and would like to support the developer, you can make a voluntary donation, but it's not required to use any features.",
  },
  {
    question: "How often is the calculator updated?",
    answer:
      "The calculator is regularly updated to reflect changes in educational policies and to add new features based on user feedback.",
    details:
      "We monitor DepEd announcements for any changes to grading guidelines and update the calculator accordingly. New features and improvements are added based on user suggestions and technological advances. Follow our updates through the About section for the latest changes.",
  },
  {
    question:
      "What are Core Subjects, Specialized Subjects, and Applied Track?",
    answer:
      "These are the three main subject categories in the Philippine K-12 curriculum, each serving different educational purposes and career preparation goals.",
    details: (
      <div>
        <p className="mb-2">
          <strong>Core Subjects:</strong>
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>
            Foundation subjects required for all students regardless of track
          </li>
          <li>
            Includes: English, Filipino, Mathematics, Science, Social Studies
            (Araling Panlipunan)
          </li>
          <li>
            Provides essential knowledge and skills for citizenship and lifelong
            learning
          </li>
          <li>
            Taken from Kindergarten through Grade 10, with some continuing in
            Senior High School
          </li>
          <li>
            Forms the basis for critical thinking and communication skills
          </li>
        </ul>
        <p className="mb-2">
          <strong>Specialized Subjects:</strong>
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>
            Track-specific subjects that prepare students for their chosen
            career path
          </li>
          <li>Available in Senior High School (Grades 11-12) only</li>
          <li>
            Examples: STEM subjects (Advanced Chemistry, Physics), ABM subjects
            (Business Math, Entrepreneurship), HUMSS subjects (Creative Writing,
            Philosophy)
          </li>
          <li>Designed to develop expertise in specific fields</li>
          <li>Directly related to college courses and career preparation</li>
        </ul>
        <p className="mb-2">
          <strong>Applied Track Subjects:</strong>
        </p>
        <ul className="list-disc pl-5">
          <li>
            Hands-on, practical subjects that develop technical and vocational
            skills
          </li>
          <li>Focus on immediate employability after Senior High School</li>
          <li>
            Examples: Automotive Technology, Culinary Arts, Electronics,
            Agriculture, Tourism
          </li>
          <li>Include industry immersion and work-based learning</li>
          <li>Lead to National Certificates (NC) recognized by TESDA</li>
          <li>
            Prepare students for direct entry into the workforce or
            entrepreneurship
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "How do I choose the right subject type in the K-12 Calculator?",
    answer:
      "Select the subject type based on the nature of the subject you're calculating grades for, as this affects the grading approach and expectations.",
    details: (
      <div>
        <p className="mb-2">
          <strong>When to select Core Subject:</strong>
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>
            For English, Filipino, Mathematics, Science, and Social Studies
          </li>
          <li>
            For subjects required by all students regardless of their track
          </li>
          <li>
            When calculating grades for foundation subjects in any grade level
          </li>
        </ul>
        <p className="mb-2">
          <strong>When to select Specialized Subject:</strong>
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>For track-specific subjects in Senior High School</li>
          <li>
            For advanced subjects like Calculus, Organic Chemistry, or Creative
            Writing
          </li>
          <li>
            When the subject is directly related to your chosen academic track
            (STEM, ABM, HUMSS, GAS)
          </li>
        </ul>
        <p className="mb-2">
          <strong>When to select Applied Track:</strong>
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>For technical-vocational subjects with hands-on components</li>
          <li>
            For subjects that include laboratory work, workshops, or practical
            demonstrations
          </li>
          <li>
            When the subject leads to industry certification or TESDA
            qualifications
          </li>
        </ul>
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> The subject type selection helps the calculator
          apply appropriate assessment methods and expectations, though the core
          calculation formula remains the same across all types.
        </p>
      </div>
    ),
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleDetails = (index) => {
    setShowDetails((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const searchLower = searchTerm.toLowerCase();
    const questionMatch = faq.question.toLowerCase().includes(searchLower);
    const answerMatch = faq.answer.toLowerCase().includes(searchLower);

    // Handle both string and JSX details by converting JSX to searchable text
    let detailsMatch = false;
    if (faq.details) {
      if (typeof faq.details === "string") {
        detailsMatch = faq.details.toLowerCase().includes(searchLower);
      } else {
        // For JSX content, convert to string representation for searching
        const detailsString = JSON.stringify(faq.details).toLowerCase();
        detailsMatch = detailsString.includes(searchLower);
      }
    }

    return questionMatch || answerMatch || detailsMatch;
  });

  const clearSearch = () => {
    setSearchTerm("");
    setActiveIndex(null);
    setShowDetails({});
  };

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4 text-blue-600">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">
          Everything you need to know about using Campus Companion PH
        </p>
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FiX />
            </button>
          )}
        </div>

        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}{" "}
            found
            {filteredFaqs.length === 0 && " - try different keywords"}
          </p>
        )}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const originalIndex = faqs.findIndex(
            (originalFaq) => originalFaq.question === faq.question
          );

          return (
            <div
              key={originalIndex}
              className="border rounded-lg overflow-hidden border-gray-200"
            >
              <button
                className="w-full p-4 text-left flex justify-between items-center bg-white hover:bg-gray-50"
                onClick={() => toggleFAQ(originalIndex)}
              >
                <span className="font-medium">{faq.question}</span>
                {activeIndex === originalIndex ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>

              {activeIndex === originalIndex && (
                <div className="p-4 bg-gray-50">
                  <p className="mb-3">{faq.answer}</p>

                  {faq.details && (
                    <div className="mt-3">
                      <button
                        onClick={() => toggleDetails(originalIndex)}
                        className="text-sm flex items-center text-blue-600"
                      >
                        <FiInfo className="mr-1" />
                        {showDetails[originalIndex]
                          ? "Hide details"
                          : "Show more details"}
                      </button>

                      {showDetails[originalIndex] && (
                        <div className="mt-2 p-3 rounded bg-gray-100">
                          {typeof faq.details === "string" ? (
                            <p>{faq.details}</p>
                          ) : (
                            faq.details
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results Message */}
      {searchTerm && filteredFaqs.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          <p className="text-lg mb-2">No FAQs found matching "{searchTerm}"</p>
          <p className="text-sm">
            Try searching for terms like "grade", "calculator", "DepEd", "GPA",
            or "subject"
          </p>
        </div>
      )}
    </div>
  );
}
