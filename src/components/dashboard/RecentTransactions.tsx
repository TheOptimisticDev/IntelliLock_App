
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import TransactionItem from "@/components/transactions/TransactionItem";

const RecentTransactions: React.FC = () => {
  const { transactions } = useApp();
  const navigate = useNavigate();
  
  // Sort transactions by date (newest first) and take the first 3
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <Card className="border-none shadow-sm bg-white rounded-xl overflow-hidden mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <button 
          onClick={() => navigate('/transactions')}
          className="text-sm text-intellilock-blue flex items-center"
        >
          View All
        </button>
      </CardHeader>
      <CardContent className="p-0">
        {recentTransactions.length > 0 ? (
          <div className="divide-y">
            {recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <p>No recent transactions</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
