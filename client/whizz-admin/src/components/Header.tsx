"use client";

import { Switch } from "@/components/ui/switch";
import { HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="p-2 bg-[#fff] border-b border-[#e5e7eb] flex justify-end items-center gap-4 fixed z-40 top-0 left-0 right-0">
      {/* Help Icon */}
      <button className="p-2 rounded-md hover:bg-gray-100">
        <HelpCircle size={24} className="text-gray-600" />
      </button>
    </header>
  );
}
