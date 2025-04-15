import React, { useState } from "react";
import { Merchant } from "@/types";
import { ShoppingBag, Coffee, Package, Zap, Check, PlusCircle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface MerchantItemProps {
  merchant: Merchant;
  onAddToTrusted?: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Food & Drink":
      return <Coffee className="h-5 w-5 text-orange-500" />;
    case "Shopping":
      return <ShoppingBag className="h-5 w-5 text-blue-500" />;
    case "Electronics":
      return <Zap className="h-5 w-5 text-yellow-500" />;
    default:
      return <Package className="h-5 w-5 text-gray-500" />;
  }
};

const MerchantItem: React.FC<MerchantItemProps> = ({ merchant, onAddToTrusted }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="p-4 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            {getCategoryIcon(merchant.category)}
          </div>
          <div>
            <p className="text-base font-medium text-gray-800">{merchant.name}</p>
            <p className="text-sm text-gray-400">{merchant.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfoModal(true)}
            className="hover:bg-gray-100"
          >
            <Info className="w-5 h-5 text-gray-600" />
          </Button>

          {merchant.isTrusted ? (
            <div className="flex items-center text-green-600">
              <Check className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium text-green-700">Trusted</span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onAddToTrusted}
              className="text-sm"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add
            </Button>
          )}
        </div>
      </div>

      {/* Drop-down for additional information */}
      <div className="mt-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
          {isExpanded ? "Hide Details" : "Show Details"}
        </Button>

        {isExpanded && (
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span>{merchant.isTrusted ? "Added to Trusted" : "Not Added"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Category:</span>
              <span>{merchant.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">More Info:</span>
              <span>Additional merchant-related information here.</span>
            </div>
          </div>
        )}
      </div>

      {/* Info Modal */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="max-w-[20rem] px-4 py-6 rounded-2xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              {merchant.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center text-sm text-gray-700 mt-4 space-y-2">
            <p>
              <span className="font-medium">Category:</span> {merchant.category}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {merchant.isTrusted ? "Trusted" : "Untrusted"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default MerchantItem;
