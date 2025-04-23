import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Home,
  CreditCard,
  ShoppingBag,
  Settings,
  X,
  Lock,
  Flag,
  Shield,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import AlertItem from "@/components/alerts/AlertItem";
import { cn } from "@/lib/utils";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    unreadAlertsCount, 
    user, 
    alerts, 
    cards,
    lockCard,
    unlockCard,
    reportTransaction,
    resolveAlert
  } = useApp();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/transactions")) return "Wallet";
    if (path.startsWith("/merchants")) return "Outlets";
    if (path.startsWith("/settings")) return "Settings";
    if (path.startsWith("/alerts")) return "Notifications";
    return title || "IntelliLock";
  };

  const navigation = [
    { name: "Home", path: "/dashboard", icon: Home },
    { name: "Wallet", path: "/transactions", icon: CreditCard },
    { name: "Outlets", path: "/merchants", icon: ShoppingBag },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const recentAlerts = [...alerts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const openAlertModal = (alert: any) => {
    setSelectedAlert(alert);
    setIsAlertModalOpen(true);
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
    setSelectedAlert(null);
  };

  const handleLockCard = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      try {
        if (card.isLocked) {
          unlockCard(cardId);
          toast({
            title: "Card Unlocked",
            description: "Your card is now active",
            variant: "default",
          });
        } else {
          lockCard(cardId);
          toast({
            title: "Card Locked",
            description: "Your card has been temporarily locked",
            variant: "default",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update card status",
          variant: "destructive",
        });
      }
    }
    closeAlertModal();
  };

  const handleReportTransaction = (transactionId: string) => {
    try {
      reportTransaction(transactionId);
      toast({
        title: "Transaction Reported",
        description: "Our team will review this transaction",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to report transaction",
        variant: "destructive",
      });
    }
    closeAlertModal();
  };

  const handleMarkAsResolved = (alertId: string) => {
    try {
      resolveAlert(alertId);
      toast({
        title: "Alert Resolved",
        description: "This alert has been marked as resolved",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resolve alert",
        variant: "destructive",
      });
    }
    closeAlertModal();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        setScrolled(mainContentRef.current.scrollTop > 10);
      }
    };

    if (mainContentRef.current) {
      mainContentRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContentRef.current) {
        mainContentRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery) {
        setSearchResults([
          { id: 1, title: "Transaction #1234", type: "transaction" },
          { id: 2, title: "Alert: Suspicious Activity", type: "alert" },
          { id: 3, title: "User Settings", type: "settings" },
        ]);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <div className="flex flex-col bg-gray-50 relative h-screen">
      {/* Transparent App Bar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-10 h-16 md:h-20 px-4 md:px-6 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="h-full flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight truncate max-w-[50vw]">
            {getPageTitle()}
          </h1>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100/50 rounded-full"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-5 w-5 md:h-6 md:w-6 text-gray-900" />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100/50 rounded-full"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5 md:h-6 md:w-6 text-gray-900" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-1 -right-0 bg-intellilock-red text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold">
                    {unreadAlertsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Message */}
      {location.pathname === "/dashboard" && user && (
        <div className="pt-16 md:pt-20 px-4 md:px-6 max-w-6xl mx-auto">
          <p className="text-2xl md:text-3xl font-bold text-intellilock-blue">
            Welcome Back, {user.name}
          </p>
          <p className="text-sm md:text-base text-gray-600">
            Your cards are protected by AI-powered security
          </p>
        </div>
      )}

      {/* Main Content Area */}
      <main
        ref={mainContentRef}
        className="flex-1 overflow-y-auto pt-16 md:pt-20 pb-16 md:pb-20"
      >
        <div className="px-4 md:px-6 max-w-6xl mx-auto">{children}</div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-lg fixed bottom-0 left-0 right-0 h-14 md:h-16 border-t z-10">
        <div className="grid grid-cols-4 pb-3 h-full max-w-6xl mx-auto">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center space-y-0.5 md:space-y-1 ${
                  isActive ? "text-intellilock-blue" : "text-gray-600"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 md:h-6 md:w-6 ${
                    isActive ? "stroke-2" : ""
                  }`}
                />
                <span className="text-xs font-medium md:font-bold">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Notification Sheet */}
      {showNotifications && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
            onClick={() => setShowNotifications(false)}
          />

          {/* Notification Panel */}
          <div className="absolute bottom-0 left-0 right-0 md:right-4 md:left-auto md:bottom-4 md:w-[380px] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white/90 backdrop-blur z-10">
              <h2 className="text-base font-semibold text-gray-800 tracking-tight">
                Notifications
              </h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowNotifications(false)}
                className="rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            {/* Scrollable Notification List */}
            <ScrollArea className="flex-1 px-4 overflow-y-auto text-sm">
              {recentAlerts.length > 0 ? (
                <ul>
                  {recentAlerts.map((alert) => (
                    <li 
                      key={alert.id} 
                      className="py-3 border-b last:border-none hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => openAlertModal(alert)}
                    >
                      <AlertItem alert={alert} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-10 text-center text-gray-500 text-sm">
                  <p>No new notifications</p>
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            <div className="border-t px-6 py-4 sticky bottom-0 bg-white/90 backdrop-blur">
              <Button
                className="w-full bg-intellilock-blue text-white font-medium hover:bg-intellilock-blue/90 transition-colors duration-200 rounded-lg"
                onClick={() => {
                  navigate("/alerts");
                  setShowNotifications(false);
                }}
              >
                View All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Alert Detail Modal */}
      <Transition appear show={isAlertModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={closeAlertModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-start justify-center p-4 min-h-full">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-[-20px]"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-[-20px]"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  {/* Action Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 hover:bg-gray-100"
                      >
                        <MoreVertical className="h-5 w-5 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {selectedAlert?.cardId && (
                        <DropdownMenuItem
                          onClick={() => handleLockCard(selectedAlert.cardId)}
                          className="cursor-pointer"
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          <span>
                            {cards.find(c => c.id === selectedAlert.cardId)?.isLocked 
                              ? "Unlock Card" 
                              : "Lock Card"}
                          </span>
                        </DropdownMenuItem>
                      )}
                      {selectedAlert?.transactionId && (
                        <DropdownMenuItem
                          onClick={() => handleReportTransaction(selectedAlert.transactionId)}
                          className="cursor-pointer"
                        >
                          <Flag className="mr-2 h-4 w-4" />
                          <span>Report Transaction</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleMarkAsResolved(selectedAlert?.id)}
                        className="cursor-pointer"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Mark as Resolved</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pr-10"
                  >
                    {selectedAlert?.title || "Alert Details"}
                  </Dialog.Title>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {selectedAlert?.severity === "high" ? (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Shield className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">
                          {selectedAlert?.message}
                        </p>
                      </div>
                    </div>

                    {selectedAlert?.cardId && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-sm font-medium">
                            •••• •••• •••• {cards.find(c => c.id === selectedAlert.cardId)?.last4}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {cards.find(c => c.id === selectedAlert.cardId)?.brand} • 
                          Exp {cards.find(c => c.id === selectedAlert.cardId)?.expiryDate}
                        </div>
                        <div className="mt-2 flex items-center">
                          {cards.find(c => c.id === selectedAlert.cardId)?.isLocked ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <Lock className="h-3 w-3 mr-1" />
                              Locked
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedAlert?.transaction && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {selectedAlert.transaction.merchant}
                          </span>
                          <span className="text-sm">
                            R{selectedAlert.transaction.amount}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {new Date(selectedAlert.transaction.date).toLocaleString()}
                        </div>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Flag className="h-3 w-3 mr-1" />
                            {selectedAlert.transaction.status}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Alert ID: {selectedAlert?.id}</span>
                      <span>
                        {selectedAlert?.date && 
                          new Date(selectedAlert.date).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={closeAlertModal}
                      className="flex-1"
                    >
                      Close
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => {
                        if (selectedAlert?.transactionId) {
                          handleReportTransaction(selectedAlert.transactionId);
                        } else if (selectedAlert?.cardId) {
                          handleLockCard(selectedAlert.cardId);
                        } else {
                          handleMarkAsResolved(selectedAlert?.id);
                        }
                      }}
                      className="flex-1 bg-intellilock-blue hover:bg-intellilock-blue/90"
                    >
                      {selectedAlert?.transactionId ? "Report" : 
                       selectedAlert?.cardId ? (cards.find(c => c.id === selectedAlert.cardId)?.isLocked ? "Unlock" : "Lock") : 
                       "Resolve"}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSearch(false)}
          />

          <div className="absolute top-0 left-0 right-0 bg-white shadow-xl rounded-b-m max-h-[85vh] overflow-hidden animate-in slide-in-from-top duration-300 md:max-w-md md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:max-h-[80vh]">
            <div className="relative p-4 border-b sticky top-0 bg-white z-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-12 py-2 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowSearch(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {searchQuery && (
              <ScrollArea className="h-[calc(100%-3.5rem)]">
                {searchResults.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {searchResults.map((result) => (
                      <li
                        key={result.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          navigate(`/${result.type}/${result.id}`);
                          setShowSearch(false);
                        }}
                      >
                        <h3 className="font-medium text-gray-900">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {result.type}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </ScrollArea>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
