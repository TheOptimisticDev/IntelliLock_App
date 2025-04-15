
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, KeyRound } from "lucide-react";
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

  // Mock biometric authentication
  const handleBiometricAuth = () => {
    // Simulate biometric processing
    toast({
      title: "Biometric Authentication",
      description: "Processing your biometric data...",
    });

    setTimeout(() => {
      // Mock successful authentication
      setIsAuthenticated(true);
      toast({
        title: "Authentication Successful",
        description: "Welcome back to IntelliLock!",
      });
    }, 1500);
  };

  // Handle PIN authentication
  const handlePinAuth = () => {
    if (pin.length === 5) {
      // Mock PIN verification (in real app, this would validate against a stored PIN)
      if (pin === "12345") { // Demo PIN
        setIsAuthenticated(true);
        setShowPinDialog(false);
        toast({
          title: "PIN Verified",
          description: "Welcome back to IntelliLock!",
        });
      } else {
        toast({
          title: "Invalid PIN",
          description: "Please try again",
          variant: "destructive"
        });
        setPin("");
      }
    }
  };

  // Navigate to dashboard when authenticated
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
            Sign in with Biometrics
          </Button>
          
          <Button 
            onClick={() => setShowPinDialog(true)}
            variant="outline"
            className="w-full"
          >
            <KeyRound className="mr-2 h-5 w-5" />
            Use PIN Instead
          </Button>
        </div>
      </div>

      {/* PIN Dialog */}
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Your 5-Digit PIN</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <InputOTP maxLength={5} value={pin} onChange={setPin}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
            
            <Button 
              onClick={handlePinAuth} 
              className="mt-6"
              disabled={pin.length !== 5}
            >
              Verify PIN
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
