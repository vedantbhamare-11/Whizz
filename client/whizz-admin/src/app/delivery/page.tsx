"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SlidersHorizontal, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DeliveryTable from "@/components/DeliveryTable";

export default function DeliveryPage() {
  const personnel = useSelector((state: RootState) => state.delivery.personnel);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#3CAE06]">Delivery</h1>
            <div className="flex items-center gap-4">
              <Input placeholder="Search personnel..." className="w-60" />
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal size={18} />
                View
              </Button>
              <Button
                variant="default"
                className="bg-[#3CAE06] text-white flex items-center gap-2 hover:bg-[#36A205]"
              >
                <Plus size={18} />
                Add Delivery Personnel
              </Button>
            </div>
          </div>
          <div className="mt-8">
            <DeliveryTable personnel={personnel} />
          </div>
        </div>
      </main>
    </div>
  );
}
