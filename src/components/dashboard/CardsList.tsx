
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
    toast({
      title: "Feature coming soon",
      description: "Adding new cards will be available in the next update.",
      variant: "default",
    });
  };

  return (
    <Card className="border-none shadow-sm bg-white rounded-xl overflow-hidden mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Your Cards</CardTitle>
        <CreditCard className="h-5 w-5 text-intellilock-blue" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
          
          {/* Add Card Option */}
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
  );
};

export default CardsList;
