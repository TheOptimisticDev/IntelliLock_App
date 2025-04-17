
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import CardsList from "@/components/dashboard/CardsList";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import StatCard from "@/components/dashboard/StatCard";
import { Shield, AlertTriangle, CreditCard, ShoppingBag, Bell, Ghost } from "lucide-react";
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
  <main className="space-y-5">
    {/* Stats */}
    <div className="grid grid-cols-2 gap-3">
      <StatCard 
        title="Active Cards" 
        value={`${activeCards}/${cards.length}`}
        icon={CreditCard}
        iconColor="text-intellilock-black"
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
        title="Total Spent" 
        value={`R${totalSpent}`}
        icon={ShoppingBag}
        iconColor="text-intellilock-black"
      />
      <StatCard 
        title="Alerts" 
        value={highSeverityAlerts}
        icon={Bell}
        iconColor="text-intellilock-black"
        highlight={hasNewAlerts}
      />
    </div>
    <CardsList/>
  </main>
</MainLayout>

  );
};

export default Dashboard;
