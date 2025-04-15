import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import TransactionItem from "@/components/transactions/TransactionItem";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardItem from "@/components/cards/CardItem";
import { History } from 'lucide-react';

const Transactions: React.FC = () => {
  const { transactions, cards } = useApp();
  const [filter, setFilter] = useState<'all' | 'flagged'>('all');

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filter transactions based on current filter
  const filteredTransactions =
    filter === "all"
      ? sortedTransactions
      : sortedTransactions.filter((tx) => tx.isFlagged);

  // Handle Add Card action
  const handleAddCard = () => {
    console.log("Add New Card Clicked");
    // Implement logic or navigation for adding a new card
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Cards & Transactions</h1>

        {/* Cards Section */}
        <Card className="border-none shadow-sm bg-white rounded-xl overflow-hidden mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Cards</CardTitle>
            <CreditCard className="h-5 w-5 text-intellilock-black" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {cards.map((card) => (
                <CardItem key={card.id} card={card} />
              ))}
              <Button
                variant="outline"
                className="w-full py-8 border-dashed border-2 flex flex-col gap-2 hover:bg-gray-50 transition-colors"
                onClick={handleAddCard}
              >
                <PlusCircle className="h-8 w-8 text-intellilock-blue" />
                <span className="font-medium">Add New Card</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Transactions History</CardTitle>
          
          <History className="h-5 w-5 text-intellilock-black" />
          </CardHeader>
            <Tabs
              defaultValue="all"
              onValueChange={(value) => setFilter(value as "all" | "flagged")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-64 mx-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="flagged">Flagged Only</TabsTrigger>
              </TabsList>
            </Tabs>
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
