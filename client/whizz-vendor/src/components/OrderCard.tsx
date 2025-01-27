"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Check, ShoppingBag } from "lucide-react";
import Image from "next/image";

const CustomSeparator = () => {
  return <div className="w-63 -mx-3 h-[1px] bg-gray-300"></div>;
};

interface Dish {
  name: string;
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
  status: "orderQueue" | "inProgress" | "readyForPickup" | "outForDelivery";
  agentInfo?: DeliveryAgent; // Optional for 'outForDelivery'
}

export default function OrderCard({
  orderId,
  timeAgo,
  dishes,
  status,
  agentInfo,
}: OrderCardProps) {
  // State for dialog visibility and rejection reason
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Calculate total price
  const totalPrice = dishes.reduce(
    (total, dish) => total + dish.price * dish.quantity,
    0
  );

  const handleReject = () => {
    console.log(`Order ${orderId} rejected for reason: ${rejectionReason}`);
    setIsDialogOpen(false); // Close the dialog
  };

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
              <p className="text-base text-black">{dish.name}</p>
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
            onClick={() => setIsDialogOpen(true)}
          >
            <X size={16} />
            Reject
          </Button>
          <Button
            variant="default"
            className="flex items-center gap-2 bg-[#3CAE06] text-white hover:bg-green-600"
          >
            <Check size={16} />
            Accept
          </Button>
        </div>
      )}

      {/* Button for In Progress */}
      {status === "inProgress" && (
        <div className="mt-4">
          <Button className="flex w-full items-center gap-2 bg-[#3CAE06] text-white hover:bg-[#32c207]">
            <ShoppingBag size={16} />
            Ready to Pickup
          </Button>
        </div>
      )}

      {/* Out for Delivery Section */}
      {status === "outForDelivery" && agentInfo && (
        <div className="mt-4 space-y-2">
          <p className="text-md text-black font-semibold">Order picked by</p>
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <Image
              src={agentInfo.profilePic}
              alt={agentInfo.name}
              width={100}
              height={100}
              className="rounded-full border border-gray-300 w-10 h-10"
            />
            {/* Agent Details */}
            <div>
              <p className="text-md font-semibold">{agentInfo.name}</p>
              <p className="text-sm text-gray-500">{agentInfo.phone}</p>
            </div>
          </div>
        </div>
      )}

      {/* Reject Order Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reason for Order Rejection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <textarea
              placeholder="Enter the reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={3} // Default number of rows
              className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2  focus:border-transparent"
              style={{ overflow: "hidden" }} // Prevent scrollbar
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto"; // Reset height
                target.style.height = `${target.scrollHeight}px`; // Set new height
              }}
            />
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="w-1/2 bg-[#FF2C2C] text-white hover:bg-red-600"
                onClick={handleReject}
              >
                Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
