"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import MenuTable from "@/components/MenuTable";
import AddItemModal from "@/components/AddItemModal";
import { useState } from "react";

interface MenuItem {
  id: number;
  image: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  available: boolean;
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Paneer Butter Masala",
      price: 250,
      category: "Veg",
      subCategory: "Main Course",
      available: true,
    },
  ]);

  const handleAddItem = (newItem: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">
          <div className="flex flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3CAE06]">Menu</h1>
            <div className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="Search items..."
                className="w-64"
              />
              <Button className="flex items-center gap-2 bg-gray-100 text-black hover:bg-gray-200">
                <SlidersHorizontal size={16} />
                View
              </Button>
              <AddItemModal
                onAddItem={handleAddItem}
                nextId={menuItems.length + 1}
              />
            </div>
          </div>
          <div className="mt-6 border border-[#e5e7eb] rounded-md">
            <MenuTable menuItems={menuItems} />
          </div>
        </div>
      </main>
    </div>
  );
}
