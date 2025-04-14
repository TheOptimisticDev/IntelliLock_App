
import React from "react";
import { Shield, Lock } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Shield className="w-7 h-7 text-intellilock-blue" />
        <Lock className="w-3.5 h-3.5 text-intellilock-skyblue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <span className="font-bold text-lg text-intellilock-blue">IntelliLock</span>
    </div>
  );
};

export default Logo;
