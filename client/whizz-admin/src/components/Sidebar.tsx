'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <aside
      className="flex h-screen bordder border-r-black bg-gray-100 w-48 flex-col items-start py-6 "
    >
      <div className="flex items-center justify-center w-full">
      <h1 className="text-2xl font-semibold">
        Whizz
      </h1>
      </div>
      
      <nav className="w-full mt-6 flex flex-col justify-center">
        <ul className="space-y-4 p-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`w-full flex items-center justify-center block py-4 rounded-md  font-medium ${
                  pathname === link.href
                    ? "bg-[#333] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
