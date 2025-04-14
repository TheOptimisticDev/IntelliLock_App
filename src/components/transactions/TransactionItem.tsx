
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Transaction } from "@/types";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { merchant, amount, date, status, isFlagged } = transaction;
  
  // Format date
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });
  
  // Amount in Rands (not converting since we're assuming it's already in Rands)
  const amountInRands = amount.toFixed(2);
  
  // Status icon
  const StatusIcon = status === "completed" ? CheckCircle : 
                    status === "pending" ? Shield : AlertTriangle;
  
  return (
    <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="font-medium">{merchant}</span>
            {isFlagged && (
              <Badge variant="destructive" className="ml-2 text-xs">Suspicious</Badge>
            )}
          </div>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <span 
            className={cn(
              "font-semibold mr-2",
              status === "completed" ? "text-green-600" : 
              status === "pending" ? "text-amber-500" : "text-red-500"
            )}
          >
            R{amountInRands}
          </span>
          <StatusIcon 
            className={cn(
              "h-4 w-4",
              status === "completed" ? "text-green-600" : 
              status === "pending" ? "text-amber-500" : "text-red-500"
            )} 
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
