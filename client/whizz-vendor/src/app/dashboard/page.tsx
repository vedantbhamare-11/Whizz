"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { NotepadText, ChartNoAxesCombined, LayoutList } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#3CAE06]">Dashboard</h1>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Card 1 */}
            <Card className="relative p-6">
              <div className="absolute top-4 right-4 ">
                <NotepadText size={18} />
              </div>
              <h2 className="text-lg font-semibold">Today&#39;s Orders</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">224</p>
            </Card>
            {/* Card 2 */}
            <Card className="relative p-6">
              <div className="absolute top-4 right-4 ">
                <ChartNoAxesCombined size={18} />
              </div>
              <h2 className="text-lg font-semibold">Revenue</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">$6810</p>
            </Card>
            {/* Card 3 */}
            <Card className="relative p-6">
              <div className="absolute top-4 right-4 ">
                <LayoutList size={18} />
              </div>
              <h2 className="text-lg font-semibold">Active Menu Items</h2>
              <p className="text-4xl font-bold mt-4 text-[#3CAE06]">110</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
