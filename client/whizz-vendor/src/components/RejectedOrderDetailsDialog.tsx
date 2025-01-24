"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RejectedOrder } from "@/redux/rejectedOrderSlice";

interface RejectedOrderDetailsDialogProps {
  order: RejectedOrder;
}

export default function RejectedOrderDetailsDialog({
  order,
}: RejectedOrderDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{order.orderId}</h3>
          </div>
          <div className="border-b my-4"></div>
          <div className="space-y-4">
            {order.dishes.map((dish, index) => (
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
          <div className="mt-4 space-y-2">
            <p className="text-md text-black font-semibold">Rejection Reason</p>
            <p className="text-sm text-gray-500">{order.rejectionReason}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
