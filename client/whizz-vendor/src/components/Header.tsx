"use client";

import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";

import { toggleOpeningApi } from "@/app/API/restaurant";
import { RootState } from "@/redux/store";
import { toggleOpening } from "@/redux/vendorSlice";

export default function Header() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.vendor.vendor.isOpen);

// Manage vendor opening
const handleOpening = async (isOpen: boolean) => {
  console.log(isOpen);
  try {
    const response = await toggleOpeningApi(isOpen);
    if (response) {
      dispatch(toggleOpening(isOpen));
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <header className="p-2 h-16 bg-[#fff] border-b border-[#e5e7eb] flex justify-end items-center gap-4 fixed z-40 top-0 left-0 right-0">
      {/* ShadCN Switch Component */}
      <div className="flex items-center gap-2">
        <Switch 
          className="data-[state=checked]:bg-[#3CAE06]" 
          defaultChecked={isOpen}
          onCheckedChange={(checked) => handleOpening(checked)}/>
      </div>
    </header>
  );
}
