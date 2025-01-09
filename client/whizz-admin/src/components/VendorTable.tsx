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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { Vendor } from "@/redux/vendorSlice"; // Assuming this type is defined
import { useDispatch } from "react-redux";
import { updateVendor } from "@/redux/vendorSlice";

interface VendorTableProps {
  vendors: Vendor[];
  onToggleOpen: ( vendorId: string, isOpen: boolean) => void;
}

const VendorTable: React.FC<VendorTableProps> = ({ vendors, onToggleOpen }) => {

  // const handleCategoryChange = (id: string, newCategory: string) => {
  //   const vendor = vendors.find((vendor) => vendor._id === id);
  //   if (vendor) {
  //     dispatch(updateVendor({ ...vendor, restaurantType: newCategory }));
  //   }
  // };


  return (
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
          <TableRow key={vendor._id}>
            <TableCell>
              <Image
                src={vendor.logo || "https://via.placeholder.com/40"}
                alt={vendor.vendorName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{vendor.vendorName}</TableCell>
            <TableCell>{vendor.area}</TableCell>
            <TableCell>
              <Select
                defaultValue={vendor.restaurantType}
                // onValueChange={(value) => handleCategoryChange(vendor._id, value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Veg">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/veg.png"
                        alt="Veg"
                        className="w-4 h-4"
                        width={20}
                        height={20}
                      />
                      Veg
                    </div>
                  </SelectItem>
                  <SelectItem value="Non-Veg">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/non-veg.png"
                        alt="Non-Veg"
                        width={20}
                        height={20}
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
                checked={vendor.isOpen}
                onCheckedChange={(checked) =>
                  onToggleOpen(vendor._id, checked)
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
  );
};

export default VendorTable;
