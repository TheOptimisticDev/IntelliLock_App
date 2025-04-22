import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import MerchantItem from "@/components/merchants/MerchantItem";
import { useApp } from "@/context/AppContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Merchants: React.FC = () => {
  const { merchants, addMerchantToTrusted } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newMerchant, setNewMerchant] = useState({
    name: "",
    category: "",
    isTrusted: true,
  });

  const sortedMerchants = [...merchants].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const handleAddMerchant = () => {
    if (newMerchant.name && newMerchant.category) {
      addMerchantToTrusted(newMerchant);
      setNewMerchant({ name: "", category: "", isTrusted: true });
      setDialogOpen(false);
    }
  };

  return (
    <MainLayout>
      <main className="space-y-5">
        <div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Add Store
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[20rem] px-4 py-4 rounded-2xl shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-center text-lg font-semibold">
                  Add Outlet
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col space-y-4 mt-4 text-sm text-gray-700">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-gray-600">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newMerchant.name}
                    onChange={(e) =>
                      setNewMerchant({ ...newMerchant, name: e.target.value })
                    }
                    placeholder="Shop Name"
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="category" className="text-gray-600">
                    Category
                  </Label>
                  <Select
                    value={newMerchant.category}
                    onValueChange={(value) =>
                      setNewMerchant({ ...newMerchant, category: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food & Drink">
                        Food & Drink
                      </SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full mt-2" onClick={handleAddMerchant}>
                  Add to Trusted List
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Stores
            </CardTitle>
            <ShoppingBag className="h-5 w-5 text-intellilock-black" />
          </CardHeader>
          <CardContent className="p-4">
            {sortedMerchants.length > 0 ? (
              <div className="grid gap-4">
                {sortedMerchants.map((merchant) => (
                  <MerchantItem
                    key={merchant.id}
                    merchant={merchant}
                    onAddToTrusted={
                      merchant.isTrusted
                        ? undefined
                        : () =>
                            addMerchantToTrusted({
                              name: merchant.name,
                              category: merchant.category,
                              isTrusted: true,
                            })
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>No outlets found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
};

export default Merchants;

