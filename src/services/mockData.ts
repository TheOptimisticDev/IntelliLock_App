import { User, Card, Transaction, Merchant, Alert } from "@/types";

// Mock user data
export const mockUser: User = {
  id: "user123",
  name: "Mfumu Mabunda",
  email: "mabunda.wealth@gmail.com",
  phone: "+27 81 344 1348",
  biometricEnabled: true,
  trustedLocations: [
    { lat: -26.2041, lng: 28.0473, label: "Home (Johannesburg)" }, // Johannesburg
    { lat: -33.9249, lng: 18.4241, label: "Work (Cape Town)" }, // Cape Town
  ]
};

// Mock cards data
export const mockCards: Card[] = [
  {
    id: "card1",
    last4: "4242",
    cardType: "visa",
    brand: "Visa",
    isLocked: false,
    expiryDate: "12/27",
    cardHolder: "Mfumu Mabunda"
  },
  {
    id: "card2",
    last4: "1342",
    cardType: "mastercard",
    brand: "Mastercard",
    isLocked: false,
    expiryDate: "09/26",
    cardHolder: "Mfumu Mabunda"
  },
  {
    id: "card3",
    last4: "1342",
    cardType: "amex",
    brand: "Amex",
    isLocked: true,
    expiryDate: "09/26",
    cardHolder: "Mfumu Mabunda"
  },
  {
    id: "card4",
    last4: "1312",
    cardType: "mastercard",
    brand: "Mastercard",
    isLocked: false,
    expiryDate: "09/26",
    cardHolder: "Mfumu Mabunda"
  },
  {
    id: "card5",
    last4: "1342",
    cardType: "visa",
    brand: "Visa",
    isLocked: true,
    expiryDate: "09/26",
    cardHolder: "Mfumu Mabunda"
  },
  {
    id: "card5",
    last4: "1342",
    cardType: "mastercard",
    brand: "Mastercard",
    isLocked: true,
    expiryDate: "09/26",
    cardHolder: "Mfumu Mabunda"
  }
];

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    cardId: "card1",
    amount: 35.99,
    merchant: "Woolworths",
    date: "2025-04-14T09:30:00",
    category: "Food & Drink",
    isFlagged: false,
    status: "completed",
    location: { lat: -26.2041, lng: 28.0473 } // Johannesburg
  },
  {
    id: "tx2",
    cardId: "card1",
    amount: 122.47,
    merchant: "Takealot",
    date: "2025-04-13T15:20:00",
    category: "Shopping",
    isFlagged: false,
    status: "completed",
    isOnline: true
  },
  {
    id: "tx3",
    cardId: "card1",
    amount: 499.99,
    merchant: "Game",
    date: "2025-04-12T02:15:00",
    category: "Electronics",
    isFlagged: true,
    status: "declined",
    location: { lat: 51.5074, lng: -0.1278 } // London
  },
  {
    id: "tx4",
    cardId: "card2",
    amount: 799.00,
    merchant: "Unknown Merchant",
    date: "2025-04-11T03:45:00",
    category: "Unknown",
    isFlagged: true,
    status: "declined",
    location: { lat: 40.7128, lng: -74.0060 } // New York
  },
  {
    id: "tx5",
    cardId: "card1",
    amount: 25.50,
    merchant: "Steers",
    date: "2025-04-10T19:30:00",
    category: "Food & Drink",
    isFlagged: false,
    status: "completed",
    location: { lat: -26.2041, lng: 28.0473 } // Johannesburg
  },
  {
    id: "tx6",
    cardId: "card3",
    amount: 25.50,
    merchant: "Steers",
    date: "2025-04-10T19:30:00",
    category: "Food & Drink",
    isFlagged: true,
    status: "completed",
    location: { lat: -26.2041, lng: 28.0473 } // Johannesburg
  }
];

// Mock trusted merchants
export const mockMerchants: Merchant[] = [
  {
    id: "merch1",
    name: "Woolworths",
    category: "Food & Drink",
    isTrusted: true
  },
  {
    id: "merch2",
    name: "Takealot",
    category: "Shopping",
    isTrusted: true
  },
  {
    id: "merch3",
    name: "Game",
    category: "Electronics",
    isTrusted: true
  },
  {
    id: "merch4",
    name: "Steers",
    category: "Food & Drink",
    isTrusted: true
  },
  {
    id: "merch5",
    name: "Checkers",
    category: "Food & Drink",
    isTrusted: true
  },
  {
    id: "merch6",
    name: "Pick n Pay",
    category: "Food & Drink",
    isTrusted: true
  },
  {
    id: "merch7",
    name: "Clicks",
    category: "Health & Beauty",
    isTrusted: true
  },
  {
    id: "merch8",
    name: "Dis-Chem",
    category: "Health & Beauty",
    isTrusted: true
  }
];

