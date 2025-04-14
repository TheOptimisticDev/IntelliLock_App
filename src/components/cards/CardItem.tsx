
import React from "react";
import { Card as CardType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CreditCard, Shield, AlertTriangle } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface CardItemProps {
  card: CardType;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const { lockCard, unlockCard } = useApp();

  const handleToggleLock = (checked: boolean) => {
    if (checked) {
      unlockCard(card.id);
    } else {
      lockCard(card.id);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className={`p-6 ${card.isLocked ? "bg-gray-100" : "bg-gradient-to-r from-intellilock-blue to-intellilock-skyblue"}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`font-mono text-lg ${card.isLocked ? "text-gray-700" : "text-white"}`}>
                •••• •••• •••• {card.last4}
              </p>
              <p className={`text-sm mt-1 ${card.isLocked ? "text-gray-600" : "text-white/80"}`}>
                {card.cardHolder}
              </p>
              <p className={`text-sm mt-0.5 ${card.isLocked ? "text-gray-600" : "text-white/80"}`}>
                Expires: {card.expiryDate}
              </p>
            </div>
            <div>
              {card.cardType === 'visa' && (
                <div className={`${card.isLocked ? "text-gray-400" : "text-white"} font-bold italic text-xl`}>VISA</div>
              )}
              {card.cardType === 'mastercard' && (
                <div className={`${card.isLocked ? "text-gray-400" : "text-white"} font-bold text-xl`}>MC</div>
              )}
              {card.cardType === 'amex' && (
                <div className={`${card.isLocked ? "text-gray-400" : "text-white"} font-bold text-xl`}>AMEX</div>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            {card.isLocked ? (
              <div className="flex items-center text-intellilock-blue">
                <Shield className="h-5 w-5 mr-2" />
                <span className="font-medium">Card Locked</span>
              </div>
            ) : (
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                <span className="font-medium text-green-600">Card Active</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{card.isLocked ? "Unlock" : "Lock"}</span>
            <Switch 
              checked={!card.isLocked} 
              onCheckedChange={handleToggleLock}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;
