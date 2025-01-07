"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import OrderCard from "@/components/OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Orders() {
  // Sample data for orders
  const ordersData = {
    queue: [
      {
        orderId: "Order #101",
        timeAgo: "5 min ago",
        dishes: [
          { name: "Zahoor Special Biriyani", price: 200, quantity: 2 },
          { name: "Paneer Butter Masala", price: 250, quantity: 1 },
        ],
      },
    ],
    inProgress: [
      {
        orderId: "Order #102",
        timeAgo: "10 min ago",
        dishes: [
          { name: "Chicken Tikka", price: 300, quantity: 1 },
          { name: "Butter Naan", price: 50, quantity: 3 },
        ],
      },
    ],
    readyForPickup: [
      {
        orderId: "Order #103",
        timeAgo: "15 min ago",
        dishes: [
          { name: "Tandoori Roti", price: 40, quantity: 5 },
          { name: "Veg Fried Rice", price: 180, quantity: 1 },
        ],
      },
    ],
    outForDelivery: [
      {
        orderId: "Order #104",
        timeAgo: "20 min ago",
        dishes: [
          { name: "Mutton Rogan Josh", price: 350, quantity: 1 },
          { name: "Garlic Naan", price: 60, quantity: 2 },
        ],
        agentInfo: {
          name: "John Doe",
          phone: "+1234567890",
          profilePic: "https://via.placeholder.com/40", // Replace with actual path
        },
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">
          {/* Tabs Header */}
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

          {/* Tabs Content */}
          <Tabs defaultValue="currentOrders" className="w-full">
            <TabsContent value="currentOrders">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {/* Order Queue */}
                <div className="flex flex-col p-2 bg-[#F5F4F4] rounded-sm shadow-md h-[750px] overflow-y-auto">
                  <Badge className="flex items-center rounded-full w-fit gap-2 bg-white text-black">
                    <span className="w-2 h-2 text-sm bg-red-600 rounded-full"></span>
                    Order Queue
                  </Badge>
                  <div className="mt-2 space-y-4">
                    {ordersData.queue.map((order, index) => (
                      <OrderCard
                        key={index}
                        orderId={order.orderId}
                        timeAgo={order.timeAgo}
                        dishes={order.dishes}
                        status="orderQueue"
                      />
                    ))}
                  </div>
                </div>

                {/* In Progress */}
                <div className="p-2 bg-[#F5F4F4] rounded-sm shadow-md h-[750px] overflow-y-auto">
                  <Badge className="flex items-center rounded-full w-fit gap-2 bg-white text-black">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                    In Progress
                  </Badge>
                  <div className="mt-2 space-y-4">
                    {ordersData.inProgress.map((order, index) => (
                      <OrderCard
                        key={index}
                        orderId={order.orderId}
                        timeAgo={order.timeAgo}
                        dishes={order.dishes}
                        status="inProgress"
                      />
                    ))}
                  </div>
                </div>

                {/* Ready for Pick Up */}
                <div className="p-2 bg-[#F5F4F4] rounded-sm shadow-md h-[750px] overflow-y-auto">
                  <Badge className="flex items-center rounded-full w-fit gap-2 bg-white text-black">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Ready for Pick Up
                  </Badge>
                  <div className="mt-2 space-y-4">
                    {ordersData.readyForPickup.map((order, index) => (
                      <OrderCard
                        key={index}
                        orderId={order.orderId}
                        timeAgo={order.timeAgo}
                        dishes={order.dishes}
                        status="readyForPickup"
                      />
                    ))}
                  </div>
                </div>

                {/* Out for Delivery */}
                <div className="p-2 bg-[#F5F4F4] rounded-sm shadow-md h-[750px] overflow-y-auto">
                  <Badge className="flex items-center rounded-full w-fit gap-2 bg-white text-black">
                    <span className="w-2 h-2 bg-green-700 rounded-full"></span>
                    Out for Delivery
                  </Badge>
                  <div className="mt-2 space-y-4">
                    {ordersData.outForDelivery.map((order, index) => (
                      <OrderCard
                        key={index}
                        orderId={order.orderId}
                        timeAgo={order.timeAgo}
                        dishes={order.dishes}
                        status="outForDelivery"
                        agentInfo={order.agentInfo} // Pass the agent info
                      />
                    ))}
                  </div>
                </div>
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