// Mock alerts
export const mockAlerts: Alert[] = [
  {
    id: "alert1",
    title: "Suspicious Transaction Detected",
    message: "A transaction of R499.99 at Game at 2:15 AM appears suspicious.",
    date: "2025-04-12T02:17:00",
    read: false,
    severity: "high",
    relatedTransactionId: "tx3",
    timestamp: undefined,
    type: function (type: any): import("react").ReactNode {
      throw new Error("Function not implemented.");
    },
    description: false,
    details: ""
  },
  {
    id: "alert2",
    title: "Card Locked Automatically",
    message: "Your card ending in 1234 was locked due to suspicious activity.",
    date: "2025-04-11T03:46:00",
    read: false,
    severity: "high",
    relatedTransactionId: "tx4",
    timestamp: undefined,
    type: function (type: any): import("react").ReactNode {
      throw new Error("Function not implemented.");
    },
    description: false,
    details: ""
  },
  {
    id: "alert3",
    title: "New Location Detected",
    message: "A transaction was made in a new location. Please verify this was you.",
    date: "2025-04-10T19:35:00",
    read: true,
    severity: "medium",
    timestamp: undefined,
    type: function (type: any): import("react").ReactNode {
      throw new Error("Function not implemented.");
    },
    description: false,
    details: ""
  },
  {
    id: "alert4",
    title: "Unusual Spending on the same location",
    message: "Multiple high-value purchases were made in a short time frame.",
    date: "2025-04-09T21:00:00",
    read: false,
    severity: "medium",
    relatedTransactionId: "tx2",
    timestamp: undefined,
    type: function (type: any): import("react").ReactNode {
      throw new Error("Function not implemented.");
    },
    description: false,
    details: ""
  },
  {
    id: "alert5",
    title: "Login Attempt Blocked",
    message: "We blocked a login attempt from an unrecognized device.",
    date: "2025-04-08T06:45:00",
    read: false,
    severity: "low",
    timestamp: undefined,
    type: function (type: any): import("react").ReactNode {
      throw new Error("Function not implemented.");
    },
    description: false,
    details: ""
  },
  {
    id: "alert6",
    title: "Merchant Flagged",
    message: "One of your recent transactions involved a flagged merchant.",
    date: "2025-04-07T14:22:00",
    read: true,
    severity: "medium",
    relatedTransactionId: "tx1",
    timestamp: undefined,
    type: function (type: any): import("react").ReactNode {
      throw new Error("Function not implemented.");
    },
    description: false,
    details: ""
  }
];

// Enhanced AI fraud detection with location verification
export const detectFraud = (transaction: Transaction, userLocation?: { lat: number; lng: number }): boolean => {
  const time = new Date(transaction.date).getHours();
  
  // Risk factors
  const isLateNight = time >= 0 && time <= 5;
  const isLargeAmount = transaction.amount > 400;
  const isUnknownMerchant = !mockMerchants.some(m => m.name === transaction.merchant && m.isTrusted);
  const isLocationMismatch = userLocation && !isNearTrustedLocation(userLocation);
  const isOnlinePayment = transaction.isOnline || isOnlineMerchant(transaction.merchant);

  // Calculate fraud score (0-1)
  let fraudScore = 0;
  if (isLateNight) fraudScore += 0.3;
  if (isLargeAmount) fraudScore += 0.2;
  if (isUnknownMerchant) fraudScore += 0.25;
  if (isLocationMismatch) fraudScore += 0.5;
  if (isOnlinePayment) fraudScore -= 0.1; // Online payments get slight reduction

  return fraudScore >= 0.7;
};

// Helper function to check if current location is near trusted locations
const isNearTrustedLocation = (location: { lat: number; lng: number }): boolean => {
  return mockUser.trustedLocations?.some(trustedLoc => 
    calculateDistance(location.lat, location.lng, trustedLoc.lat, trustedLoc.lng) < 50
  ) ?? false;
};

// Haversine formula to calculate distance between coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Check if merchant is typically online
const isOnlineMerchant = (merchant: string): boolean => {
  const onlineMerchants = ['Takealot', 'Amazon', 'Ebay', 'AliExpress'];
  return onlineMerchants.includes(merchant) || merchant.toLowerCase().includes('online');
};

// Enhanced transaction processing
export const processTransaction = (transaction: Transaction, userLocation?: { lat: number; lng: number }) => {
  const isFraud = detectFraud(transaction, userLocation);
  const isOnline = transaction.isOnline || isOnlineMerchant(transaction.merchant);

  return {
    isFraud: isFraud && !isOnline,
    requiresConfirmation: isOnline,
    riskScore: calculateRiskScore(transaction, userLocation)
  };
};

// Calculate risk score (0-100)
const calculateRiskScore = (transaction: Transaction, userLocation?: { lat: number; lng: number }): number => {
  // Implementation similar to detectFraud but returns a score
  return Math.min(100, Math.floor(
    (detectFraud(transaction, userLocation) ? 70 : 0) +
    (transaction.isOnline ? 10 : 0) +
    (transaction.amount > 1000 ? 15 : 0)
  ));
};

// Service to toggle card lock status
export const toggleCardLock = (cardId: string, isLocked: boolean): Card => {
  const card = mockCards.find(c => c.id === cardId);
  if (!card) throw new Error("Card not found");
  
  card.isLocked = isLocked;
  
  // Add alert when card is locked
  if (isLocked) {
    mockAlerts.push({
      id: `alert-${Date.now()}`,
      title: "Card Locked",
      message: `Your card ending in ${card.last4} has been ${isLocked ? 'locked' : 'unlocked'}.`,
      date: new Date().toISOString(),
      read: false,
      severity: isLocked ? "high" : "medium",
      timestamp: undefined,
      type: function (type: any): import("react").ReactNode {
        throw new Error("Function not implemented.");
      },
      description: false,
      details: ""
    });
  }
  
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

// Service to add a trusted location
export const addTrustedLocation = (location: { lat: number; lng: number; label: string }) => {
  if (!mockUser.trustedLocations) {
    mockUser.trustedLocations = [];
  }
  mockUser.trustedLocations.push(location);
};
