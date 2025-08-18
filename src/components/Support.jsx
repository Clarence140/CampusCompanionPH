"use client";

import { useState } from "react";
import { FiHeart, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Support({ darkMode }) {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Support This Project
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FiHeart className="mr-2" /> Buy Me a Coffee
        </h3>
        <p className="mb-4">
          If you find this tool helpful and would like to support my development
          work, you can buy me a coffee! Your support helps me continue creating
          free, useful tools for students and educators.
        </p>

        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Payment Options</h4>
          <button
            onClick={() => setShowPaymentOptions(!showPaymentOptions)}
            className={`flex items-center px-3 py-1 rounded-lg transition-colors ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            {showPaymentOptions ? (
              <>
                <FiChevronUp className="mr-1" /> Hide Options
              </>
            ) : (
              <>
                <FiChevronDown className="mr-1" /> Show Options
              </>
            )}
          </button>
        </div>

        {showPaymentOptions && (
          <div className="flex flex-wrap gap-6 justify-center mt-6">
            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              } text-center w-full max-w-xs`}
            >
              <div
                className="w-full h-64 relative cursor-pointer overflow-hidden group"
                onClick={() => setZoomedImage("/images/Gcash.jpg")}
              >
                <img
                  src="/images/Gcash.jpg"
                  alt="GCash QR Code"
                  className="w-full h-full object-contain group-hover:opacity-90 transition-opacity duration-200"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
                    Click to enlarge
                  </span>
                </div>
              </div>
              <p className="font-medium mt-2">GCash: 09692234028</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Clarence Sumagang
              </p>
            </div>

            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              } text-center w-full max-w-xs`}
            >
              <div
                className="w-full h-64 relative cursor-pointer overflow-hidden group"
                onClick={() => setZoomedImage("/images/Maya.jpg")}
              >
                <img
                  src="/images/Maya.jpg"
                  alt="Maya QR Code"
                  className="w-full h-full object-contain group-hover:opacity-90 transition-opacity duration-200"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
                    Click to enlarge
                  </span>
                </div>
              </div>
              <p className="font-medium mt-2">Maya: 09692234028</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Clarence Sumagang
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-2xl w-full">
            <img
              src={zoomedImage || "/placeholder.svg"}
              alt="Zoomed QR Code"
              className="w-full max-h-[90vh] object-contain"
            />
            <button
              className={`absolute top-4 right-4 rounded-full p-2 shadow-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
              aria-label="Close zoomed image"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p className="mb-2">
          Your support, no matter how small, makes a huge difference in keeping
          this project alive and improving it for all Filipino students.
        </p>
        <p>Thank you for being part of the Campus Companion PH community! 🇵🇭</p>
      </div>
    </div>
  );
}
