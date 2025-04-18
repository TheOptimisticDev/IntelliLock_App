import React, { useState, useEffect } from "react";
import { MapPin, X } from "lucide-react";

const safetyTips = [
  "Never share your card PIN with anyone.",
  "Report lost or stolen cards immediately.",
  "Use your card only on secure, trusted websites.",
  "Check transaction notifications regularly.",
  "Enable two-factor authentication when available.",
];

const LocationInsights: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState("Johannesburg");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safetyTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div className="w-full rounded-xl overflow-hidden px-6 mb-6 bg-transparent">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-5 h-5 text-gray-700" />
          <button onClick={toggleModal} className="text-left">
            <h3 className="text-lg font-semibold text-gray-800 underline underline-offset-2 hover:text-gray-600 transition">
              {location}
            </h3>
          </button>
        </div>

        <p className="text-gray-600 text-sm transition-opacity duration-500 ease-in-out">
          {safetyTips[activeIndex]}
        </p>

        <div className="flex justify-center mt-3 gap-2">
          {safetyTips.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "bg-gray-700 scale-110" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[95%] max-w-md p-6 relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-lg font-semibold mb-4">{location}</h4>
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-600 text-sm rounded-md">
              {location}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationInsights;


