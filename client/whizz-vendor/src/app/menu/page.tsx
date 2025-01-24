"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import MenuTable from "@/components/MenuTable";
import AddItemModal from "@/components/AddItemModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMenuItems, addMenuItem, toggleAvailability, changeCategory } from "@/redux/menuSlice";
import { useEffect, useState } from "react";
import { addDishApi, manageCategory, toggleDishAvailabilityApi } from "../API/menu";
import { decrementMenuCount, incrementMenuCount } from "@/redux/dashboardSlice";

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

  // Handle adding a new menu item
  const handleAddItem = async (newItem: any) => {
    try {
      const response = await addDishApi(newItem);
      if (response) {
        dispatch(addMenuItem(response));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle toggling dish availability
  const handleToggleAvailability = async (id: string, isAvailable: boolean) => {
    try {
      // Make API request for toggling availability
      const response = await toggleDishAvailabilityApi(id, isAvailable);
      if (response){
        // Update menu state
        dispatch(toggleAvailability({id, isAvailable}));
        // Update active menu count on dashboard
        isAvailable ? dispatch(incrementMenuCount()) : dispatch(decrementMenuCount());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle changing dish category
  const handleManageCategory = async (id: string, category: string) => {
    try {
      const response = await manageCategory(id, category);
      if (response){
        dispatch(changeCategory({id, category}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Edit menu item with ID: ${id}`);
    // Add edit functionality here
  };

  const handleDelete = (id: number) => {
    console.log(`Delete menu item with ID: ${id}`);
    // Add delete functionality here
  };

  const handleShowDetails = (id: number) => {
    console.log(`Show details for menu item with ID: ${id}`);
    // Add show details functionality here
  };

  // Filter menu items based on search term
  const filteredMenuItems = menuItems.filter((item: any) =>
    item.dishName.toLowerCase().includes(searchTerm.toLowerCase())
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
              />
            </div>
          </div>
          <div className="mt-6 border border-[#e5e7eb] rounded-md">
            {menuStatus === "loading" && <p>Loading menu items...</p>}
            {menuStatus === "succeeded" && (
              <MenuTable 
                menuItems={filteredMenuItems} 
                onToggleAvailability={handleToggleAvailability} 
                onChangeCategory={handleManageCategory}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onShowDetails={handleShowDetails}
              />
            )}
            {menuStatus === "failed" && <p>Failed to load menu items.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
