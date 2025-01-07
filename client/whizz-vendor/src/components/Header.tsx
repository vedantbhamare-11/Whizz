"use client";

import { Switch } from "@/components/ui/switch";
import { HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="p-2 bg-[#fff] border-b border-[#e5e7eb] flex justify-end items-center gap-4">
      {/* ShadCN Switch Component */}
      <div className="flex items-center gap-2">
        <Switch className="data-[state=checked]:bg-[#3CAE06]" />
      </div>

      {/* Help Icon */}
      <button className="p-2 rounded-md hover:bg-gray-100">
        <HelpCircle size={24} className="text-gray-600" />
      </button>
    </header>
  );
}
