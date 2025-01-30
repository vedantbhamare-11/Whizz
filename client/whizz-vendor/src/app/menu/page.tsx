"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import MenuTable, { MenuItem } from "@/components/MenuTable";
import AddItemModal from "@/components/AddItemModal";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchMenuItems, addMenuItem, toggleAvailability, changeCategory, updateMenuItem, deleteMenuItem, changeSubcategory, setSubcategories, setStatus } from "@/redux/menuSlice";
import { useEffect, useState, useMemo, useCallback } from "react";
import { addDishApi, deleteDishApi, getSubcategories, manageCategory, manageSubcategory, toggleDishAvailabilityApi, updateDishApi } from "../API/menu";
import { decrementMenuCount, incrementMenuCount } from "@/redux/dashboardSlice";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { ChevronLeft, ChevronRight, RefreshCcw, TextSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Menu() {
  const dispatch = useDispatch<AppDispatch>();
  const menuItems = useSelector((state: RootState) => state.menu.items, shallowEqual);
  const menuStatus = useSelector((state: RootState) => state.menu.status);
  const totalPages = useSelector((state: RootState) => state.menu.totalPages);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(14);


  useEffect(() => {
    if (menuStatus === "idle") {
      dispatch(fetchMenuItems({ searchTerm, currentPage, itemsPerPage }));
    }
  }, [dispatch, menuStatus]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await getSubcategories();
        if (response.success) {
          dispatch(setSubcategories(response.data));
        }
      } catch (error: any) {
        toast.error(error);
      }
    };
    fetchSubcategories();
  }, [dispatch]);

  const filteredMenuItems = useMemo(() => {
    return menuItems?.filter((item) =>
      item.dishName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [menuItems, searchTerm]);

  const handleAddItem = useCallback(async (newItem: any) => {
    try {
      const response = await addDishApi(newItem);
      if (response.success) {
        dispatch(addMenuItem(response.data));
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }, [dispatch]);

  const handleToggleAvailability = useCallback(async (id: string, isAvailable: boolean) => {
    try {
      const response = await toggleDishAvailabilityApi(id, isAvailable);
      if (response.success) {
        dispatch(toggleAvailability({ id, isAvailable }));
        isAvailable ? dispatch(incrementMenuCount()) : dispatch(decrementMenuCount());
        toast.success(`${response.data.dishName} is now ${isAvailable ? "available" : "unavailable"}`);
      }
    } catch (error) {
      toast.error(`Failed to ${isAvailable ? "enable" : "disable"} the dish`);
    }
  }, [dispatch]);

  const handleManageCategory = useCallback(async (id: string, category: string) => {
    try {
      const response = await manageCategory(id, category);
      if (response.success) {
        dispatch(changeCategory({ id, category }));
        toast.success(`${response.data.dishName} is now in ${category}`);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }, [dispatch]);

  const handleManageSubCategory = useCallback(async (id: string, subcategory: string) => {
    try {
      const response = await manageSubcategory(id, subcategory);
      if (response.success) {
        dispatch(changeSubcategory({ id, subcategory }));
        toast.success(`${response.data.dishName} is now in ${subcategory}`);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }, [dispatch]);

  const handleEdit = useCallback(async (menuItem: MenuItem) => {
    try {
      const response = await updateDishApi(menuItem);
      if (response.data) {
        dispatch(updateMenuItem(response.data));
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }, [dispatch]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await deleteDishApi(id);
      if (response.success) {
        dispatch(deleteMenuItem(id));
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }, [dispatch]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchMenuItems({ searchTerm, currentPage: page, itemsPerPage }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    searchTerm && dispatch(fetchMenuItems({ searchTerm, currentPage: 1, itemsPerPage }));
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setCurrentPage(currentPage);
    searchTerm && dispatch(fetchMenuItems({ searchTerm: "", currentPage, itemsPerPage }));
  };

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
              <Button
                className={`flex items-center gap-2 bg-[#3CAE06] text-white hover:bg-green-600 ${!searchTerm ? "opacity-50 " : ""}`}
                onClick={handleSearch}
              >
                <TextSearch size={18} /> 
              </Button>
              <Button
                className={`flex items-center gap-2 bg-[#3CAE06] text-white hover:bg-green-600 ${!searchTerm ? "opacity-50" : ""}`}
                onClick={handleRefresh}
              >
                <RefreshCcw size={18} /> 
              </Button>
              <AddItemModal onAddItem={handleAddItem} />
              
            </div>
          </div>
          {menuStatus === "loading" && (
            <p className="absolute top-1/2 left-1/2 flex items-center justify-center flex-col text-xs font-semibold text-[#3CAE06] gap-4 ">
              <ScaleLoader color="#3CAE06" width={3} height={20} />Please wait a moment, Loading your dishes...
            </p>
          )}
          <div className="mt-6 border border-[#e5e7eb] rounded-md">

            {menuStatus === "succeeded" && (
              <MenuTable
                menuItems={filteredMenuItems as any}
                onToggleAvailability={handleToggleAvailability}
                onChangeCategory={handleManageCategory}
                onChangeSubcategory={handleManageSubCategory}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onShowDetails={(id: string) => console.log(`Show details for menu item with ID: ${id}`)}
              />
            )}
            {menuStatus === "failed" && <p>Failed to load menu items.</p>}
          </div>
          {/* Pagination controls */}
          {menuStatus === "succeeded" && (<div className="mt-4 flex justify-between">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft className={`text-sm text-[#3CAE06] font-semibold ${currentPage === 1 ? "opacity-20 cursor-not-allowed" : ""}`} />

            </button>
            <span
              className="text-sm text-[#3CAE06] font-semibold"
            >
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight className={`text-sm text-[#3CAE06] font-semibold ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`} />
            </button>
          </div>)}
        </div>
      </main>
    </div>
  );
}
