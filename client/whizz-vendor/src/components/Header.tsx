"use client";

import { Switch } from "@/components/ui/switch";
import { HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="p-2 h-16 bg-[#fff] border-b border-[#e5e7eb] flex justify-end items-center gap-4 fixed z-40 top-0 left-0 right-0">
      {/* ShadCN Switch Component */}
      <div className="flex items-center gap-2">
        <Switch className="data-[state=checked]:bg-[#3CAE06]" />
      </div>

     
    </header>
  );
}
