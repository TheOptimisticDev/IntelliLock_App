
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import AlertItem from "@/components/alerts/AlertItem";

const RecentAlerts: React.FC = () => {
  const { alerts } = useApp();
  
  // Sort alerts by date (newest first) and take the first 3
  const recentAlerts = [...alerts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="pb-20 sm:pb-25 md:pb-30 lg:pb-35">
  <Card className="border-none shadow-sm bg-white rounded-xl overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-base font-medium">Recent Alerts</CardTitle>
      <button className="text-sm text-intellilock-blue flex items-center">
        View All
      </button>
    </CardHeader>
    
    <CardContent className="p-0">
      {recentAlerts.length > 0 ? (
        <div className="divide-y">
          {recentAlerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500">
          <p>No recent alerts</p>
        </div>
      )}
    </CardContent>
  </Card>
</div>

  );
};

export default RecentAlerts;
