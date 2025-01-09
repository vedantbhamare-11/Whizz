"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";

const mockDeliveryPersonnel = [
  {
    id: 1,
    photo: "https://via.placeholder.com/40", // Dummy image URL
    name: "John Doe",
    employeeId: "WHIZZ001",
    region: "Nungambakkam",
    ordersDelivered: 120,
    status: "On delivery", // Can be "On delivery", "Active", "Inactive"
  },
  {
    id: 2,
    photo: "https://via.placeholder.com/40", // Dummy image URL
    name: "Jane Smith",
    employeeId: "WHIZZ002",
    region: "Anna Nagar",
    ordersDelivered: 95,
    status: "Active",
  },
  {
    id: 3,
    photo: "https://via.placeholder.com/40", // Dummy image URL
    name: "Richard Roe",
    employeeId: "WHIZZ003",
    region: "Anna Nagar",
    ordersDelivered: 60,
    status: "Inactive",
  },
];

const statusVariants: Record<string, string> = {
  "On delivery": "bg-[#FFF1CB] text-[#FDA400]",
  Active: "bg-[#E0FFD1] text-[#3CAE06]",
  Inactive: "bg-[#FFE3E3] text-[#DC2626]",

};

export default function DeliveryPage() {
  const [personnel] = useState(mockDeliveryPersonnel);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#3CAE06]">Delivery</h1>
            <div className="flex items-center gap-4">
              <Input placeholder="Search personnel..." className="w-60" />
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal size={18} />
                View
              </Button>
              <Button
                variant="default"
                className="bg-[#3CAE06] text-white flex items-center gap-2 hover:bg-[#36A205]"
              >
                <Plus size={18} />
                Add Delivery Personnel
              </Button>
            </div>
          </div>
          <div className="mt-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Orders Delivered</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personnel.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <Image
                        src={person.photo}
                        alt={person.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>{person.employeeId}</TableCell>
                    <TableCell>{person.region}</TableCell>
                    <TableCell>{person.ordersDelivered}</TableCell>
                    <TableCell>
                      <Badge className={statusVariants[person.status] } >
                        {person.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost">
                        <MoreVertical size={20} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
