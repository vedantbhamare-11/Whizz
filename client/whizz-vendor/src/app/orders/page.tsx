"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import DeliveredOrderDetailsDialog from "@/components/DeliveredOrderDetailsDialog";
import OrderCard from "@/components/OrderCard";
import RejectedOrderDetailsDialog from "@/components/RejectedOrderDetailsDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { fetchOrdersApi, updateOrder } from "../API/order";
import { setOrders, updateOrderStatus } from "@/redux/orderSlice";
import { convertTime } from "@/lib/convertTime";

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

  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.orders.orders);

  const [activeTab, setActiveTab] = useState("currentOrders");
  const [orderQueue, setOrderQueue] = useState(orders.orderQueue);
  const [inProgress, setInProgress] = useState(orders.inProgress);
  const [readyForPickup, setReadyForPickup] = useState(orders.readyForPickup);
  const [outForDelivery, setOutForDelivery] = useState(orders.outForDelivery);
  const [delivered, setDelivered] = useState(orders.delivered);
  const [rejected, setRejected] = useState(orders.rejected);

  const heading =
    activeTab === "currentOrders"
      ? "Current Orders"
      : activeTab === "deliveredOrders"
        ? "Delivered Orders"
        : "Rejected Orders";

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const order = await fetchOrdersApi();

        if (orders) {

          // Add timeAgo property
          const orderTimeUpdated = order.map((order: any) => ({
            ...order,
            timeAgo: convertTime(order.updatedAt)
          }))

          // Filter orders by status
          const orderQueue = orderTimeUpdated.filter((order: any) => order.status === "orderQueue");
          const inProgress = orderTimeUpdated.filter((order: any) => order.status === "inProgress");
          const readyForPickup = orderTimeUpdated.filter((order: any) => order.status === "readyForPickup");
          const outForDelivery = orderTimeUpdated.filter((order: any) => order.status === "outForDelivery");
          const delivered = orderTimeUpdated.filter((order: any) => order.status === "delivered");
          const rejected = orderTimeUpdated.filter((order: any) => order.status === "rejected");

          setOrderQueue(orderQueue);
          setInProgress(inProgress);
          setReadyForPickup(readyForPickup);
          setOutForDelivery(outForDelivery);
          setDelivered(delivered);
          setRejected(rejected);

          const orderData = {
            orderQueue,
            inProgress,
            readyForPickup,
            outForDelivery,
            delivered,
            rejected
          };

          dispatch(setOrders(orderData));
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders();
  }, []);

  // Handle accepting order logic here
  const handleOrderStatus = async (orderId: string, newStatus: any) => {

    try {
      const response = await updateOrder(orderId, newStatus);

      dispatch(updateOrderStatus({ orderId, newStatus }));
      if (newStatus === "rejected") {
        setRejected([...rejected, response]);
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
                {Object.keys(orders).filter((status) => status !== 'delivered' && status !== 'rejected').map((status, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-2 bg-[#F5F4F4] rounded-sm shadow-md h-screen overflow-y-auto"
                  >
                    <Badge className="flex items-center rounded-full w-fit gap-2 bg-white text-black">
                      <span
                        className={`w-2 h-2 rounded-full ${statusDotColor[status] || "bg-gray-400"
                          }`}
                      ></span>
                      {formatStatusName(status)}
                    </Badge>
                    <div className="mt-2 space-y-4">
                      {orders[status as keyof typeof orders]?.map(
                        (order, index) => (
                          <OrderCard
                            key={index}
                            orderId={order.whizzOrderId}
                            timeAgo={order.timeAgo ?? ""}
                            dishes={order.dishes}
                            status={order.status}
                            agentInfo={order.agentInfo}
                            onStatusChange={handleOrderStatus}
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="deliveredOrders"
              className="border border-gray-200 rounded-md"
            >
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
                  {delivered?.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.whizzOrderId}</TableCell>
                      <TableCell>
                        <DeliveredOrderDetailsDialog order={order} />
                      </TableCell>
                      <TableCell>{order.timeAgo}</TableCell>
                      <TableCell>{order.agentInfo?.name || "Agent"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent
              value="rejectedOrders"
              className="border border-gray-200 rounded-md"
            >
              {/* Rejected Orders */}
              <Table className="mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Order Details</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejected.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.whizzOrderId}</TableCell>
                      <TableCell>
                        <RejectedOrderDetailsDialog order={order} />
                      </TableCell>
                      <TableCell>{order.rejectedReason}</TableCell>
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
