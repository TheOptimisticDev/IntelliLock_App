
import React from "react";
import { Merchant } from "@/types";
import { ShoppingBag, Coffee, Package, Zap, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MerchantItemProps {
  merchant: Merchant;
  onAddToTrusted?: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Food & Drink":
      return <Coffee className="h-5 w-5 text-orange-500" />;
    case "Shopping":
      return <ShoppingBag className="h-5 w-5 text-blue-500" />;
    case "Electronics":
      return <Zap className="h-5 w-5 text-yellow-500" />;
    default:
      return <Package className="h-5 w-5 text-gray-500" />;
  }
};

const MerchantItem: React.FC<MerchantItemProps> = ({ merchant, onAddToTrusted }) => {
  return (
    <div className="py-4 px-5 border-b flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          {getCategoryIcon(merchant.category)}
        </div>
        <div>
          <p className="font-medium text-gray-900">{merchant.name}</p>
          <p className="text-sm text-gray-500">{merchant.category}</p>
        </div>
      </div>
      <div>
        {merchant.isTrusted ? (
          <div className="flex items-center text-green-600">
            <Check className="h-5 w-5 mr-1" />
            <span className="text-sm font-medium">Trusted</span>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddToTrusted}
            className="text-sm"
          >
            Add to Trusted
          </Button>
        )}
      </div>
    </div>
  );
};

export default MerchantItem;
