
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import TransactionItem from "@/components/transactions/TransactionItem";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Transactions: React.FC = () => {
  const { transactions } = useApp();
  const [filter, setFilter] = useState<'all' | 'flagged'>('all');
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Filter transactions based on current filter
  const filteredTransactions = filter === 'all' 
    ? sortedTransactions 
    : sortedTransactions.filter(tx => tx.isFlagged);

  return (
    <MainLayout title="Cards & Transactions">
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as 'all' | 'flagged')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="flagged">Flagged Only</TabsTrigger>
              </TabsList>
            </Tabs>
            <CreditCard className="h-5 w-5 text-intellilock-blue ml-1" />
          </CardHeader>
          <CardContent className="p-0">
            {filteredTransactions.length > 0 ? (
              <div className="divide-y">
                {filteredTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>No transactions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Transactions;
