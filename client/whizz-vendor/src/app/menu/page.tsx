"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import MenuTable from "@/components/MenuTable";
import AddItemModal from "@/components/AddItemModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMenuItems, addMenuItem } from "@/redux/menuSlice";
import { useEffect, useState } from "react";

// Define the MenuItem type explicitly
interface MenuItem {
  id: number;
  image: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  startTime?: string;
  endTime?: string;
  daysAvailable?: string[];
  available: boolean;
}

export default function Menu() {
  const dispatch = useDispatch<AppDispatch>();
  const menuItems = useSelector((state: RootState) => state.menu.items);
  const menuStatus = useSelector((state: RootState) => state.menu.status);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (menuStatus === "idle") {
      dispatch(fetchMenuItems());
    }
  }, [dispatch, menuStatus]);

  const handleAddItem = (newItem: MenuItem) => {
    dispatch(addMenuItem(newItem));
  };

  // Filter menu items based on search term
  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          <div className="flex flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3CAE06]">Menu</h1>
            <div className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="Search items..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <AddItemModal
                onAddItem={handleAddItem}
                nextId={menuItems.length + 1}
              />
            </div>
          </div>
          <div className="mt-6 border border-[#e5e7eb] rounded-md">
            {menuStatus === "loading" && <p>Loading menu items...</p>}
            {menuStatus === "succeeded" && (
              <MenuTable menuItems={filteredMenuItems} />
            )}
            {menuStatus === "failed" && <p>Failed to load menu items.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
