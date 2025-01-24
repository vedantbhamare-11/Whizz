"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { MenuItem } from "@/app/menu/page";

interface MenuItemDetailsModalProps {
  menuItem: MenuItem;
  onClose: () => void;
}

export default function MenuItemDetailsModal({
  menuItem,
  onClose,
}: MenuItemDetailsModalProps) {
  return (
    <Dialog open={!!menuItem} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Menu Item Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div>
            <Image
              src={menuItem.image}
              alt={menuItem.name}
              width={200}
              height={200}
              className="rounded-md"
            />
            <h2 className="text-xl font-bold mt-4">{menuItem.name}</h2>
            <p className="text-gray-600 mt-2">{menuItem.description}</p>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <div className="mb-4 flex justify-around">
              <p className="font-bold">Price:</p>
              <p className="text-gray-600">₹{menuItem.price}</p>
            </div>
            <div className="mb-4 flex justify-around">
              <p className="font-bold">Category:</p>
              <p className="text-gray-600">{menuItem.category}</p>
            </div>
            <div className="mb-4 flex justify-around">
              <p className="font-bold">Sub-Category:</p>
              <p className="text-gray-600">{menuItem.subCategory}</p>
            </div>
            <div className="mb-4 flex justify-around">
              <p className="font-bold">Start Time:</p>
              <p className="text-gray-600">{menuItem.startTime || "N/A"}</p>
            </div>
            <div className="flex justify-around">
              <p className="font-bold">End Time:</p>
              <p className="text-gray-600">{menuItem.endTime || "N/A"}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center space-y-4">
            <p className="font-bold">Days Available:</p>
            <ul className="list-disc ml-5 text-gray-600">
              {menuItem.daysAvailable?.length
                ? menuItem.daysAvailable.map((day, index) => (
                    <li key={index}>{day}</li>
                  ))
                : "Not specified"}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
