import React from "react";

interface LogoProps {
  className?: string;
  compact?: boolean;
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  compact = false,
  textColor = "text-intellilock-black"
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo image from public folder */}
      <img 
          src="/logo.png" 
          alt="IntelliLock Logo"
          className={`
            rounded-lg
            ${false ? 'h-10 w-10' : 'h-12 w-auto max-w-[180px]'}
          `}
        />
    </div>
  );
};

export default Logo;
