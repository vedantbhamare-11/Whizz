"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function ProfileSetup() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Profile submitted!");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string); // Save the base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Profile Setup
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5 mt-6"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid gap-1.5">
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input
                id="restaurantName"
                type="text"
                placeholder="Enter restaurant name"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter address"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="number"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="area">Area</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anna-nagar">Anna Nagar</SelectItem>
                  <SelectItem value="nungambakkam">Nungambakkam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="restaurantType">Restaurant Type</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select restaurant type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veg">Veg</SelectItem>
                  <SelectItem value="nonveg">Non-Veg</SelectItem>
                  <SelectItem value="cafe">Cafe</SelectItem>
                  <SelectItem value="multicuisine">Multicuisine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opens At and Closes At */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="opensAt">Opens At</Label>
                <Input id="opensAt" type="time" required />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="closesAt">Closes At</Label>
                <Input id="closesAt" type="time" required />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <Label htmlFor="logo">Logo</Label>
            <div className="grid gap-1.5">
              <label
                htmlFor="logoInput"
                className="border border-gray-300 rounded-lg p-2 cursor-pointer"
              >
                <div className="border-2 p-2  bg-[#FAFAFA] border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative">
                  {uploadedImage ? (
                    <Image
                      src={uploadedImage}
                      alt="Uploaded"
                      className="object-contain h-full max-h-[220px] rounded-md"
                      width={220}
                      height={220}
                    />
                  ) : (
                    <div className="flex justify-center flex-row gap-2 h-[220px] items-center">
                      <Upload size={24} />
                      <span className="font-medium">Upload</span>
                    </div>
                  )}
                </div>
                <Input
                  id="logoInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Days Availability */}
            <div className="space-y-2">
              <Label>Days Availability</Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="monday" />
                  <Label htmlFor="monday">Monday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tuesday" />
                  <Label htmlFor="tuesday">Tuesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wednesday" />
                  <Label htmlFor="wednesday">Wednesday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="thursday" />
                  <Label htmlFor="thursday">Thursday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="friday" />
                  <Label htmlFor="friday">Friday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="saturday" />
                  <Label htmlFor="saturday">Saturday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sunday" />
                  <Label htmlFor="sunday">Sunday</Label>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            className="w-1/2 bg-[#3CAE06] hover:bg-[#36A205] text-white"
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Logo and Text */}
      <div className="mt-6 text-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        <p className="text-sm text-gray-500 mt-4">
          By clicking continue, you agree to our{" "}
          <br />
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
