
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useApp } from "@/context/AppContext";
import CardItem from "@/components/cards/CardItem";

const CardsList: React.FC = () => {
  const { cards } = useApp();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Your Cards</CardTitle>
        <CreditCard className="h-5 w-5 text-intellilock-blue" />
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
