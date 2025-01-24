"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface AddItemModalProps {
  onAddItem: (newItem: {
    image: File | null;
    dishName: string;
    price: number;
    description: string;
    category: string;
    subcategory: string;
    startTime: string;
    endTime: string;
    availableDays: string[];
    isAvailable: boolean;
  }) => void;
}

export default function AddItemModal({ onAddItem }: AddItemModalProps) {
  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [formValues, setFormValues] = useState({
    image: "",
    dishName: "",
    description: "",
    price: "",
    category: "Veg",
    subcategory: "Main Course",
    startTime: "",
    endTime: "",
    availableDays: [...allDays] as string[],
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormValues({ ...formValues, image: imageUrl });
      setSelectedImage(file);
    }
  };

  const handleAddItem = () => {
    const newItem = {
      image: selectedImage ,
      dishName: formValues.dishName,
      price: Number(formValues.price),
      description: formValues.description,
      category: formValues.category,
      subcategory: formValues.subcategory,
      startTime: formValues.startTime,
      endTime: formValues.endTime,
      availableDays: formValues.availableDays,
      isAvailable: true,
    };
    onAddItem(newItem);
    handleClose();
  };

  const toggleDay = (day: string) => {
    setFormValues((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleClose = () => {
    setFormValues({
      image: "",
      dishName: "",
      description: "",
      price: "",
      category: "Veg",
      subcategory: "Main Course",
      startTime: "",
      endTime: "",
      availableDays: [],
    });
    setSelectedImage(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#3CAE06] text-white hover:bg-green-600"
        >
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          {/* Image Input */}
          <div>
            <Label htmlFor="image" className="flex flex-col items-center">
              {formValues.image ? (
                <Image
                  src={formValues.image}
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
          {/* Item Name and Description */}
          <div>
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="dishName"
              name="dishName"
              type="text"
              placeholder="Eg: ”Chicken Biryani”"
              value={formValues.dishName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Item Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Eg: ”Delicious chicken biryani”"
              value={formValues.description}
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
                placeholder="Eg: '200'"
                value={formValues.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                defaultValue={formValues.category}
                onValueChange={(value) =>
                  setFormValues({ ...formValues, category: value })
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
          {/* Sub Category */}
          <div>
            <Label htmlFor="subcategory">Sub-Category</Label>
            <Select
              defaultValue={formValues.subcategory}
              onValueChange={(value) =>
                setFormValues({ ...formValues, subcategory: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Sub-Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Main Course">Main Course</SelectItem>
                <SelectItem value="Rice">Rice</SelectItem>
                <SelectItem value="Dessert">Dessert</SelectItem>
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
                value={formValues.startTime}
                onChange={handleInputChange}
                className="w-full p-2 border text-sm border-gray-300 rounded-md "
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={formValues.endTime}
                onChange={handleInputChange}
                className="w-full p-2 text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>
          {/* Days Availability */}
          <div>
            <Label>Days Availability</Label>
            <div className="grid grid-cols-3 gap-2">
              {allDays.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <Checkbox
                    checked={formValues.availableDays.includes(day)}
                    onCheckedChange={() => toggleDay(day)}
                  />
                  <span>{day}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-1/2"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddItem}
              className="bg-[#3CAE06] text-white w-1/2"
            >
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
