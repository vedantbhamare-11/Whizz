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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreVertical, Plus, SlidersHorizontal } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateVendor } from "@/redux/vendorSlice";
import Image from "next/image";

export default function VendorsPage() {
  const dispatch = useDispatch();
  const vendors = useSelector((state: RootState) => state.vendors.vendors);

  const handleCategoryChange = (id: number, newCategory: string) => {
    const vendor = vendors.find((vendor) => vendor.id === id);
    if (vendor) {
      dispatch(updateVendor({ ...vendor, category: newCategory }));
    }
  };

  const handleStatusChange = (id: number, status: boolean) => {
    const vendor = vendors.find((vendor) => vendor.id === id);
    if (vendor) {
      dispatch(updateVendor({ ...vendor, status }));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 ml-48 mt-16">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#3CAE06]">Vendors</h1>
            <div className="flex items-center gap-4">
              <Input placeholder="Search vendors..." className="w-60" />
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal size={18} />
                View
              </Button>
              <Button
                variant="default"
                className="bg-[#3CAE06] text-white flex items-center gap-2 hover:bg-[#36A205]"
              >
                <Plus size={18} />
                Add New Vendor
              </Button>
            </div>
          </div>
          <div className="mt-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Restaurant Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Dishes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <Image
                        src={vendor.logo}
                        alt={vendor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.location}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={vendor.category}
                        onValueChange={(value) =>
                          handleCategoryChange(vendor.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Veg">
                            <div className="flex items-center gap-2">
                              <Image
                                src="./veg.png"
                                alt="Veg"
                                className="w-4 h-4"
                              />
                              Veg
                            </div>
                          </SelectItem>
                          <SelectItem value="Non-Veg">
                            <div className="flex items-center gap-2">
                              <Image
                                src="./non-veg.png"
                                alt="Non-Veg"
                                className="w-4 h-4"
                              />
                              Non-Veg
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{vendor.dishes}</TableCell>
                    <TableCell>
                      <Switch
                        checked={vendor.status}
                        onCheckedChange={(checked) =>
                          handleStatusChange(vendor.id, checked)
                        }
                        className="data-[state=checked]:bg-[#3CAE06]"
                      />
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
