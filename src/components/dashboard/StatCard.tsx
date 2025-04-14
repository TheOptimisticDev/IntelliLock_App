
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  trend?: "up" | "down" | "neutral";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-intellilock-blue",
  trend = "neutral"
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
        <div className={cn("p-2 rounded-full bg-gray-50", iconColor.replace("text-", "bg-").replace("intellilock-blue", "blue-50").replace("intellilock-red", "red-50").replace("green-600", "green-50"))}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
