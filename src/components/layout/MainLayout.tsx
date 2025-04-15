import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const isHomePage = location.pathname === "/dashboard";

  const navigation = [
    { name: "Home", path: "/dashboard", icon: Home },
    { name: "Cards", path: "/transactions", icon: CreditCard },
    { name: "Outlets", path: "/merchants", icon: ShoppingBag },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      {/* App Bar */}
      <header className="bg-transparent fixed top-0 left-0 right-0 z-10">
        <div className="px-4 h-14 flex items-center justify-end">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-0 -right-1 bg-intellilock-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadAlertsCount}
                </span>
              )}
            </Button>

            {/* Notifications Modal */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg z-50">
                <div className="flex justify-between items-center border-b p-4">
                  <h2 className="text-sm font-semibold">Notifications</h2>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="max-h-60">
                  <ul className="divide-y divide-gray-200">
                    {alerts && alerts.length > 0 ? (
                      alerts.map((alert, index) => (
                        <li key={index} className="flex gap-3 p-4 text-sm items-start">
                          <div className="pt-1">{getAlertIcon(alert.severity)}</div>
                          <div className="flex flex-col">
                            <span className="text-gray-800 font-medium">
                              {alert.message || "New alert received"}
                            </span>
                            {alert.timestamp && (
                              <span className="text-xs text-gray-400 mt-1">
                                {alert.timestamp}
                              </span>
                            )}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="p-4 text-sm text-gray-500 text-center">
                        No new notifications
                      </li>
                    )}
                  </ul>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Welcome message for user - only on home page */}
      {isHomePage && user && (
        <div className="pt-16 px-4 pb-2">
          <div className="mb-2">
            <p className="text-2xl font-bold text-intellilock-blue">
              Welcome Back, {user.name}
            </p>
            <p className="text-sm text-gray-600">
              Your cards are protected by AI-powered security
            </p>
          </div>
        </div>
      )}

      {/* Main content area */}
      <ScrollArea className="flex-grow pb-16 h-[calc(100vh-4rem)]">
        <div className="px-4 py-4 pt-16">{children}</div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <nav className="bg-white shadow fixed bottom-0 left-0 right-0 h-16 border-t z-10">
        <div className="grid grid-cols-4 h-full">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center space-y-1 ${
                  isActive ? "text-intellilock-blue" : "text-gray-500"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
