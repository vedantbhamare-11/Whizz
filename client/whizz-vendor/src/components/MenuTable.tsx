"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import MenuTablePopover from "@/components/MenuTablePopover";
import MenuItemDetailsModal from "@/components/MenuItemDetailsModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubcategory } from "@/app/API/menu";
import { addNewSubcategory } from "@/redux/menuSlice";



export interface MenuItem {
  _id: string;
  image: File | null;
  dishName: string;
  price: number;
  category: string;
  subcategory: string;
  isAvailable: boolean;
  description?: string;
  startTime?: string;
  endTime?: string;
  availableDays?: string[];
}

interface MenuTableProps {
  menuItems: MenuItem[];
  onToggleAvailability: (id: string, isAvailable: boolean) => void;
  onChangeCategory: (id: string, category: string) => void;
  onChangeSubcategory: (id: string, subcategory: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: MenuItem) => void;
  onShowDetails: (id: string) => void;
}

export default function MenuTable({ menuItems, onToggleAvailability, onChangeCategory, onChangeSubcategory, onEdit, onDelete}: MenuTableProps) {
  const dispatch = useDispatch();

  const vendorSubcategories = useSelector((state: any) => state.menu.subcategories);

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [subCategories, setSubCategories] = useState<string[]>([
    "Main Course",
    "Rice",
    "Dessert",
  ]);

  useEffect(() => {
    const extractedSubcategories = vendorSubcategories.map(
      (item: { subcategory: string }) => item.subcategory
    );
  
    setSubCategories((prev) =>
      Array.from(new Set([...prev, ...extractedSubcategories]))
    );
  }, [vendorSubcategories]);
  
  const handleShowDetails = (id: string) => {
    const item = menuItems.find((menuItem) => menuItem._id === id);
    if (item) setSelectedItem(item);
  };

  const handleCloseModal = () => setSelectedItem(null);

  const addCustomSubCategory = async (value: string) => {
    if (value && !subCategories.includes(value)) {
      const response = await addSubcategory(value);
      if (response) {
        dispatch(addNewSubcategory(value  ));
        setSubCategories((prev) => [...prev, value]);
      }
    }
  };

  return (
    <>
    <Table className="w-full z-0">
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sub-Category</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menuItems.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <Image
                src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image || '/placeholder.png'}
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
                  <SelectItem value="VEG">
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
                  <SelectItem value="NON-VEG">
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
                <Select defaultValue={item.subcategory} onValueChange={(value) => onChangeSubcategory(item._id, value)}>
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
              <TableCell>{item.startTime || "Not Set"}</TableCell>
              <TableCell>{item.endTime || "Not Set"}</TableCell>
              <TableCell>
                <Switch
                  defaultChecked={item.isAvailable}
                  onCheckedChange={(checked) => onToggleAvailability(item._id, checked)}
                  className="data-[state=checked]:bg-[#3CAE06]"
                />
              </TableCell>
              <TableCell>
                <MenuTablePopover
                  menuItem={item}
                  itemId={item._id}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onShowDetails={handleShowDetails}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedItem && (
        <MenuItemDetailsModal
          menuItem={selectedItem}
          onClose={handleCloseModal}
        />
      )}
      </>
  );
}
