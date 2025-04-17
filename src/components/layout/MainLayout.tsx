import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Home, CreditCard, ShoppingBag, Settings, X, XCircle, AlertTriangle, CheckCircle, Info, } from "lucide-react";
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

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/transactions")) return "Wallet";
    if (path.startsWith("/merchants")) return "Trusted Outlets";
    if (path.startsWith("/settings")) return "Settings";
    if (path.startsWith("/alerts")) return "Notifications";
    return title || "Intellilock";
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

  return (
    <div className="flex flex-col bg-gray-50 relative">
      {/* Fully Transparent App Bar */}
      <header className="bg-transparent fixed top-0 left-0 right-0 z-10 h-20">
        <div className="px-6 h-full flex items-center justify-between">
          {/* Large Bold Route Text */}
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {getPageTitle()}
          </h1>

          {/* Notifications Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100/50 rounded-full"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-7 w-7 text-gray-700" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-intellilock-red text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {unreadAlertsCount}
                </span>
              )}
            </Button>

            {/* Notifications Modal */}
            {showNotifications && (
              <div
                className="fixed inset-0 z-50 flex items-start justify-end sm:justify-center px-4 pt-20 sm:pt-28 bg-black bg-opacity-30"
                onClick={() => setShowNotifications(false)}
              >
                <div
                  className="w-full max-w-md bg-white shadow-xl flex flex-col max-h-[80vh] rounded-lg sm:rounded-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center border-b px-4 py-3">
                    <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowNotifications(false)}
                    >
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
                      <div className="p-6 text-sm text-gray-500 text-center">
                        No new notifications
                      </div>
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
      </header>

      {/* Welcome message for user - only on home page */}
      {location.pathname === "/dashboard" && user && (
        <div className="pt-20 px-6">
          <div>
            <p className="text-3xl font-bold text-intellilock-blue">
              Welcome Back, {user.name}
            </p>
            <p className="text-base text-gray-600">
              Your cards are protected by AI-powered security
            </p>
          </div>
        </div>
      )}

      {/* Main content area */}
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
    </div>
  );
};

export default MainLayout;
