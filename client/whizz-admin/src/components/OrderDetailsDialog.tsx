"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Dish {
  dishName: string;
  quantity: number;
  price: number;
}

interface OrderDetailsDialogProps {
  orderId: string;
  vendorName: string;
  vendorLocation: string;
  dishes: Dish[];
  totalPrice: number;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  orderId,
  vendorName,
  vendorLocation,
  dishes,
  totalPrice,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order ID: {orderId}</DialogTitle>
          <DialogDescription>
            Vendor: {vendorName} ({vendorLocation})
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <h2 className="text-lg font-bold">Dishes Ordered</h2>
          <ul className="space-y-2">
            {dishes.map((dish, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2 border-gray-200"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{dish.dishName}</span>
                  <span className="text-sm text-gray-500">₹{dish.price}</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md">
                    {dish.quantity}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 text-lg font-semibold">
            <span>Total Price</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
