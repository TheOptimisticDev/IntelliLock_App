
import React from "react";
import { format } from "date-fns";
import { Transaction } from "@/types";
import { AlertTriangle, ShoppingBag, Coffee, Package, Zap, CreditCard } from "lucide-react";

interface TransactionItemProps {
  transaction: Transaction;
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

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const formattedDate = format(new Date(transaction.date), "MMM d, yyyy h:mm a");
  
  return (
    <div className={`
      py-4 px-5 border-b flex items-center justify-between
      ${transaction.isFlagged ? "bg-red-50" : "bg-white"}
    `}>
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          {getCategoryIcon(transaction.category)}
        </div>
        <div>
          <p className="font-medium text-gray-900">{transaction.merchant}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <div className="flex items-center">
        <p className={`font-medium text-right ${
          transaction.status === "declined" ? "text-red-600" : "text-gray-900"
        }`}>
          ${transaction.amount.toFixed(2)}
        </p>
        {transaction.isFlagged && (
          <div className="ml-3">
            <AlertTriangle className="h-5 w-5 text-intellilock-red" />
          </div>
        )}
        {transaction.status === "declined" && (
          <div className="ml-3">
            <CreditCard className="h-5 w-5 text-red-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
