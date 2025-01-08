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
import { Switch } from "@/components/ui/switch";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { on } from "events";

interface MenuItem {
  _id: string;
  image: string;
  dishName: string;
  price: number;
  category: string;
  subcategory: string;
  isAvailable: boolean;
}

interface MenuTableProps {
  menuItems: MenuItem[];
  onToggleAvailability: (id: string, isAvailable: boolean) => void;
  onChangeCategory: (id: string, category: string) => void;
}

export default function MenuTable({ menuItems, onToggleAvailability, onChangeCategory }: MenuTableProps) {
  return (
    <Table>
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
          <TableRow key={item._id}>
            <TableCell>
              <Image
                src={item.image ? item.image : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI1fHx8ZW58MHx8fHx8"}
                alt={item.dishName}
                width={50}
                height={50}
                className="rounded-md"
              />
            </TableCell>
            <TableCell className="font-medium">{item.dishName}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
              <Select defaultValue={item.category} onValueChange={(value) => onChangeCategory(item._id, value)}>
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
              <Select defaultValue={item.subcategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Sub-Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Course">Main Course</SelectItem>
                  <SelectItem value="Rice">Rice</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Switch
                defaultChecked={item.isAvailable}
                onCheckedChange={(checked) => onToggleAvailability(item._id, checked)}
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
