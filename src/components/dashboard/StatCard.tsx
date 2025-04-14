
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  iconColor = "text-intellilock-blue"
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
            {trend && (
              <div className="flex items-center mt-1">
                <span className={`text-xs font-medium ${
                  trend === "up" ? "text-green-600" : 
                  trend === "down" ? "text-red-600" : "text-gray-500"
                }`}>
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
                  {" "}
                  {trend === "up" ? "Increasing" : 
                   trend === "down" ? "Decreasing" : "Stable"}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full bg-gray-100 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
