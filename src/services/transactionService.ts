import { Transaction } from "@/types";
import { processTransaction, mockCards, mockAlerts } from "./mockData";

export const handleTransactionAttempt = (transaction: Transaction, userLocation?: { lat: number; lng: number }) => {
  const result = processTransaction(transaction, userLocation);
  
  if (result.isFraud) {
    // Lock the card automatically
    const card = mockCards.find(c => c.id === transaction.cardId);
    if (card && !card.isLocked) {
      card.isLocked = true;
      
      // Alert
      mockAlerts.push({
        id: `alert-${Date.now()}`,
        title: "Card Locked Due to Suspicious Activity",
        message: `Your card ending in ${card.last4} was locked due to suspicious transaction at ${transaction.merchant}.`,
        date: new Date().toISOString(),
        read: false,
        severity: "high",
        relatedTransactionId: transaction.id,
        timestamp: undefined
      });
    }
    
    return { success: false, message: "Transaction blocked due to suspicious activity" };
  }
  
  if (result.requiresConfirmation) {
    return { 
      success: false, 
      requiresConfirmation: true, 
      message: "Please confirm this online payment" 
    };
  }
  
  // Process normal transaction
  return { success: true };
};
