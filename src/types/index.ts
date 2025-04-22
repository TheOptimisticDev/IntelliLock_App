export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  biometricEnabled: boolean;
  trustedLocations?: {
    lat: number;
    lng: number;
    label: string;
  }[];
}

export interface Card {
  id: string;
  last4: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  brand: string; // ✅ Added to fix brand-related TypeScript error
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
  location?: {
    lat: number;
    lng: number;
  };
  isOnline?: boolean;
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  isTrusted: boolean;
}

export interface Alert {
  type(type: any): import("react").ReactNode;
  description: boolean;
  details: string;
  timestamp: any;
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  severity: 'low' | 'medium' | 'high';
  relatedTransactionId?: string;
}
