"use client";

import { useState } from "react";
import { FiHeart, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Support() {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4 text-blue-600">
          Support This Project
        </h2>
        <p className="text-lg text-gray-600">
          Help keep Campus Companion PH free for all Filipino students
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold mb-4 flex items-center text-gray-900">
            <FiHeart
              className="mr-3 text-red-500"
              size={28}
            />{" "}
            Buy Me a Coffee
          </h3>
          <p className="mb-4">
            If you find this tool helpful and would like to support my
            development work, you can buy me a coffee! Your support helps me
            continue creating free, useful tools for students and educators.
          </p>

          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Payment Options</h4>
            <button
              onClick={() => setShowPaymentOptions(!showPaymentOptions)}
              className="flex items-center px-3 py-1 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600"
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
              <div className="p-4 rounded-lg bg-gray-100 text-center w-full max-w-xs">
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
                <p className="text-sm text-gray-500">
                  Clarence Sumagang
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gray-100 text-center w-full max-w-xs">
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
                <p className="text-sm text-gray-500">
                  Clarence Sumagang
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-6 mt-8">
          <p className="mb-2">
            Your support, no matter how small, makes a huge difference in
            keeping this project alive and improving it for all Filipino
            students.
          </p>
          <p>
            Thank you for being part of the Campus Companion PH community! 🇵🇭
          </p>
        </div>
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
              className="absolute top-4 right-4 rounded-full p-2 shadow-lg bg-white text-gray-800"
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
    </div>
  );
}
