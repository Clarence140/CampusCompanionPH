"use client";

import { useState } from "react";
import { FiHeart, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AspectRatio } from "./ui/AspectRatio";

export default function Support() {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6 text-blue-600">
          Support This Project
        </h2>
        <p className="text-base sm:text-lg text-gray-600 px-4">
          Help keep Campus Companion PH free for all Filipino students
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
        <div className="mb-8 sm:mb-10">
          <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 sm:mb-6 flex items-center text-gray-900">
            <FiHeart className="mr-3 text-red-500" size={28} /> Buy Me a Coffee
          </h3>
          <p className="mb-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            If you find this tool helpful and would like to support my
            development work, you can buy me a coffee! Your support helps me
            continue creating free, useful tools for students and educators.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <h4 className="font-semibold text-gray-900">Payment Options</h4>
            <button
              onClick={() => setShowPaymentOptions(!showPaymentOptions)}
              className="flex items-center px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm sm:text-base"
            >
              {showPaymentOptions ? (
                <>
                  <FiChevronUp className="mr-2" /> Hide Options
                </>
              ) : (
                <>
                  <FiChevronDown className="mr-2" /> Show Options
                </>
              )}
            </button>
          </div>

          {showPaymentOptions && (
            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center mt-6 sm:mt-8 animate-fade-in">
              <div className="p-4 sm:p-6 rounded-xl bg-gray-100 border border-gray-200 text-center w-full max-w-xs shadow-sm hover:shadow-md transition-shadow">
                <AspectRatio
                  preset="square"
                  rounded="xl"
                  objectFit="contain"
                  className="cursor-pointer group bg-white"
                  onClick={() => setZoomedImage("/images/Gcash.jpg")}
                >
                  <img
                    src="/images/Gcash.jpg"
                    alt="GCash QR Code"
                    className="w-full h-full object-contain p-2 group-hover:opacity-90 transition-opacity duration-200"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 rounded-xl">
                    <span className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Click to enlarge
                    </span>
                  </div>
                </AspectRatio>
                <p className="font-semibold mt-4 text-gray-900">
                  GCash: 09692234028
                </p>
                <p className="text-sm text-gray-600 mt-1">Clarence Sumagang</p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl bg-gray-100 border border-gray-200 text-center w-full max-w-xs shadow-sm hover:shadow-md transition-shadow">
                <AspectRatio
                  preset="square"
                  rounded="xl"
                  objectFit="contain"
                  className="cursor-pointer group bg-white"
                  onClick={() => setZoomedImage("/images/Maya.jpg")}
                >
                  <img
                    src="/images/Maya.jpg"
                    alt="Maya QR Code"
                    className="w-full h-full object-contain p-2 group-hover:opacity-90 transition-opacity duration-200"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 rounded-xl">
                    <span className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Click to enlarge
                    </span>
                  </div>
                </AspectRatio>
                <p className="font-semibold mt-4 text-gray-900">
                  Maya: 09692234028
                </p>
                <p className="text-sm text-gray-600 mt-1">Clarence Sumagang</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm sm:text-base text-gray-600 border-t border-gray-200 pt-6 sm:pt-8 mt-8 sm:mt-10">
          <p className="mb-3 leading-relaxed">
            Your support, no matter how small, makes a huge difference in
            keeping this project alive and improving it for all Filipino
            students.
          </p>
          <p className="font-medium">
            Thank you for being part of the Campus Companion PH community! 🇵🇭
          </p>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 animate-fade-in"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-lg shadow-2xl p-4 sm:p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors z-10"
              onClick={() => setZoomedImage(null)}
              aria-label="Close zoomed image"
            >
              <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <img
              src={zoomedImage || "/placeholder.svg"}
              alt="Zoomed QR Code"
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
