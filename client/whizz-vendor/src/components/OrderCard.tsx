"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Check, ShoppingBag } from "lucide-react";
import Image from "next/image";

const CustomSeparator = () => {
  return <div className="w-63 -mx-3 h-[1px] bg-gray-300"></div>;
};

interface Dish {
  dishName: string;
  price: number;
  quantity: number;
}

interface DeliveryAgent {
  name: string;
  phone: string;
  profilePic: string; // Path to the profile picture
}

interface OrderCardProps {
  orderId: string;
  timeAgo: string;
  dishes: Dish[];
  status: "orderQueue" | "inProgress" | "readyForPickup" | "outForDelivery" | "delivered" | "rejected";
  agentInfo?: DeliveryAgent; // Optional for 'outForDelivery',
  onStatusChange: (orderId: string, newStatus: string) => void;
}

export default function OrderCard({
  orderId,
  timeAgo,
  dishes,
  status,
  agentInfo,
  onStatusChange,
}: OrderCardProps) {
  // Calculate total price
  const totalPrice = dishes.reduce(
    (total, dish) => total + dish.price * dish.quantity,
    0
  );

  return (
    <Card className="p-3 space-y-4 rounded-md">
      {/* Order ID and Time */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{orderId}</h3>
        <p className="text-sm text-gray-500">{timeAgo}</p>
      </div>

      {/* Full-Width Separator */}
      <CustomSeparator />

      {/* Dishes */}
      <div className="space-y-4">
        {dishes.map((dish, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="text-base text-black">{dish.dishName}</p>
              <p className="text-sm text-gray-500">Rs {dish.price}</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-md border border-gray-300">
              {dish.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Full-Width Separator */}
      <CustomSeparator />

      {/* Total */}
      <div className="flex justify-between items-center">
        <p className="text-md">Total</p>
        <p className="text-md ">Rs {totalPrice}</p>
      </div>

      {/* Conditionally render the separator */}
      {status !== "readyForPickup" && <CustomSeparator />}

      {/* Buttons for Order Queue */}
      {status === "orderQueue" && (
        <div className="flex items-center justify-around gap-4 mt-4">
          <Button
            variant="destructive"
            className="flex items-center gap-2 bg-[#FF2C2C] text-white hover:bg-red-600"
            onClick={() => onStatusChange(orderId, "rejected")}
          >
            <X size={16} />
            Reject
          </Button>
          <Button
            variant="default"
            className="flex items-center gap-2 bg-[#3CAE06] text-white hover:bg-green-600"
            onClick={() => onStatusChange(orderId, "inProgress")}
          >
            <Check size={16} />
            Accept
          </Button>
        </div>
      )}

      {/* Button for In Progress */}
      {status === "inProgress" && (
        <div className="mt-4">
          <Button
            className="flex w-full items-center gap-2 bg-[#3CAE06] text-white hover:bg-[#32c207]"
            onClick={() => onStatusChange(orderId, "readyForPickup")}
          >
            <ShoppingBag size={16} />
            Ready to Pickup
          </Button>
        </div>
      )}

      {/* Out for Delivery Section */}
      {status === "outForDelivery" &&  (
        <div className="mt-4 space-y-2">
          <p className="text-md text-black font-semibold">Order picked by</p>
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <Image
              src={agentInfo?.profilePic || "/agent.png"}
              alt={agentInfo?.name || "Delivery agent"}
              width={100}
              height={100}
              className="rounded-full border border-gray-300 w-10 h-10"
            />
            {/* Agent Details */}
            <div>
              <p className="text-md font-semibold">{agentInfo?.name || "Whizz Agent" }</p>
              <p className="text-sm text-gray-500">{agentInfo?.phone || "+91 123456789"}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
