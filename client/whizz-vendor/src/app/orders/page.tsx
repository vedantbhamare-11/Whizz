"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import OrderCard from "@/components/OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";

// Helper function to format status names
const formatStatusName = (status: string) => {
  return status
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
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
  const [activeTab, setActiveTab] = useState("currentOrders");

  // Sample data for delivered orders
  const deliveredOrders = [
    {
      orderId: 101,
      deliveryTime: "10:30 AM",
      deliveredBy: "John Doe",
    },
    {
      orderId: 102,
      deliveryTime: "12:45 PM",
      deliveredBy: "Jane Smith",
    },
    {
      orderId: 103,
      deliveryTime: "2:15 PM",
      deliveredBy: "Alice Johnson",
    },
  ];

  const heading =
    activeTab === "currentOrders"
      ? "Current Orders"
      : activeTab === "deliveredOrders"
      ? "Delivered Orders"
      : "Rejected Orders";

      const rejectedOrders = [
        {
          orderId: 201,
          note: "Item not available",
        },
        {
          orderId: 202,
          note: "Delivery not possible to the location",
        },
        {
          orderId: 203,
          note: "Vendor canceled due to rush hours",
        },
      ];
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          <div className="flex flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3CAE06]">{heading}</h1>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value)}
            >
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

          <Tabs value={activeTab} className="w-full">
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

            <TabsContent value="deliveredOrders" className="border border-gray-200 rounded-md">
              <Table className="mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Order Details</TableHead>
                    <TableHead>Delivery Time</TableHead>
                    <TableHead>Delivered By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveredOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                      <TableCell>{order.deliveryTime}</TableCell>
                      <TableCell>{order.deliveredBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="rejectedOrders" className="border border-gray-200 rounded-md">
            <Table className="mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Order Details</TableHead>
                    <TableHead>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejectedOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                      <TableCell>{order.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
