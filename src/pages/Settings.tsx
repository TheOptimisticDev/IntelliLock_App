
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Fingerprint, BellRing, CreditCard, LogOut, User, ShieldAlert } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Settings: React.FC = () => {
  const { user } = useApp();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-5 w-5 text-intellilock-blue" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>
              Configure your account security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Biometric Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Use fingerprint or face recognition to secure your app
                </div>
              </div>
              <Switch checked={user?.biometricEnabled} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </div>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Auto-Lock Timeout</div>
                <div className="text-sm text-muted-foreground">
                  Automatically lock your app after inactivity
                </div>
              </div>
              <Button variant="outline" size="sm">
                5 minutes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BellRing className="h-5 w-5 text-intellilock-blue" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>
              Control how and when you receive alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive alerts on your device
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Email Alerts</div>
                <div className="text-sm text-muted-foreground">
                  Receive alerts via email
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">SMS Alerts</div>
                <div className="text-sm text-muted-foreground">
                  Receive critical alerts via SMS
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-intellilock-blue" />
              <CardTitle>Account Settings</CardTitle>
            </div>
            <CardDescription>
              Manage your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium">Personal Information</h3>
                <div className="mt-3 space-y-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Name</span>
                    <span className="text-sm">{user?.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Email</span>
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Phone</span>
                    <span className="text-sm">{user?.phone}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Update Information
                </Button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Account Actions</h3>
                <div className="mt-3 space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Payment Methods
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Reset Biometric Data
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-intellilock-red">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
