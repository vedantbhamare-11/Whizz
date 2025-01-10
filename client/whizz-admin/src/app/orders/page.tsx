"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { assignDeliveryPersonnel } from "@/redux/orderSlice";
import OrderTable from "@/components/OrderTable";
import { useState } from "react";

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.orders.orders); // Use Redux state
  const vendors = useSelector((state: RootState) => state.vendors.vendors);
  const deliveryPersonnel = useSelector(
    (state: RootState) => state.delivery.personnel
  );

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const handleAssign = (id: number, personnel: string) => {
    dispatch(assignDeliveryPersonnel({ orderId: id, personnel })); // Update Redux state
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) => {
    const vendorName =
      vendors.find((vendor) => vendor.id === order.vendorId)?.name || "Unknown";

    return (
      order.id.toString().includes(searchQuery) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          {/* Page Heading */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#3CAE06]">Orders</h1>
            <Input
              placeholder="Search orders..."
              className="w-60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="unassigned" className="mt-6">
            <TabsList>
              <TabsTrigger value="unassigned">Unassigned Orders</TabsTrigger>
              <TabsTrigger value="assigned">Assigned Orders</TabsTrigger>
            </TabsList>

            {/* Unassigned Orders */}
            <TabsContent value="unassigned">
              <OrderTable
                orders={filteredOrders.filter(
                  (order) => order.deliveryPersonnel === "Unassigned"
                )}
                vendors={vendors}
                deliveryPersonnel={deliveryPersonnel}
                onAssign={handleAssign}
              />
            </TabsContent>

            {/* Assigned Orders */}
            <TabsContent value="assigned">
              <OrderTable
                orders={filteredOrders.filter(
                  (order) => order.deliveryPersonnel !== "Unassigned"
                )}
                vendors={vendors}
                deliveryPersonnel={deliveryPersonnel}
                onAssign={() => {}}
                isAssignedTab
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
