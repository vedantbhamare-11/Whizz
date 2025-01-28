"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { convertTo24Hour } from "@/lib/convertTime";
import { addSubcategory } from "@/app/API/menu";
import { addNewSubcategory } from "@/redux/menuSlice";

interface MenuItem {
  _id?: string;
  image: File | string | null;
  dishName: string;
  description?: string; // New field
  price: number;
  category: string;
  subcategory: string;
  startTime?: string; // New field
  endTime?: string; // New field
  availableDays?: string[]; // New field
  isAvailable: boolean;
}

interface EditItemModalProps {
  menuItemId: string;
  onSave: (updatedItem: any) => void;
  onClose: () => void;
}

export default function EditItemModal({
  menuItemId,
  onSave,
  onClose,
}: EditItemModalProps) {
  const dispatch = useDispatch();

  const vendorSubcategories = useSelector((state: any) => state.menu.subcategories);
  const menuItems = useSelector((state: RootState) => state.menu.items);
  const [formValues, setFormValues] = useState<MenuItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | string | null>(null);
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


  const addCustomSubCategory = async (value: string) => {
    if (value && !subCategories.includes(value)) {
      const response = await addSubcategory(value);
      if (response) {
        dispatch(addNewSubcategory(value));
        setSubCategories((prev) => [...prev, value]);
      }
    }
  };

  // Fetch the menu item details
  useEffect(() => {
    const menuItem = menuItems.find((item) => item._id === menuItemId);

    if (menuItem) {
      setFormValues({ ...menuItem, startTime: menuItem.startTime && convertTo24Hour(menuItem.startTime), endTime: menuItem.endTime && convertTo24Hour(menuItem.endTime) });
      setSelectedImage(menuItem.image);
    }
  }, [menuItemId, menuItems]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormValues({ ...formValues, image: imageUrl } as MenuItem);
      setSelectedImage(file);
    }
  };

  const toggleDay = (day: string) => {
    setFormValues((prev) =>
      prev
        ? {
          ...prev,
          availableDays: prev.availableDays?.includes(day)
            ? prev.availableDays.filter((d) => d !== day)
            : [...(prev.availableDays || []), day],
        }
        : null
    );
  };

  const handleSaveChanges = () => {
    if (formValues) {
      onSave({ ...formValues, image: selectedImage });
      onClose();
    }
  };

  if (!formValues) {
    return null; // Show nothing until formValues are loaded
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          {/* Image Input */}
          <div>
            <Label htmlFor="image" className="flex flex-col items-center">
              {formValues.image ? (
                <Image
                  src={formValues.image instanceof File ? URL.createObjectURL(formValues.image) : formValues.image}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <div className="w-full space-y-2">
                  <Label className="mb-2">Item Image</Label>
                  <div className="flex flex-row gap-4 items-center w-full h-10 border border-dashed border-gray-300 rounded-md">
                    <CloudUpload className="ml-2 text-gray-500" size={20} />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </div>
                </div>
              )}
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Item Name */}
          <div>
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="dishName"
              name="dishName"
              type="text"
              value={formValues.dishName}
              onChange={handleInputChange}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Item Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              value={formValues.description || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formValues.price.toString()}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formValues.category}
                onValueChange={(value) =>
                  setFormValues((prev) => (prev ? { ...prev, category: value } : null))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Veg">
                    <span className="flex items-center gap-2">
                      <Image
                        src="/veg.png"
                        alt="Veg"
                        width={16}
                        height={16}
                      />
                      Veg
                    </span>
                  </SelectItem>
                  <SelectItem value="Non-Veg">
                    <span className="flex items-center gap-2">
                      <Image
                        src="/non-veg.png"
                        alt="Non-Veg"
                        width={16}
                        height={16}
                      />
                      Non-Veg
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sub-Category */}
          <div>
            <Label htmlFor="subCategory">Sub-Category</Label>
            <Select
              value={formValues.subcategory}
              onValueChange={(value) =>
                setFormValues((prev) =>
                  prev ? { ...prev, subcategory: value } : null
                )
              }
            >
              <SelectTrigger className="w-full">
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
          </div>

          {/* Start Time and End Time */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                value={formValues.startTime || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={formValues.endTime || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>

          {/* Days Available */}
          <div>
            <Label>Days Availability</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <Checkbox
                    checked={formValues.availableDays?.includes(day)}
                    onCheckedChange={() => toggleDay(day)}
                  />
                  <span>{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-1/2"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveChanges}
              className="bg-[#3CAE06] text-white w-1/2"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
