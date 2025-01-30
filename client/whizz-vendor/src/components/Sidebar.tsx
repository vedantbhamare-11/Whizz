"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import usePathname
import { ChartLine, NotepadText, LayoutList, User, LogOut } from "lucide-react";
import { logOutApi } from "@/app/API/auth";
import { useDispatch } from "react-redux";
import { setVendor } from "@/redux/vendorSlice";
import { setStatus } from "@/redux/menuSlice";
import { setDashboardStatus } from "@/redux/dashboardSlice";
import { toast } from "react-toastify";

export default function Sidebar() {
  const pathname = usePathname(); // Get the current path
  const dispatch = useDispatch();

   const handleLogout = async () => {
    try {
        await logOutApi();
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <aside className="flex flex-col justify-between w-48 h-screen bg-gray-100 fixed z-50">
      <div>
        <div className="p-6 flex justify-center">
          <Image
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
        <nav className="flex flex-col space-y-2 gap-4 p-2">
          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className={`p-2 flex items-center font-semibold gap-3 rounded-md ${
              pathname === "/dashboard" ? "bg-[#3CAE06] text-white" : "text-black hover:bg-gray-200"
            }`}
          >
            <ChartLine size={20} />
            <span>Dashboard</span>
          </Link>

          {/* Orders Link */}
          <Link
            href="/orders"
            className={`p-2 flex items-center font-semibold gap-3 rounded-md ${
              pathname === "/orders" ? "bg-[#3CAE06] text-white" : "text-black hover:bg-gray-200"
            }`}
          >
            <NotepadText size={20} />
            <span>Orders</span>
          </Link>

          {/* Menu Link */}
          <Link
            href="/menu"
            className={`p-2 flex items-center font-semibold gap-3 rounded-md ${
              pathname === "/menu" ? "bg-[#3CAE06] text-white" : "text-black hover:bg-gray-200"
            }`}
          >
            <LayoutList size={20} />
            <span>Menu</span>
          </Link>
        </nav>
      </div>
      <div className=" p-2">
        {/* Profile Link */}
        <Link
          href="/profile"
          className={`p-2 mb-2 flex items-center font-semibold gap-3 rounded-md ${
            pathname === "/profile" ? "bg-[#3CAE06] text-white" : "text-black hover:bg-gray-200"
          }`}
        >
          <User size={20} />
          <span>Profile</span>
        </Link>
        {/* Profile Link */}
        <Link
          href="/signin"
          onClick={handleLogout}
          className={"p-2 flex items-center font-semibold gap-3 rounded-md text-black hover:bg-gray-200"}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
