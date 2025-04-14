
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import MerchantItem from "@/components/merchants/MerchantItem";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Merchants: React.FC = () => {
  const { merchants, addMerchantToTrusted } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newMerchant, setNewMerchant] = useState({ name: "", category: "" });
  
  // Sort merchants alphabetically
  const sortedMerchants = [...merchants].sort((a, b) => a.name.localeCompare(b.name));

  const handleAddMerchant = () => {
    if (newMerchant.name && newMerchant.category) {
      addMerchantToTrusted(newMerchant);
      setNewMerchant({ name: "", category: "" });
      setDialogOpen(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Trusted Merchants</h1>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Merchant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Trusted Merchant</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newMerchant.name}
                    onChange={(e) => setNewMerchant({ ...newMerchant, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select 
                    value={newMerchant.category}
                    onValueChange={(value) => setNewMerchant({ ...newMerchant, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddMerchant}>
                  Add to Trusted List
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Merchant List</CardTitle>
            <ShoppingBag className="h-5 w-5 text-intellilock-blue" />
          </CardHeader>
          <CardContent className="p-0">
            {sortedMerchants.length > 0 ? (
              <div className="divide-y">
                {sortedMerchants.map((merchant) => (
                  <MerchantItem 
                    key={merchant.id} 
                    merchant={merchant} 
                    onAddToTrusted={
                      merchant.isTrusted 
                        ? undefined 
                        : () => addMerchantToTrusted({ 
                            name: merchant.name, 
                            category: merchant.category 
                          })
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>No merchants found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Merchants;
