import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, KeyRound, UserPlus, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Logo from "@/components/Logo";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pin, setPin] = useState("");
  const [pinAttempts, setPinAttempts] = useState(0);
  const [isPinLocked, setIsPinLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState({
    name: "",
    email: "",
    pin: "",
    securityQuestion: "",
    hint: "",
  });

  const [deviceInfo, setDeviceInfo] = useState("");

  // Enhanced biometric authentication
  const handleBiometricAuth = () => {
    toast({
      title: "Biometric Authentication",
      description: (
        <div className="flex items-center">
          <Fingerprint className="h-5 w-5 mr-2 animate-pulse text-blue-500" />
          <span>Processing your biometric data...</span>
        </div>
      ),
    });

    setTimeout(() => {
      setIsAuthenticated(true);
      toast({
        title: "Authentication Successful",
        description: (
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            <span>Welcome back to IntelliLock!</span>
          </div>
        ),
      });
    }, 1500);
  };

  // Enhanced PIN authentication with attempt limits
  const handlePinAuth = () => {
    if (isPinLocked) {
      const remainingTime = Math.ceil((lockTime - Date.now()) / 1000);
      toast({
        title: "PIN Locked",
        description: `Too many attempts. Try again in ${remainingTime} seconds.`,
        variant: "destructive",
      });
      return;
    }

    if (pin.length === 5) {
      if (pin === "12345") {
        setIsAuthenticated(true);
        setShowPinDialog(false);
        setPinAttempts(0);
        toast({
          title: "PIN Verified",
          description: (
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <span>Welcome back to IntelliLock!</span>
            </div>
          ),
        });
      } else {
        const newAttempts = pinAttempts + 1;
        setPinAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsPinLocked(true);
          setLockTime(Date.now() + 30000);
          toast({
            title: "Too Many Attempts",
            description: (
              <div className="flex items-center">
                <XCircle className="h-5 w-5 mr-2 text-red-500" />
                <span>PIN locked for 30 seconds</span>
              </div>
            ),
            variant: "destructive",
          });
        } else {
          toast({
            title: "Invalid PIN",
            description: `Attempts remaining: ${3 - newAttempts}`,
            variant: "destructive",
          });
        }
        setPin("");
      }
    }
  };

  // Reset PIN lock after timeout
  useEffect(() => {
    if (isPinLocked) {
      const timer = setTimeout(() => {
        if (Date.now() >= lockTime) {
          setIsPinLocked(false);
          setPinAttempts(0);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPinLocked, lockTime]);

  // Device detection and location
  useEffect(() => {
    if (showCreateModal) {
      const getDeviceMake = () => {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) return "Android Device";
        if (/iPhone|iPad|iPod/i.test(ua)) return "Apple iOS Device";
        if (/Windows/i.test(ua)) return "Windows PC";
        if (/Macintosh/i.test(ua)) return "Mac Device";
        if (/Linux/i.test(ua)) return "Linux Machine";
        return "Unknown Device";
      };

      setDeviceInfo(getDeviceMake());
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location captured:", position.coords);
          },
          () => {
            toast({
              title: "Location Required",
              description: "Please allow location access for security purposes.",
              variant: "destructive",
            });
          }
        );
      }
    }
  }, [showCreateModal, toast]);

  // Redirect on authentication
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center space-y-8 w-full max-w-md">
        <Logo className="scale-150 mb-4" />

        <p className="text-center text-gray-600 mb-8">
          Protect your cards with AI-powered security
        </p>

        <div className="flex flex-col space-y-4 w-full">
          <Button 
            onClick={handleBiometricAuth}
            className="w-full py-6"
            size="lg"
          >
            <Fingerprint className="mr-2 h-5 w-5" />
            Sign-in with Biometrics
          </Button>

          <Button 
            onClick={() => setShowPinDialog(true)}
            variant="outline"
            className="w-full"
          >
            <KeyRound className="mr-2 h-5 w-5" />
            Use PIN Instead
          </Button>

          <Button 
            onClick={() => setShowCreateModal(true)}
            variant="ghost"
            className="w-full"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Create Account
          </Button>
        </div>
      </div>

      {/* Enhanced PIN Dialog */}
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              {isPinLocked ? (
                <span className="text-red-500">PIN Locked</span>
              ) : (
                "Enter Your 5-Digit PIN"
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            {isPinLocked ? (
              <div className="text-center text-gray-500">
                <p>Too many incorrect attempts.</p>
                <p>Try again in {Math.ceil((lockTime - Date.now()) / 1000)} seconds.</p>
              </div>
            ) : (
              <>
                <InputOTP 
                  maxLength={5} 
                  value={pin} 
                  onChange={setPin}
                  disabled={isPinLocked}
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {pinAttempts > 0 && (
                  <p className="text-sm text-red-500 mt-2">
                    Attempts: {pinAttempts}/3
                  </p>
                )}

                <Button 
                  onClick={handlePinAuth} 
                  className="mt-6"
                  disabled={pin.length !== 5 || isPinLocked}
                >
                  Verify PIN
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Account Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-[23rem] px-4 py-4 rounded-2xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Create Account
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-4 mt-2">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={accountDetails.name}
              onChange={(e) =>
                setAccountDetails({ ...accountDetails, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={accountDetails.email}
              onChange={(e) =>
                setAccountDetails({ ...accountDetails, email: e.target.value })
              }
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Choose a 5-digit PIN
              </label>
              <InputOTP
                maxLength={5}
                value={accountDetails.pin}
                onChange={(val) =>
                  setAccountDetails({ ...accountDetails, pin: val })
                }
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-gray-500">
                Note: Your PIN is not stored and cannot be recovered. Please keep it safe.
              </p>
            </div>

            <div className="text-sm text-gray-500">
              Device: <span className="font-medium">{deviceInfo}</span>
            </div>

            <Button
              className="mt-2 w-full"
              onClick={() => {
                toast({
                  title: "Account Created",
                  description: `PIN registered (not stored). Device: ${deviceInfo}`,
                });
                setShowCreateModal(false);
              }}
              disabled={
                !accountDetails.name ||
                !accountDetails.email ||
                accountDetails.pin.length !== 5
              }
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
