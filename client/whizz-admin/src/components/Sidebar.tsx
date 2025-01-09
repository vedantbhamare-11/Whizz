import Link from "next/link";
import Image from "next/image";
import { ChartLine, NotepadText, Store, User, Bike } from "lucide-react";

export default function Sidebar() {
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
          <Link
            href="/dashboard"
            className="p-2 flex items-center font-semibold gap-3 text-black hover:bg-gray-200 rounded-md"
          >
            <ChartLine size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/orders"
            className="p-2 flex items-center font-semibold gap-3 text-black hover:bg-gray-200 rounded-md"
          >
            <NotepadText size={20} />
            <span>Orders</span>
          </Link>
          <Link
            href="/vendors"
            className="p-2 flex items-center font-semibold gap-3 text-black hover:bg-gray-200 rounded-md"
          >
            <Store size={20} />
            <span>Vendors</span>
          </Link>
          <Link
            href="/delivery"
            className="p-2 flex items-center font-semibold gap-3 text-black hover:bg-gray-200 rounded-md"
          >
            <Bike size={20} />
            <span>Delivery</span>
          </Link>
        </nav>
      </div>
      <div className="p-4 flex justify-center">
        <Link href="/profile">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-lg hover:bg-gray-400">
            <User size={24} className="text-gray-700" />
          </div>
        </Link>
      </div>
    </aside>
  );
}
