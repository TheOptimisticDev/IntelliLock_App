
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, PlusCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import CardItem from "@/components/cards/CardItem";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const CardsList: React.FC = () => {
  const { cards } = useApp();

  const handleAddCard = () => {
  };

  return (
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
        </div>
      </CardContent>
    </Card>
  );
};

export default CardsList;
