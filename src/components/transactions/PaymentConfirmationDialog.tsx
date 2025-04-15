import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldAlert } from "lucide-react";
import { Transaction } from "@/types";

interface PaymentConfirmationDialogProps {
  open: boolean;
  transaction: Transaction;
  onConfirm: () => void;
  onDeny: () => void;
}

export const PaymentConfirmationDialog: React.FC<PaymentConfirmationDialogProps> = ({
  open,
  transaction,
  onConfirm,
  onDeny
}) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="h-6 w-6 text-intellilock-red" />
            <DialogTitle>Confirm Online Payment</DialogTitle>
          </div>
          <DialogDescription>
            Please verify this online payment attempt
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Merchant:</span>
            <span className="font-medium">{transaction.merchant}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Amount:</span>
            <span className="font-medium">R{transaction.amount.toFixed(2)}</span>
          </div>
          
          <div className="pt-4 flex space-x-3 justify-end">
            <Button variant="outline" onClick={onDeny}>
              Deny Payment
            </Button>
            <Button onClick={onConfirm}>
              Confirm Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
