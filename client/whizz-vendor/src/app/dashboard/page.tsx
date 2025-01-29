"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import  RestaurantStatusModal  from "@/components/RestaurantStatusModal";
import { Card } from "@/components/ui/card";
import { NotepadText, ChartNoAxesCombined, LayoutList } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboardSlice";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";


export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { todayOrders, revenue, activeMenuItems, status, error } = useSelector(
    (state: RootState) => state.dashboard
  );
  const vendor = useSelector((state: RootState) => state.vendor.vendor);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, status]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          <h1 className="text-3xl font-bold text-[#3CAE06]">Dashboard</h1>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <Card className="relative p-6">
              <div className="absolute top-4 right-4">
                <NotepadText size={18} />
              </div>
              <h2 className="text-lg font-semibold">Today&#39;s Orders</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">
                {status === "loading" ? <PulseLoader color="#3CAE06" size={8} /> : todayOrders}
              </p>
            </Card>
            <Card className="relative p-6">
              <div className="absolute top-4 right-4">
                <ChartNoAxesCombined size={18} />
              </div>
              <h2 className="text-lg font-semibold">Revenue</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">
                {status === "loading" ? <PulseLoader color="#3CAE06" size={8} /> : `₹${revenue}`}
              </p>
            </Card>
            <Card className="relative p-6">
              <div className="absolute top-4 right-4">
                <LayoutList size={18} />
              </div>
              <h2 className="text-lg font-semibold">Active Menu Items</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">
                {status === "loading" ? <PulseLoader color="#3CAE06" size={8} /> : activeMenuItems }
              </p>
            </Card>
          </div>
          {status === "failed" && (
            <p className="text-red-500 mt-4">{error}</p>
          )}
          <RestaurantStatusModal isOpen={vendor.isOpen} />
        </div>
      </main>
    </div>
  );
}
