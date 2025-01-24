"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          {/* Profile Header */}
          <div className="text-center mb-10">
            <Image
              src={user.logo}
              alt="Restaurant Logo"
              width={150}
              height={150}
              className="rounded-lg mx-auto"
            />
            <div className="flex justify-center items-center gap-4">
            <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
            <Badge className="flex items-center justify-center bg-[#3CAE06] text-white text-sm rounded-full mt-4">
              {user.type}
            </Badge>
            </div>
            
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Contact Info */}
            <Card className="p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Address:</span> {user.address}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Phone:</span> {user.phone}
              </p>
            </Card>

            {/* Availability Info */}
            <Card className="p-6 shadow-md ">
              <h2 className="text-lg font-semibold mb-4">Availability</h2>
              <div className="flex flex-row gap-8 justify-around">
              <div>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Opens At:</span> {user.opensAt}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Closes At:</span> {user.closesAt}
              </p>
              </div>
              <div>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Days Available:</span>
              </p>
              <ul className="list-disc ml-5 text-gray-600">
                {user.daysAvailability.map((day, index) => (
                  <li key={index}>{day}</li>
                ))}
              </ul>
              </div>
              </div>
              
              
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
