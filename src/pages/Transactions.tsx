import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import TransactionItem from "@/components/transactions/TransactionItem";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, PlusCircle, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardItem from "@/components/cards/CardItem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Transactions: React.FC = () => {
  const { transactions, cards } = useApp();
  const [filter, setFilter] = useState<'all' | 'flagged'>('all');
  const [showAddCard, setShowAddCard] = useState(false);

  const [cardData, setCardData] = useState({
    holderName: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardData.holderName || !cardData.number || !cardData.expiry || !cardData.cvv) {
      alert("Please fill all fields.");
      return;
    }
    console.log("Secure card added:", cardData);
    setShowAddCard(false);
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredTransactions =
    filter === "all"
      ? sortedTransactions
      : sortedTransactions.filter((tx) => tx.isFlagged);

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Cards & Transactions</h1>

        {!showAddCard ? (
          <>
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
                    onClick={() => setShowAddCard(true)}
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
          </>
        ) : (
          // Add Card Form
          <Card className="max-w-md mx-auto mt-6 shadow-xl border rounded-xl">
            <CardHeader>
            <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5 text-intellilock-black" />
                Add Card
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="holderName">Cardholder Name</Label>
                  <Input
                    id="holderName"
                    name="holderName"
                    type="text"
                    value={cardData.holderName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="number">Card Number</Label>
                  <Input
                    id="number"
                    name="number"
                    type="text"
                    inputMode="numeric"
                    maxLength={16}
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="password"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={() => setShowAddCard(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Card</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Transactions;
