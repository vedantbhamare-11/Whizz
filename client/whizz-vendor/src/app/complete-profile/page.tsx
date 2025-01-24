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
import { completeProfileApi } from "../API/auth";
import { useRouter } from "next/navigation";

export default function ProfileSetup() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    vendorLogo: "",
    vendorName: "",
    address: "",
    vendorPhone: "",
    area: "",
    restaurantType: "Veg",
    startTime: "",
    endTime: "",
    availableDays: [] as string[],
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submitted");
    event.preventDefault();
    try {
      const response = await completeProfileApi({...formValues, vendorLogo: uploadedImage});
      console.log(response);  
      if (response){
        router.push("/dashboard");
      };
    } catch (error) {
      console.log(error);
    }
  };

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
      setFormValues({ ...formValues, vendorLogo: imageUrl });
      setUploadedImage(file);
    }
  };

  const toggleDay = (day: string) => {
    setFormValues((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
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
                id="vendorName"
                name="vendorName"
                type="text"
                placeholder="Enter restaurant name"
                value={formValues.vendorName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Enter address"
                value={formValues.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="vendorPhone"
                name="vendorPhone"
                type="number"
                placeholder="Enter phone number"
                value={formValues.vendorPhone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="area">Area</Label>
              <Select
              defaultValue={formValues.area}
              onValueChange={(value) =>
                setFormValues({ ...formValues, area: value })
              }>
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
              <Select
                defaultValue={formValues.restaurantType}
                onValueChange={(value) =>
                  setFormValues({ ...formValues, restaurantType: value })
                }
              >
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
                <Input 
                  id="startTime" 
                  name="startTime" 
                  type="time" 
                  value={formValues.startTime} 
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="closesAt">Closes At</Label>
                <Input 
                  id="endTime" 
                  name="endTime" 
                  type="time" 
                  value={formValues.endTime} 
                  onChange={handleInputChange} 
                  required />
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
                      src={formValues.vendorLogo}
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
                    checked={formValues.availableDays.includes(day)}
                    onCheckedChange={() => toggleDay(day)}
                  />
                  <span>{day}</span>
                </div>
              ))}
            </div>
          </div>
          </div>
          <div className="flex justify-center mt-8 col-span-2">
          <Button
            type="submit"
            className="w-1/2 bg-[#3CAE06] hover:bg-[#36A205] text-white"
          >
            Submit
          </Button>
        </div>
        </form>
        
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
