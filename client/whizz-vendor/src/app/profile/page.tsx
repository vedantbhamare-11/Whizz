"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";

export default function Profile() {
  const vendor = useSelector((state: RootState) => state.vendor.vendor);

  console.log(vendor);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          {/* Profile Header */}
          <div className="text-center mb-10">
            <Image
              src={vendor.vendorLogo}
              alt="Restaurant Logo"
              width={150}
              height={150}
              className="rounded-lg mx-auto"
            />
            <div className="flex justify-center items-center gap-4">
            <h1 className="text-3xl font-bold mt-4">{vendor.vendorName}</h1>
            <Badge className="flex items-center justify-center bg-[#3CAE06] text-white text-sm rounded-full mt-4">
              {vendor.restaurantType}
            </Badge>
            </div>
            
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Contact Info */}
            <Card className="p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Address:</span> {vendor.address}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Phone:</span> {vendor.vendorPhone}
              </p>
            </Card>

            {/* Availability Info */}
            <Card className="p-6 shadow-md ">
              <h2 className="text-lg font-semibold mb-4">Availability</h2>
              <div className="flex flex-row gap-8 justify-around">
              <div>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Opens At:</span> {vendor.startTime}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Closes At:</span> {vendor.endTime}
              </p>
              </div>
              <div>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Days Available:</span>
              </p>
              <ul className="list-disc ml-5 text-gray-600">
                {vendor.availableDays.map((day, index) => (
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
