import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useApp } from "@/context/AppContext";
import CardItem from "@/components/cards/CardItem";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const CardsList: React.FC = () => {
  const { cards, lockCard, unlockCard } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const handleCardAction = (cardId: string, action: 'lock' | 'unlock') => {
    try {
      if (action === 'lock') {
        lockCard(cardId);
        toast({
          title: "Card Locked",
          description: "Your card has been temporarily locked",
          variant: "default",
        });
      } else {
        unlockCard(cardId);
        toast({
          title: "Card Unlocked",
          description: "Your card is now active",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update card status",
        variant: "destructive",
      });
    }
  };

  if (cards.length === 0) {
    return (
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-gray-800">Cards</CardTitle>
          <CreditCard className="h-5 w-5 text-intellilock-black" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No cards found. Add one to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-lg font-semibold text-gray-800">Cards</CardTitle>
        <CreditCard className="h-5 w-5 text-intellilock-black" />
      </CardHeader>

      <CardContent>
        <div className="relative w-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 z-10 p-0 rounded-full border-2 border-transparent hover:bg-transparent focus:outline-none"
            onClick={handlePrev}
          >
            <span className="text-3xl text-transparent transition duration-300 ease-in-out">&lt;</span>
          </Button>

          <div className="w-[100%] sm:w-[600px] overflow-hidden relative">
            <div
              className="flex transition-all duration-500 ease-in-out transform"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div className="w-full flex-shrink-0" key={index}>
                  <CardItem 
                    card={card} 
                    onLock={() => handleCardAction(card.id, 'lock')}
                    onUnlock={() => handleCardAction(card.id, 'unlock')}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 z-10 p-0 rounded-full border-2 border-transparent hover:bg-transparent focus:outline-none"
            onClick={handleNext}
          >
            <span className="text-3xl text-transparent transition duration-300 ease-in-out">&gt;</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardsList;
