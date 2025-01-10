"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import VendorTable from "@/components/VendorTable"; // Import the new table component
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, Plus } from "lucide-react";
import { useEffect } from "react";
import { setVendor, updateVendorCategory, updateVendorOpen } from "@/redux/vendorSlice";
import { changeCategory, fetchVendorsApi, manageOpening } from "../API/vendor";

export default function VendorsPage() {

  const dispatch = useDispatch();

  const vendors = useSelector((state: RootState) => state.vendors.vendors);

  // Get fetch vendor data
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        // Api call
        const response = await fetchVendorsApi();

        if(response) {
          dispatch(setVendor(response));
        };
      } catch (error) {
        console.log(error);
      };
    };

    fetchVendorData();
  },[]);

  // Manage openings 
  const handleOpeningToggle = async (vendorId: string, isOpen: boolean) => {
    try {
      const response = await manageOpening(vendorId, isOpen);

      if(response) {
         dispatch(updateVendorOpen({ vendorId, isOpen }));
      }
    } catch (error) {
      console.log(error);
    };
  };

  // Manage category
  const handleCategoryChange = async (vendorId: string, category: string) => {
    try {
      const response = await changeCategory(vendorId, category);
      console.log(response);
      if(response) {
        dispatch(updateVendorCategory({ vendorId, category }));
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#3CAE06]">Vendors</h1>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search vendors..."
                className="w-60"
              />
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal size={18} />
                View
              </Button>
              <Button
                variant="default"
                className="bg-[#3CAE06] text-white flex items-center gap-2 hover:bg-[#36A205]"
              >
                <Plus size={18} />
                Add New Vendor
              </Button>
            </div>
          </div>
          <div className="mt-8">
            <VendorTable vendors={vendors} onToggleOpen={handleOpeningToggle} onChangeCategory={handleCategoryChange} />
          </div>
        </div>
      </main>
    </div>
  );
};
