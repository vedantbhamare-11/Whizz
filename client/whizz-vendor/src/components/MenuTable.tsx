"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MenuItem {
  id: number;
  image: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  available: boolean;
}

interface MenuTableProps {
  menuItems: MenuItem[];
}

export default function MenuTable({ menuItems }: MenuTableProps) {
  const [subCategories, setSubCategories] = useState<string[]>(["Main Course", "Rice", "Dessert"]);

  const addCustomSubCategory = (value: string) => {
    if (value && !subCategories.includes(value)) {
      setSubCategories((prev) => [...prev, value]);
    }
  };

  return (
    <Table className="w-full z-0">
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sub-Category</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menuItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-md"
              />
            </TableCell>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
              <Select defaultValue={item.category}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Veg">
                    <span className="flex items-center gap-2">
                      <Image
                        src="/veg.png"
                        alt="Veg"
                        width={20}
                        height={20}
                      />
                      Veg
                    </span>
                  </SelectItem>
                  <SelectItem value="Non-Veg">
                    <span className="flex items-center gap-2">
                      <Image
                        src="/non-veg.png"
                        alt="Non-Veg"
                        width={20}
                        height={20}
                      />
                      Non-Veg
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Select defaultValue={item.subCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Sub-Category" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map((subCategory, index) => (
                    <SelectItem key={index} value={subCategory}>
                      {subCategory}
                    </SelectItem>
                  ))}
                  <div className="p-2 border-t border-gray-200">
                    <Input
                      placeholder="Add sub-category"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addCustomSubCategory(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                      className="text-sm"
                    />
                  </div>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Switch
                defaultChecked={item.available}
                className="data-[state=checked]:bg-[#3CAE06]"
              />
            </TableCell>
            <TableCell>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <MoreVertical size={16} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
