"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import VendorTable from "@/components/VendorTable"; // Import the new table component
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, Plus } from "lucide-react";
import { useState } from "react";

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const vendors = useSelector((state: RootState) => state.vendors.vendors);

  // Filter vendors based on search query
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
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
            <VendorTable vendors={filteredVendors} /> {/* Pass filtered vendors */}
          </div>
        </div>
      </main>
    </div>
  );
}
