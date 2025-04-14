
import { User, Card, Transaction, Merchant, Alert } from "@/types";

// Mock user data
export const mockUser: User = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  biometricEnabled: true
};

// Mock cards data
export const mockCards: Card[] = [
  {
    id: "card1",
    last4: "4242",
    cardType: "visa",
    isLocked: false,
    expiryDate: "12/27",
    cardHolder: "Alex Johnson"
  },
  {
    id: "card2",
    last4: "1234",
    cardType: "mastercard",
    isLocked: true,
    expiryDate: "09/26",
    cardHolder: "Alex Johnson"
  }
];

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    cardId: "card1",
    amount: 35.99,
    merchant: "Starbucks",
    date: "2025-04-14T09:30:00",
    category: "Food & Drink",
    isFlagged: false,
    status: "completed"
  },
  {
    id: "tx2",
    cardId: "card1",
    amount: 122.47,
    merchant: "Amazon",
    date: "2025-04-13T15:20:00",
    category: "Shopping",
    isFlagged: false,
    status: "completed"
  },
  {
    id: "tx3",
    cardId: "card1",
    amount: 499.99,
    merchant: "Electronics Store",
    date: "2025-04-12T02:15:00",
    category: "Electronics",
    isFlagged: true,
    status: "completed"
  },
  {
    id: "tx4",
    cardId: "card2",
    amount: 799.00,
    merchant: "Unknown Merchant",
    date: "2025-04-11T03:45:00",
    category: "Unknown",
    isFlagged: true,
    status: "declined"
  },
  {
    id: "tx5",
    cardId: "card1",
    amount: 25.50,
    merchant: "Local Restaurant",
    date: "2025-04-10T19:30:00",
    category: "Food & Drink",
    isFlagged: false,
    status: "completed"
  }
];

// Mock trusted merchants
export const mockMerchants: Merchant[] = [
  {
    id: "merch1",
    name: "Starbucks",
    category: "Food & Drink",
    isTrusted: true
  },
  {
    id: "merch2",
    name: "Amazon",
    category: "Shopping",
    isTrusted: true
  },
  {
    id: "merch3",
    name: "Electronics Store",
    category: "Electronics",
    isTrusted: false
  },
  {
    id: "merch4",
    name: "Local Restaurant",
    category: "Food & Drink",
    isTrusted: true
  }
];

// Mock alerts
export const mockAlerts: Alert[] = [
  {
    id: "alert1",
    title: "Suspicious Transaction Detected",
    message: "A transaction of $499.99 at Electronics Store at 2:15 AM appears suspicious.",
    date: "2025-04-12T02:17:00",
    read: false,
    severity: "high",
    relatedTransactionId: "tx3"
  },
  {
    id: "alert2",
    title: "Card Locked Automatically",
    message: "Your card ending in 1234 was locked due to suspicious activity.",
    date: "2025-04-11T03:46:00",
    read: true,
    severity: "high",
    relatedTransactionId: "tx4"
  },
  {
    id: "alert3",
    title: "New Location Detected",
    message: "A transaction was made in a new location. Please verify this was you.",
    date: "2025-04-10T19:35:00",
    read: true,
    severity: "medium"
  }
];

// Mock AI service for fraud detection
export const detectFraud = (transaction: Transaction): boolean => {
  // Simple rules for fraud detection
  const time = new Date(transaction.date).getHours();
  const isLateNight = time >= 0 && time <= 5;
  const isLargeAmount = transaction.amount > 400;
  const isUnknownMerchant = !mockMerchants.some(m => 
    m.name === transaction.merchant && m.isTrusted
  );
  
  return (isLateNight && transaction.amount > 100) || 
         (isLargeAmount && isUnknownMerchant);
};

// Service to toggle card lock status
export const toggleCardLock = (cardId: string, isLocked: boolean): Card => {
  const card = mockCards.find(c => c.id === cardId);
  if (!card) throw new Error("Card not found");
  
  card.isLocked = isLocked;
  return { ...card };
};

// Service to mark an alert as read
export const markAlertAsRead = (alertId: string): Alert => {
  const alert = mockAlerts.find(a => a.id === alertId);
  if (!alert) throw new Error("Alert not found");
  
  alert.read = true;
  return { ...alert };
};

// Service to add a merchant to trusted list
export const addTrustedMerchant = (merchant: Omit<Merchant, 'id'>): Merchant => {
  const newMerchant: Merchant = {
    ...merchant,
    id: `merch${mockMerchants.length + 1}`,
    isTrusted: true
  };
  
  mockMerchants.push(newMerchant);
  return newMerchant;
};
