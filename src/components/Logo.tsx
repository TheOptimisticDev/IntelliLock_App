
import React from "react";
import { Shield, Lock } from "lucide-react";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, compact = false }) => {
  return (
    <div className={`flex items-center space-x-1.5 ${className}`}>
      <div className="relative">
        <Shield className="w-6 h-6 text-intellilock-blue" />
        <Lock className="w-3 h-3 text-intellilock-skyblue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      {!compact && (
        <span className="font-bold text-base text-intellilock-blue">IntelliLock</span>
      )}
    </div>
  );
};

export default Logo;
