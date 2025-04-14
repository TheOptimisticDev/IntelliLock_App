
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  User, Card, Transaction, Merchant, Alert
} from "@/types";
import { 
  mockUser, mockCards, mockTransactions, mockAlerts, mockMerchants,
  toggleCardLock, markAlertAsRead, addTrustedMerchant
} from "@/services/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AppContextProps {
  user: User | null;
  cards: Card[];
  transactions: Transaction[];
  alerts: Alert[];
  merchants: Merchant[];
  loading: boolean;
  unreadAlertsCount: number;
  lockCard: (cardId: string) => void;
  unlockCard: (cardId: string) => void;
  markAlertRead: (alertId: string) => void;
  addMerchantToTrusted: (merchant: Omit<Merchant, 'id'>) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load mock data on component mount
  useEffect(() => {
    // Simulate API loading time
    const loadData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser(mockUser);
        setCards(mockCards);
        setTransactions(mockTransactions);
        setAlerts(mockAlerts);
        setMerchants(mockMerchants);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error loading data",
          description: "Unable to load your account information. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Calculate number of unread alerts
  const unreadAlertsCount = alerts.filter(alert => !alert.read).length;

  // Lock a card
  const lockCard = (cardId: string) => {
    try {
      const updatedCard = toggleCardLock(cardId, true);
      setCards(cards.map(card => card.id === cardId ? updatedCard : card));
      toast({
        title: "Card Locked",
        description: `Card ending in ${updatedCard.last4} has been locked.`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error locking card:", error);
      toast({
        title: "Error Locking Card",
        description: "Unable to lock your card. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Unlock a card
  const unlockCard = (cardId: string) => {
    try {
      const updatedCard = toggleCardLock(cardId, false);
      setCards(cards.map(card => card.id === cardId ? updatedCard : card));
      toast({
        title: "Card Unlocked",
        description: `Card ending in ${updatedCard.last4} has been unlocked.`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error unlocking card:", error);
      toast({
        title: "Error Unlocking Card",
        description: "Unable to unlock your card. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Mark an alert as read
  const markAlertRead = (alertId: string) => {
    try {
      const updatedAlert = markAlertAsRead(alertId);
      setAlerts(alerts.map(alert => alert.id === alertId ? updatedAlert : alert));
    } catch (error) {
      console.error("Error marking alert as read:", error);
      toast({
        title: "Error",
        description: "Unable to update alert status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Add a merchant to trusted list
  const addMerchantToTrusted = (merchant: Omit<Merchant, 'id'>) => {
    try {
      const newMerchant = addTrustedMerchant(merchant);
      setMerchants([...merchants, newMerchant]);
      toast({
        title: "Merchant Added",
        description: `${newMerchant.name} has been added to your trusted merchants.`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error adding trusted merchant:", error);
      toast({
        title: "Error",
        description: "Unable to add merchant to trusted list. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Create context value
  const contextValue: AppContextProps = {
    user,
    cards,
    transactions,
    alerts,
    merchants,
    loading,
    unreadAlertsCount,
    lockCard,
    unlockCard,
    markAlertRead,
    addMerchantToTrusted
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
