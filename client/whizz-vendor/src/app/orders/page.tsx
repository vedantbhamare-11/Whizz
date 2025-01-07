"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import OrderCard from "@/components/OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Helper function to format status names
const formatStatusName = (status: string) => {
  return status
    .replace(/([A-Z])/g, " $1") // Add a space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

// Map status to dot color
const statusDotColor: Record<string, string> = {
  orderQueue: "bg-red-600",
  inProgress: "bg-yellow-600",
  readyForPickup: "bg-green-400",
  outForDelivery: "bg-green-700",
};

export default function Orders() {
  const orders = useSelector((state: RootState) => state.orders.orders);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">
          <div className="flex flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3CAE06]">Orders</h1>
            <Tabs defaultValue="currentOrders">
              <TabsList>
                <TabsTrigger value="currentOrders">Current Orders</TabsTrigger>
                <TabsTrigger value="deliveredOrders">
                  Delivered Orders
                </TabsTrigger>
                <TabsTrigger value="rejectedOrders">
                  Rejected Orders
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Tabs defaultValue="currentOrders" className="w-full">
            <TabsContent value="currentOrders">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {Object.keys(orders).map((status, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-2 bg-[#F5F4F4] rounded-sm shadow-md h-[750px] overflow-y-auto"
                  >
                    <Badge className="flex items-center rounded-full w-fit gap-2 bg-white text-black">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          statusDotColor[status] || "bg-gray-400"
                        }`}
                      ></span>
                      {formatStatusName(status)}
                    </Badge>
                    <div className="mt-2 space-y-4">
                      {orders[status as keyof typeof orders].map(
                        (order, index) => (
                          <OrderCard
                            key={index}
                            orderId={order.orderId}
                            timeAgo={order.timeAgo}
                            dishes={order.dishes}
                            status={order.status}
                            agentInfo={order.agentInfo}
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="deliveredOrders">
              <h2 className="text-2xl font-bold">Delivered Orders</h2>
            </TabsContent>

            <TabsContent value="rejectedOrders">
              <h2 className="text-2xl font-bold">Rejected Orders</h2>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
