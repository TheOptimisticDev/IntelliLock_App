
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Home, CreditCard, ShoppingBag, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadAlertsCount, user } = useApp();
  
  const isHomePage = location.pathname === "/dashboard";
  
  const navigation = [
    { name: "Home", path: "/dashboard", icon: Home },
    { name: "Cards", path: "/transactions", icon: CreditCard },
    { name: "Merchants", path: "/merchants", icon: ShoppingBag },
    { name: "Settings", path: "/settings", icon: Settings }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Completely Transparent App Bar */}
      <header className="bg-transparent fixed top-0 left-0 right-0 z-10">
        <div className="px-4 h-14 flex items-center justify-end">
          <div className="flex items-center">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-intellilock-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadAlertsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
        {title && (
          <div className="px-4 py-2">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
        )}
      </header>

      {/* Welcome message for user - only on home page */}
      {isHomePage && user && (
        <div className="pt-16 px-4 pb-2">
          <div className="mb-2">
            <p className="text-2xl font-bold text-intellilock-blue">
              Welcome, {user.name}
            </p>
            <p className="text-sm text-gray-600">
              Your account is protected
            </p>
          </div>
        </div>
      )}

      {/* Main content - scrollable with full height viewport */}
      <ScrollArea className="flex-grow pb-16 h-[calc(100vh-4rem)]">
        <div className="px-4 py-4 pt-16">
          {!isHomePage && user && (
            <div className="mb-4">
              <p className="text-lg text-intellilock-blue">
                Hello, {user.name}
              </p>
            </div>
          )}
          {children}
        </div>
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
                  isActive 
                    ? "text-intellilock-blue" 
                    : "text-gray-500"
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
