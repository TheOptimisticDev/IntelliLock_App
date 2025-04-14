
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import TransactionItem from "@/components/transactions/TransactionItem";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Filter } from "lucide-react";
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
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Transaction History</CardTitle>
            <CreditCard className="h-5 w-5 text-intellilock-blue" />
          </CardHeader>
          <div className="px-6 pt-2">
            <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as 'all' | 'flagged')}>
              <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="flagged">Flagged Only</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <CardContent className="p-0 mt-4">
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
