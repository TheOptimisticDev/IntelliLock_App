import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const OnboardingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      title: "AI-Powered Protection",
      description: "Intellilock uses advanced AI to monitor and protect your financial transactions in real-time.",
      image: "/images/ai.png",
      alt: "Artificial Intelligence"
    },
    {
      title: "Instant Fraud Detection",
      description: "Get immediate alerts for suspicious activities and block fraudulent transactions with one tap.",
      image: "/images/fraud.png",
      alt: "Fraud Detection"
    },
    {
      title: "Seamless Biometric Access",
      description: "Secure your account with fingerprint or face recognition for quick and safe access.",
      image: "/images/biometric.png",
      alt: "Biometric Authentication"
    }
  ];

  // Slide navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetAutoplay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetAutoplay();
  };

  // Auto-play controls
  const resetAutoplay = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(startAutoplay, 6000);
  };

  const startAutoplay = () => {
    slideIntervalRef.current = setInterval(nextSlide, 3000);
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    const handleTouchEnd = (e: TouchEvent) => {
      const diffX = e.changedTouches[0].clientX - touchX;
      if (diffX > 50) prevSlide();
      if (diffX < -50) nextSlide();
      document.removeEventListener('touchend', handleTouchEnd);
    };
    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };

  // Initialize and clean up
  useEffect(() => {
    startAutoplay();
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/subscribe');
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-between max-w-md mx-auto py-4">
        {/* Image Container */}
        <div 
          className="w-full flex-1 flex items-center justify-center relative mb-4"
          onTouchStart={handleTouchStart}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full max-w-[320px] max-h-[320px] md:max-w-[400px] md:max-h-[400px] flex items-center justify-center">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].alt}
                className="object-contain w-full h-full transition-opacity duration-500"
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'contain' 
                }}
              />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="w-full text-center mb-4 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {slides[currentSlide].title}
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Slide Indicator */}
        <div className="flex justify-center space-x-2 mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-intellilock-blue w-6' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="w-full px-4 pb-4">
          <Button
            className="w-full py-4 md:py-6 text-base md:text-lg font-semibold"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
