"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <header className="p-2 h-16 bg-[#fff] border-b border-[#e5e7eb] flex justify-end items-center gap-4 fixed z-40 top-0 left-0 right-0">
      {/* ShadCN Switch Component */}
      <div className="flex items-center gap-2">
        <span>Restaurant{" "}{isActive ? "Active" : "Inactive"}</span>
        <Switch
          checked={isActive}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-[#3CAE06] mr-12"
        />
      </div>
    </header>
  );
}
