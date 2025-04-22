import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import AlertItem from "@/components/alerts/AlertItem";

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    address: "123 Main St, Springfield, IL",
    amount: "$150.00",
    date: "2025-04-10 14:30:00",
    description: "Purchase at Local Store",
  },
  {
    id: 2,
    address: "456 Oak St, Lincoln, NE",
    amount: "$75.50",
    date: "2025-04-09 09:00:00",
    description: "Subscription Renewal",
  },
  {
    id: 3,
    address: "789 Pine St, Denver, CO",
    amount: "$200.00",
    date: "2025-04-08 18:15:00",
    description: "Online Shopping",
  },
];

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
          <button className="text-sm text-intellilock-blue flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
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

      {/* Mock Transaction Section */}
      <div className="mt-6">
        <Card className="border-none shadow-sm bg-white rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
            <button className="text-sm text-intellilock-blue flex items-center">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </CardHeader>
          
          <CardContent className="p-0">
            {mockTransactions.length > 0 ? (
              <div className="divide-y">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4">
                    <div className="text-sm font-medium text-gray-800">
                      <p>{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="text-xs text-gray-600">{transaction.address}</p>
                      <p className="font-semibold text-intellilock-blue">{transaction.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>No recent transactions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecentAlerts;
