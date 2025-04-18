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
  User,
  Shield,
  Lock,
  KeyRound,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

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

  return (
    <MainLayout>
      <div className="space-y-5">
        {/* Security Settings */}
        <Card>
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
                <div className="font-medium">Change App PIn</div>
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
              <div className="w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option>30 Seconds</option>
                  <option>45 Seconds</option>
                  <option>1 Minute</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
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
              { label: "SMS Alerts", defaultChecked: false },
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

        {/* Account Settings */}
        <Card>
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-intellilock-red"
                  >
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
