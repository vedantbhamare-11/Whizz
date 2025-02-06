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
  const [formValues, setFormValues] = useState({
    restaurantName: "",
    address: "",
    latitude: "",
    longitude: "",
    phoneNumber: "",
    area: "",
    restaurantType: "",
    opensAt: "",
    closesAt: "",
    daysAvailable: [] as string[],
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formValues.restaurantName)
      newErrors.restaurantName = "Restaurant name is required.";
    if (!formValues.address) newErrors.address = "Address is required.";
    if (!formValues.latitude) newErrors.latitude = "Latitude is required.";
    if (!formValues.longitude) newErrors.longitude = "Longitude is required.";
    if (!formValues.phoneNumber)
      newErrors.phoneNumber = "Phone number is required.";
    else if (!/^\d{10}$/.test(formValues.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    if (!formValues.area) newErrors.area = "Area is required.";
    if (!formValues.restaurantType)
      newErrors.restaurantType = "Restaurant type is required.";
    if (!formValues.opensAt) newErrors.opensAt = "Opening time is required.";
    if (!formValues.closesAt) newErrors.closesAt = "Closing time is required.";
    if (formValues.daysAvailable.length === 0)
      newErrors.daysAvailable = "Select at least one day.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent default for both form and button clicks

    if (validateForm()) {
      console.log("Form submitted successfully!", formValues);
    } else {
      console.log("Form contains errors.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDay = (day: string) => {
    setFormValues((prev) => ({
      ...prev,
      daysAvailable: prev.daysAvailable.includes(day)
        ? prev.daysAvailable.filter((d) => d !== day)
        : [...prev.daysAvailable, day],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Mobile Logo (Visible only on small screens) */}
      <div className="mb-6 sm:hidden">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>

      {/* Profile Setup Card */}
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Profile Setup
        </h1>

        {/* Mobile Upload Image (Inside the Card, Below the Heading) */}
        <div className="sm:hidden mt-6">
          <Label htmlFor="logo">Upload Logo</Label>
          <div className="cursor-pointer">
            <label
              htmlFor="logoInput"
              className="border border-dashed mt-2 p-2 bg-[#FAFAFA] border-gray-300 rounded-lg flex flex-col items-center justify-center relative"
            >
              {uploadedImage ? (
                <Image
                  src={uploadedImage}
                  alt="Uploaded"
                  className="object-contain h-full max-h-[270px] rounded-md"
                  width={220}
                  height={220}
                />
              ) : (
                <div className="flex flex-row gap-2 h-auto items-center">
                  <Upload size={18} />
                  <span className="">Upload</span>
                </div>
              )}
            </label>
            <Input
              id="logoInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Grid Layout for Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-5 mt-6"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid gap-1.5">
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input
                id="restaurantName"
                type="text"
                placeholder="Enter restaurant name"
                className="placeholder:text-sm text-sm lg:placeholder:text-md text-md"
                value={formValues.restaurantName}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    restaurantName: e.target.value,
                  })
                }
              />
              {errors.restaurantName && (
                <p className="text-red-500 text-sm">{errors.restaurantName}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter address"
                className="placeholder:text-sm text-sm lg:placeholder:text-md text-md"
                value={formValues.address}
                onChange={(e) =>
                  setFormValues({ ...formValues, address: e.target.value })
                }
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="text"
                  placeholder="Enter latitude"
                  className="placeholder:text-sm text-sm lg:placeholder:text-md text-md"
                  value={formValues.latitude}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^-?\d*(\.\d*)?$/.test(value)) {
                      setFormValues({ ...formValues, latitude: value });
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        latitude: "",
                      }));
                    } else {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        latitude: "Please enter a valid number",
                      }));
                    }
                  }}
                />
                {errors.latitude && (
                  <p className="text-red-500 text-sm">{errors.latitude}</p>
                )}
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="text"
                  placeholder="Enter longitude"
                  className="placeholder:text-sm text-sm lg:placeholder:text-md text-md"
                  value={formValues.longitude}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^-?\d*(\.\d*)?$/.test(value)) {
                      setFormValues({ ...formValues, longitude: value });
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        longitude: "",
                      }));
                    } else {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        longitude: "Please enter a valid number",
                      }));
                    }
                  }}
                />
                {errors.longitude && (
                  <p className="text-red-500 text-sm">{errors.longitude}</p>
                )}
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="Enter phone number"
                className="placeholder:text-sm text-sm lg:placeholder:text-md text-md"
                value={formValues.phoneNumber}
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setFormValues({ ...formValues, phoneNumber: value });
                  }
                }}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="area">Area</Label>
              <Select
                onValueChange={(value) =>
                  setFormValues({ ...formValues, area: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anna-nagar">Anna Nagar</SelectItem>
                  <SelectItem value="nungambakkam">Nungambakkam</SelectItem>
                </SelectContent>
              </Select>
              {errors.area && (
                <p className="text-red-500 text-sm">{errors.area}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="restaurantType">Restaurant Type</Label>
              <Select
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
              {errors.restaurantType && (
                <p className="text-red-500 text-sm">{errors.restaurantType}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="opensAt">Opens At</Label>
                <Input
                  id="opensAt"
                  type="time"
                  value={formValues.opensAt}
                  className="w-[90%] text-sm"
                  onChange={(e) =>
                    setFormValues({ ...formValues, opensAt: e.target.value })
                  }
                />
                {errors.opensAt && (
                  <p className="text-red-500 text-sm">{errors.opensAt}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="closesAt">Closes At</Label>
                <Input
                  id="closesAt"
                  type="time"
                  value={formValues.closesAt}
                  className="w-[90%] text-sm"
                  onChange={(e) =>
                    setFormValues({ ...formValues, closesAt: e.target.value })
                  }
                />
                {errors.closesAt && (
                  <p className="text-red-500 text-sm">{errors.closesAt}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Upload & Days Availability (Only visible on desktop) */}
          <div className="space-y-4 hidden sm:block">
            {/* Upload Logo */}
            <div>
              <Label htmlFor="logo">Upload Logo</Label>
              <div className="border border-gray-300 rounded-lg p-2 cursor-pointer">
                <label
                  htmlFor="logoInput"
                  className="border-2 p-2 bg-[#FAFAFA] border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative"
                >
                  {uploadedImage ? (
                    <Image
                      src={uploadedImage}
                      alt="Uploaded"
                      className="object-contain h-full max-h-[270px] rounded-md"
                      width={220}
                      height={220}
                    />
                  ) : (
                    <div className="flex justify-center flex-row gap-2 h-[270px] items-center">
                      <Upload size={24} />
                      <span className="font-medium">Upload</span>
                    </div>
                  )}
                </label>
                <Input
                  id="logoInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Days Availability */}
            <div>
              <Label>Days Available</Label>
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
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.toLowerCase()}
                      onCheckedChange={() => toggleDay(day)}
                    />
                    <Label htmlFor={day.toLowerCase()}>{day}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            className="w-1/2 bg-[#3CAE06] hover:bg-[#36A205] text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
