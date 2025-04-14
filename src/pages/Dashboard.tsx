
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
  
  // Already in Rands
  const totalSpent = transactions
    .filter(tx => tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0)
    .toFixed(2);
    
  const highSeverityAlerts = alerts.filter(alert => alert.severity === "high").length;
  const hasNewAlerts = alerts.some(alert => !alert.read);
  const hasSuspiciousActivity = suspiciousTransactions > 0;

  return (
    <MainLayout>
      <div className="space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard 
            title="Active Cards" 
            value={`${activeCards}/${cards.length}`}
            icon={CreditCard}
            iconColor="text-intellilock-skyblue"
          />
          <StatCard 
            title="Suspicious" 
            value={suspiciousTransactions}
            icon={AlertTriangle}
            iconColor="text-intellilock-red"
            trend={hasSuspiciousActivity ? "up" : "neutral"}
            highlight={hasSuspiciousActivity}
          />
          <StatCard 
            title="Spent" 
            value={`R${totalSpent}`}
            icon={ShoppingBag}
            iconColor="text-green-600"
          />
          <StatCard 
            title="Alerts" 
            value={highSeverityAlerts}
            icon={Shield}
            iconColor="text-intellilock-blue"
            highlight={hasNewAlerts}
          />
        </div>
        
        {/* Cards */}
        <CardsList />
        
        {/* Recent activity */}
        <RecentTransactions />
        <RecentAlerts />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
