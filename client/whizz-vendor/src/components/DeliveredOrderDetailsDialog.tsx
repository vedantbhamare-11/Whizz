"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Order } from "@/redux/orderSlice";

interface DeliveredOrderDetailsDialogProps {
  order: Order;
}

export default function DeliveredOrderDetailsDialog({
  order,
}: DeliveredOrderDetailsDialogProps) {
  const [, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={() => setIsOpen(true)}>
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{order.whizzOrderId}</h3>
            <p className="text-sm text-gray-500">{order.deliveredTime}</p>
          </div>
          <div className="border-b my-4"></div>
          <div className="space-y-4">
            {order.dishes.map((dish, index) => (
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
          <div className="mt-4 space-y-2">
            <p className="text-md text-black font-semibold">Delivered By</p>
            <div className="flex items-center gap-4">
              <Image
                src={order.agentInfo?.profilePic || "/agent.png"}
                alt={order.agentInfo?.name || "Delivery agent"}
                width={100}
                height={100}
                className="rounded-full w-12 h-12 border border-gray-300"
              />
              <div>
                <p className="text-md font-semibold">
                  {order.agentInfo?.name || "Delivery Agent"}
                </p>
                <p className="text-sm text-gray-500">
                  {order.agentInfo?.phone || "+1234567890"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
