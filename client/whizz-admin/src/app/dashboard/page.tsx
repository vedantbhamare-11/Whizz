"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Store, Bike, User, NotepadText } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Dashboard() {
  const { totalVendors, deliveryPersonnel, totalCustomers, activeOrders } =
    useSelector((state: RootState) => state.dashboard);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          <h1 className="text-3xl font-bold text-[#3CAE06]">Dashboard</h1>
          <div className="grid grid-cols-4 gap-6 mt-6">
            <Card className="relative p-6">
              <div className="absolute top-4 right-4">
                <Store size={18} />
              </div>
              <h2 className="text-lg font-semibold">Total Vendors</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">
                {totalVendors}
              </p>
            </Card>
            <Card className="relative p-6">
              <div className="absolute top-4 right-4">
                <Bike size={18} />
              </div>
              <h2 className="text-lg font-semibold">Delivery Personnel</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">
                {deliveryPersonnel}
              </p>
            </Card>
            <Card className="relative p-6">
              <div className="absolute top-4 right-4">
                <User size={18} />
              </div>
              <h2 className="text-lg font-semibold">Total Customers</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">
                {totalCustomers}
              </p>
            </Card>
            <Card className="relative p-6">
              <div className="absolute top-4 right-4">
                <NotepadText size={18} />
              </div>
              <h2 className="text-lg font-semibold">Active Orders</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">
                {activeOrders}
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
