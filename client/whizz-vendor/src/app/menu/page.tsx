"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Plus } from "lucide-react";
import MenuTable from "@/components/MenuTable";

export default function Menu() {
  // Sample data for menu items
  const menuItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Paneer Butter Masala",
      price: 250,
      category: "Veg",
      subCategory: "Main Course",
      available: true,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1618931445758-0307ee4027c5?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Chicken Biryani",
      price: 300,
      category: "Non-Veg",
      subCategory: "Rice",
      available: false,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Tandoori Roti",
      price: 40,
      category: "Veg",
      subCategory: "Bread",
      available: true,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1633457027853-106d9bed16ce?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Mutton Rogan Josh",
      price: 350,
      category: "Non-Veg",
      subCategory: "Main Course",
      available: true,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">
          {/* Page Heading */}
          <div className="flex flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3CAE06]">Menu</h1>
            {/* Search Bar and Buttons */}
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
              <Button className="flex items-center gap-2 bg-[#3CAE06] text-white hover:bg-green-600">
                <Plus size={16} />
                Add Item
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 border border-[#e5e7eb] rounded-md">
            <MenuTable menuItems={menuItems} />
          </div>
        </div>
      </main>
    </div>
  );
}
