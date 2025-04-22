import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useApp } from "@/context/AppContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Fingerprint,
  BellRing,
  CreditCard,
  LogOut,
  User,X,
  Shield,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Settings: React.FC = () => {
  const { user } = useApp();

  // States
  const [biometricsEnabled, setBiometricsEnabled] = useState(
    user?.biometricEnabled || false
  );
  const [selectedDuration, setSelectedDuration] = useState("30 Seconds");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [pin, setPin] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Handlers
  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Info:", { name, email, phone });
    setShowUpdateForm(false);
  };

  const handlePINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d{0,5}$/.test(val)) {
      setPin(val);
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    window.location.href = "/"; // Redirect to index page
  };

  return (
    <MainLayout>
      <div className="space-y-5">
        {/* Account Settings */}
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-intellilock-black" />
              <CardTitle>Account Settings</CardTitle>
            </div>
            <CardDescription>Manage your account info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-sm font-medium">Personal Information</h3>

                {showUpdateForm ? (
                  <form onSubmit={handleUpdateSubmit} className="mt-3 space-y-3">
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500">Name</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500">Email</label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500">Phone</label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Button type="submit" size="sm">
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => setShowUpdateForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => setShowUpdateForm(true)}
                    >
                      Update Information
                    </Button>
                  </>
                )}
              </div>

              {/* Actions */}
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
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-intellilock-black" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>
              Configure your account security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Biometrics */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Biometric Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Use fingerprint or face recognition to secure your app
                </div>
              </div>
              <Switch
                checked={biometricsEnabled}
                onCheckedChange={() => setBiometricsEnabled(!biometricsEnabled)}
              />
            </div>

            <Separator />

            {/* App PIN */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Change App PIN</div>
                <div className="text-sm text-muted-foreground">
                  5-digit PIN to unlock app manually
                </div>
              </div>
              <div className="w-32">
                <Input
                  type="password"
                  value={pin}
                  onChange={handlePINChange}
                  maxLength={5}
                  placeholder="*****"
                  className="text-center"
                />
              </div>
            </div>

            <Separator />

            {/* Auto-lock Timeout */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Auto-Lock Timeout</div>
                <div className="text-sm text-muted-foreground">
                  Lock app after inactivity
                </div>
              </div>
              <div className="w-48 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <div className="relative">
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="block w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                  >
                    <option>30 Seconds</option>
                    <option>45 Seconds</option>
                    <option>1 Minute</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BellRing className="h-5 w-5 text-intellilock-black" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>
              Control how and when you receive alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Push Notifications", defaultChecked: true }, 
              { label: "Email Alerts", defaultChecked: true }, 
              { label: "SMS Alerts", defaultChecked: false }
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">
                      Receive {item.label.toLowerCase()}
                    </div>
                  </div>
                  <Switch defaultChecked={item.defaultChecked} />
                </div>
                {index !== 2 && <Separator />}
              </React.Fragment>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <div className="flex justify-center mt-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-intellilock-red hover:bg-red-50"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign-Out
          </Button>
        </div>

        {/* Logout Confirmation Dialog */}
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent className="max-w-[20rem] px-4 py-4 rounded-2xl shadow-lg">
            <div className="flex justify-end absolute right-4 top-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowLogoutDialog(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <AlertDialogHeader className="pt-6">
              <AlertDialogTitle className="text-center text-lg font-semibold">
                Confirm
              </AlertDialogTitle>
            </AlertDialogHeader>

            <div className="flex flex-col space-y-6 text-sm text-gray-700 pb-2">
              <AlertDialogDescription className="text-center text-gray-600 px-2">
                Are you sure you want to sign-out?
              </AlertDialogDescription>

              <Button
                className="w-full bg-intellilock-red hover:bg-intellilock-red/90 py-2 text-sm rounded-lg"
                onClick={handleLogout}
              >
                Sign-Out
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
};

export default Settings;

