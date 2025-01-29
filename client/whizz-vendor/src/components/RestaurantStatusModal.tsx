"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RestaurantStatusModalProps {
  isOpen: boolean;
}

export default function RestaurantStatusModal({ isOpen }: RestaurantStatusModalProps) {
  const [open, setOpen] = useState(isOpen);

  // Sync `open` state with `isOpen` prop
  useEffect(() => {
    setOpen(isOpen);
  }, []);

  return (
    <Dialog open={!open} onOpenChange={(state) => {
      setOpen(!state); // Update local state
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> ⚠️ You are offline </DialogTitle>
        </DialogHeader>
        <div>
          <div className="mt-4 space-y-2 text-center">
            <p className="text-md text-gray-700  ">{"Currently your restaurant is inactive"}</p>
            <p className="text-md text-gray-700">{"Make sure to activate your restaurant when you are ready"}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
