import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CardsList from "@/components/dashboard/CardsList";
import StatCard from "@/components/dashboard/StatCard";
import { AlertTriangle, CreditCard, ShoppingBag, Bell } from "lucide-react";
import { useApp } from "@/context/AppContext";
import SmartRecommendations from "@/components/dashboard/SmartRecommendations";
import { useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface Alert {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  severity: string;
  relatedTransactionId: string;
  type: (type: any) => React.ReactNode;
  description: boolean;
  details: string;
}

const Dashboard: React.FC = () => {
  const { 
    transactions, 
    alerts: contextAlerts, 
    cards: contextCards, 
    lockCard
  } = useApp();
  
  const location = useLocation();
  const [hasRunSimulation, setHasRunSimulation] = useState(false);
  const [localAlerts, setLocalAlerts] = useState<Alert[]>([]);
  
  // Combine context alerts with local alerts
  const allAlerts = [...contextAlerts, ...localAlerts];
  
  // Calculate stats
  const activeCards = contextCards.filter(card => !card.isLocked).length;
  const suspiciousTransactions = transactions.filter(tx => tx.isFlagged).length;
  
  const totalSpent = transactions
    .filter(tx => tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0)
    .toFixed(2);
    
  const highSeverityAlerts = allAlerts.filter(alert => alert.severity === "high").length;
  const hasNewAlerts = allAlerts.some(alert => !alert.read);
  const hasSuspiciousActivity = suspiciousTransactions > 0;

  // Fraud detection simulation
  useEffect(() => {
    const isFromBiometricSignIn = location.state?.from === "/sign-in-biometric";
    
    if (isFromBiometricSignIn && !hasRunSimulation) {
      const timer = setTimeout(() => {
        const cardToLock = contextCards.find(card => card.last4 === "4242");
        if (cardToLock && !cardToLock.isLocked) {
          try {
            // Lock the card using the context function
            lockCard(cardToLock.id);
            
            // Add the fraud alert to local state
            setLocalAlerts([{
              id: `alert-${Date.now()}`,
              title: "Card Locked Automatically",
              message: `Your card ending in ${cardToLock.last4} was locked due to suspicious activity.`,
              date: new Date().toISOString(),
              read: false,
              severity: "high",
              relatedTransactionId: "",
              type: function(type: any): React.ReactNode {
                return null;
              },
              description: false,
              details: ""
            }]);
            
            toast({
              title: "Security Alert",
              description: `Card ending in ${cardToLock.last4} was locked for security reasons`,
              variant: "default",
            });
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to process security action",
              variant: "destructive",
            });
          }
        }
        
        setHasRunSimulation(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [location.state, hasRunSimulation, contextCards, lockCard]);

  return (
    <MainLayout>
      <div className="space-y-4 py-4">
        <SmartRecommendations />
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 px-4">
          <StatCard 
            title="Active Cards" 
            value={`${activeCards}/${contextCards.length}`}
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
            title="Recent Alerts" 
            value={highSeverityAlerts}
            icon={Bell}
            iconColor="text-intellilock-black"
            highlight={hasNewAlerts}
          />
        </div>
        <CardsList />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
