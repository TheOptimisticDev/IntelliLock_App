
import React from "react";
import { format } from "date-fns";
import { Alert } from "@/types";
import { AlertTriangle, ShieldCheck, MapPin } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface AlertItemProps {
  alert: Alert;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  const { markAlertRead } = useApp();
  const formattedDate = format(new Date(alert.date), "MMM d, yyyy h:mm a");
  
  const handleClick = () => {
    if (!alert.read) {
      markAlertRead(alert.id);
    }
  };

  const getIcon = () => {
    switch(alert.severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-intellilock-red" />;
      case "medium":
        return <MapPin className="h-5 w-5 text-yellow-500" />;
      case "low":
        return <ShieldCheck className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div 
      className={`
        py-4 px-5 border-b flex items-start space-x-4 cursor-pointer 
        ${!alert.read ? "bg-red-50" : "bg-white"}
        hover:bg-gray-50 transition-colors
      `}
      onClick={handleClick}
    >
      <div className={`
        h-10 w-10 rounded-full flex items-center justify-center
        ${alert.severity === "high" ? "bg-red-100" : 
          alert.severity === "medium" ? "bg-yellow-100" : "bg-green-100"}
      `}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-medium text-gray-900">{alert.title}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
      </div>
      {!alert.read && (
        <div className="h-2 w-2 bg-intellilock-red rounded-full mt-2"></div>
      )}
    </div>
  );
};

export default AlertItem;
