import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Home,
  CreditCard,
  ShoppingBag,
  Settings,
  X,
  XCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import AlertItem from "@/components/alerts/AlertItem";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const getAlertIcon = (severity: string) => {
  switch (severity) {
    case "error":
      return <XCircle className="text-red-600 h-5 w-5" />;
    case "warning":
      return <AlertTriangle className="text-yellow-500 h-5 w-5" />;
    case "success":
      return <CheckCircle className="text-green-600 h-5 w-5" />;
    default:
      return <Info className="text-blue-500 h-5 w-5" />;
  }
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadAlertsCount, user, alerts } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/transactions")) return "Wallet";
    if (path.startsWith("/merchants")) return "Trusted Outlets";
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

  // Simulate search results
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
    <div className="flex flex-col bg-gray-50 relative">
      {/* Transparent App Bar */}
      <header className="bg-transparent fixed top-0 left-0 right-0 z-10 h-20">
        <div className="px-6 h-full flex items-center justify-between">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {getPageTitle()}
          </h1>

          {/* Right Icons */}
          <div className="flex items-center">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100/50 rounded-full"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-6 w-6 text-gray-900" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100/50 rounded-full"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6 text-gray-900" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-intellilock-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {unreadAlertsCount}
                  </span>
                )}
              </Button>

              {/* Notification Modal */}
              {showNotifications && (
                <div
                  className="fixed inset-0 z-50 flex items-start justify-end px-4 pt-20 bg-black bg-opacity-30"
                  onClick={() => setShowNotifications(false)}
                >
                  <div
                    className="w-full max-w-md bg-white shadow-xl flex flex-col max-h-[80vh] rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center border-b px-4 py-3">
                      <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
                      <Button size="icon" variant="ghost" onClick={() => setShowNotifications(false)}>
                        <X className="h-6 w-6 text-gray-600" />
                      </Button>
                    </div>

                    <ScrollArea className="flex-1">
                      {recentAlerts.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                          {recentAlerts.map((alert) => (
                            <AlertItem key={alert.id} alert={alert} />
                          ))}
                        </ul>
                      ) : (
                        <div className="p-6 text-sm text-gray-500 text-center">No new notifications</div>
                      )}
                    </ScrollArea>

                    <div className="border-t px-4 py-3 text-center">
                      <button
                        className="text-sm font-medium text-intellilock-blue hover:underline"
                        onClick={() => {
                          navigate("/alerts");
                          setShowNotifications(false);
                        }}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Message */}
      {location.pathname === "/dashboard" && user && (
        <div className="pt-20 px-6">
          <p className="text-3xl font-bold text-intellilock-blue">Welcome Back, {user.name}</p>
          <p className="text-base text-gray-600">Your cards are protected by AI-powered security</p>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20 pb-16 flex-1">
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="px-4">{children}</div>
        </ScrollArea>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-lg fixed bottom-0 left-0 right-0 h-16 border-t z-10">
        <div className="grid grid-cols-4 h-full">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center space-y-1 ${
                  isActive ? "text-intellilock-blue" : "text-gray-600"
                }`}
              >
                <item.icon className={`h-6 w-6 ${isActive ? "stroke-2" : ""}`} />
                <span className="text-xs font-bold">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Search Modal */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 bg-black bg-opacity-30"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-4 border-b">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-12 py-3 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowSearch(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="max-h-[60vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {searchResults.map((result) => (
                      <li
                        key={result.id}
                        className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          navigate(`/${result.type}/${result.id}`);
                          setShowSearch(false);
                        }}
                      >
                        <h3 className="font-medium text-gray-900">{result.title}</h3>
                        <p className="text-sm text-gray-500 capitalize">{result.type}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
