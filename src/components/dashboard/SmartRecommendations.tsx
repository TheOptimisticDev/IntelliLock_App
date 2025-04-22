import React, { useState, useEffect, useRef } from "react";
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
  const [location, setLocation] = useState("Soweto, Johannesburg.");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safetyTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div
      ref={modalRef}
      className="bg-white rounded-xl shadow-xl w-[95%] max-w-md p-6 relative"
    >
      <button
        onClick={toggleModal}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
      >
        <X className="w-5 h-5" />
      </button>
      <h4 className="text-lg font-semibold mb-4">{location}</h4>

      {/* Image */}
      <img
        src="/public/mock-map.PNG"
        alt="Location map"
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      {/* Description */}
      <div className="text-sm text-gray-600">
        This is your current location, 
        used by IntelliLock to enhance and provide tailored 
        safety recommendations.
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default LocationInsights;
