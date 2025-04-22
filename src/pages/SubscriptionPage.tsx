import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Shield, Bell, CreditCard, Check, 
  X, Zap, BadgeCheck, Lock, 
  EyeOff, Activity, AlertCircle,
  CreditCard as CreditCardIcon,
  User
} from 'lucide-react';

const SubscriptionPage: React.FC = () => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloseButton(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: Shield, text: "AI Protection" },
    { icon: Bell, text: "Instant Alerts" },
    { icon: CreditCard, text: "Card Security" },
    { icon: BadgeCheck, text: "Premium Support" },
    { icon: Lock, text: "Encryption" },
    { icon: EyeOff, text: "Privacy" },
    { icon: Activity, text: "Live Monitoring" },
    { icon: AlertCircle, text: "Fraud Detection" }
  ];

  const plans = [
    {
      id: 'monthly',
      name: "Monthly",
      price: "R99",
      period: "/mo",
      popular: false,
      cta: "Start Trail",
      highlight: "7-day trial"
    },
    {
      id: 'annual',
      name: "Annual",
      price: "R999",
      period: "/yr",
      popular: true,
      cta: "Best Value",
      highlight: "Save 81%",
      perWeek: "R19.23/wk"
    },
    {
      id: 'lifetime',
      name: "Lifetime",
      price: "R1,499",
      period: "",
      popular: false,
      cta: "Buy Once",
      highlight: "One payment"
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowSubscriptionModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', { plan: selectedPlan, ...formData });
    setShowSubscriptionModal(false);
    navigate('/payment-success'); 
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 p-4 pt-20 overflow-y-auto">
      {/* Logo */}
      <div className="flex justify-center mb-5">
        <div className="relative">
          <img 
            src="/logo.png" 
            alt="IntelliLock Logo"
            className={`
              rounded-lg
              ${false ? 'h-10 w-10' : 'h-12 w-auto max-w-[180px]'}
            `}
          />
        </div>
      </div>

      {/* Close Button */}
      {showCloseButton && (
        <button
          onClick={() => navigate('/home')}
          className="absolute top-6 right-4 z-50 p-1.5 rounded-full bg-white shadow-sm border border-gray-200"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center bg-intellilock-blue/10 text-intellilock-blue px-3 py-1 rounded-full text-xs mb-2">
          <Zap className="h-3 w-3 mr-1" />
          PRO FEATURES
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Upgrade to PRO</h1>
        <p className="text-gray-600 text-sm">Complete financial protection</p>
      </div>

      {/* Features Grid */}
      <div className="mb-6">
        <div className="grid grid-cols-4 gap-2 mb-2">
          {features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex flex-col items-center bg-white rounded-lg p-2 shadow-xs border border-gray-100">
              <div className="bg-intellilock-blue/10 p-1.5 rounded-full mb-1">
                <feature.icon className="h-3.5 w-3.5 text-intellilock-black" />
              </div>
              <span className="text-[10px] font-medium text-center">{feature.text}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {features.slice(4, 8).map((feature, index) => (
            <div key={index+4} className="flex flex-col items-center bg-white rounded-lg p-2 shadow-xs border border-gray-100">
              <div className="bg-intellilock-blue/10 p-1.5 rounded-full mb-1">
                <feature.icon className="h-3.5 w-3.5 text-intellilock-black" />
              </div>
              <span className="text-[10px] font-medium text-center">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="space-y-3 mb-5">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative rounded-xl p-3 border ${
              plan.popular 
                ? 'border-intellilock-blue bg-intellilock-blue/5 shadow-sm' 
                : 'border-gray-200 bg-white'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-2 left-3 bg-intellilock-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                POPULAR
              </div>
            )}
            
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{plan.name}</h3>
                {plan.highlight && (
                  <span className="text-xs text-intellilock-blue">{plan.highlight}</span>
                )}
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 text-xs">{plan.period}</span>
              </div>
            </div>
            
            {plan.perWeek && (
              <p className="text-xs text-gray-500 mb-2">{plan.perWeek}</p>
            )}
            
            <Button
              onClick={() => handlePlanSelect(plan.id)}
              className={`w-full text-xs py-1.5 h-auto ${
                plan.popular 
                  ? 'bg-intellilock-blue hover:bg-intellilock-blue/90' 
                  : 'bg-gray-900 hover:bg-gray-800'
              }`}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-gray-500">
        <p className="mb-1.5">7-day free trial • Cancel anytime</p>
        <div className="flex justify-center space-x-3">
          <button className="hover:underline">Terms</button>
          <button className="hover:underline">Privacy</button>
          <button className="hover:underline">Restore</button>
        </div>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-in fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {plans.find(p => p.id === selectedPlan)?.name} Plan
              </h2>
              <button 
                onClick={() => setShowSubscriptionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Personal Info */}
                <div>
                  <h3 className="flex items-center text-sm font-medium mb-2">
                    <User className="h-4 w-4 mr-2 text-intellilock-black" />
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div>
                  <h3 className="flex items-center text-sm font-medium mb-2">
                    <CreditCardIcon className="h-4 w-4 mr-2 text-intellilock-black" />
                    Payment Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Order Summary</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Plan:</span>
                    <span>{plans.find(p => p.id === selectedPlan)?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total:</span>
                    <span className="text-intellilock-blue">
                      {plans.find(p => p.id === selectedPlan)?.price}
                      {plans.find(p => p.id === selectedPlan)?.period}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-intellilock-blue hover:bg-intellilock-blue/90 mt-4"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
