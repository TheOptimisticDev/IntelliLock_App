
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import CardsList from "@/components/dashboard/CardsList";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import RecentAlerts from "@/components/dashboard/RecentAlerts";
import StatCard from "@/components/dashboard/StatCard";
import { Shield, AlertTriangle, CreditCard, ShoppingBag } from "lucide-react";
import { useApp } from "@/context/AppContext";

const Dashboard: React.FC = () => {
  const { transactions, alerts, cards } = useApp();
  
  // Calculate stats
  const activeCards = cards.filter(card => !card.isLocked).length;
  const suspiciousTransactions = transactions.filter(tx => tx.isFlagged).length;
  const totalSpent = transactions
    .filter(tx => tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0)
    .toFixed(2);
  const highSeverityAlerts = alerts.filter(alert => alert.severity === "high").length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Active Cards" 
            value={`${activeCards}/${cards.length}`}
            icon={CreditCard}
            iconColor="text-intellilock-skyblue"
          />
          <StatCard 
            title="Suspicious Activity" 
            value={suspiciousTransactions}
            icon={AlertTriangle}
            iconColor="text-intellilock-red"
            trend={suspiciousTransactions > 0 ? "up" : "neutral"}
          />
          <StatCard 
            title="Total Spent" 
            value={`$${totalSpent}`}
            icon={ShoppingBag}
            iconColor="text-green-600"
          />
          <StatCard 
            title="Security Alerts" 
            value={highSeverityAlerts}
            icon={Shield}
            iconColor="text-intellilock-blue"
          />
        </div>
        
        {/* Cards */}
        <CardsList />
        
        {/* Recent activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentTransactions />
          <RecentAlerts />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
