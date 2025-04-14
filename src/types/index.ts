
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  biometricEnabled: boolean;
}

export interface Card {
  id: string;
  last4: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  isLocked: boolean;
  expiryDate: string;
  cardHolder: string;
}

export interface Transaction {
  id: string;
  cardId: string;
  amount: number;
  merchant: string;
  date: string;
  category: string;
  isFlagged: boolean;
  status: 'completed' | 'pending' | 'declined';
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  isTrusted: boolean;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  severity: 'low' | 'medium' | 'high';
  relatedTransactionId?: string;
}
