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
import { useDispatch } from "react-redux";
import { setVendor } from "@/redux/vendorSlice";

export default function ProfileSetup() {
  const router = useRouter();
  const dispatch = useDispatch();

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
    vendorLogo: "",
    vendorName: "",
    address: "",
    vendorPhone: "",
    latitude: "",
    longitude: "",
    area: "",
    restaurantType: "Veg",
    startTime: "",
    endTime: "",
    availableDays: [...allDays] as string[],
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formValues.vendorName)
      newErrors.vendorName = "Restaurant name is required.";
    if (!formValues.address) newErrors.address = "Address is required.";
    if (!formValues.latitude) newErrors.latitude = "Latitude is required.";
    if (!formValues.longitude) newErrors.longitude = "Longitude is required.";
    if (!formValues.vendorPhone)
      newErrors.vendorPhone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formValues.vendorPhone))
      newErrors.vendorPhone = "Phone number must be 10 digits.";
    if (!formValues.area) newErrors.area = "Area is required.";
    if (!formValues.restaurantType)
      newErrors.restaurantType = "Restaurant type is required.";
    if (!formValues.startTime) newErrors.startTime = "Opening time is required.";
    if (!formValues.endTime) newErrors.endTime = "Closing time is required.";
    if (formValues.availableDays.length === 0)
      newErrors.availableDays = "Select at least one day.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if(name === "vendorPhone"){
      if (/^\d*$/.test(value)) {
        setFormValues({ ...formValues, vendorPhone: value });
      }
    }
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()){
      try {
        // Comlete profile
        const response = await completeProfileApi({...formValues, vendorLogo: uploadedImage});

        if (response){
          dispatch(setVendor(response));
          router.push("/dashboard");
        };
      } catch (error) {
        console.log(error);
      }
    } 
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Profile Setup
        </h1>
        <form  onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 mt-6">
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
              {errors.vendorName && (
                <p className="text-red-500 text-sm">{errors.vendorName}</p>
              )}
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
                  placeholder="Enter longitude"
                  type="text"
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
                id="vendorPhone"
                name="vendorPhone"
                type="number"
                placeholder="Enter phone number"
                value={formValues.vendorPhone}
                maxLength={10}
                onChange={handleInputChange}
                required
              />
               {errors.vendorPhone && <p className="text-red-500 text-sm">{errors.vendorPhone}</p>}
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
              {errors.area && (
                <p className="text-red-500 text-sm">{errors.area}</p>
              )}
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
                  <SelectItem value="VEG">Veg</SelectItem>
                  <SelectItem value="NON-VEG">Non-Veg</SelectItem>
                  <SelectItem value="CAFE">Cafe</SelectItem>
                  <SelectItem value="MC">Multicuisine</SelectItem>
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
                  id="startTime" 
                  name="startTime" 
                  type="time" 
                  value={formValues.startTime} 
                  onChange={handleInputChange}
                  required />
                  {errors.startTime && (
                <p className="text-red-500 text-sm">{errors.startTime}</p>
              )}
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
                  {errors.startTime && (
                <p className="text-red-500 text-sm">{errors.startTime}</p>
              )}
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
                <div className="border-2 p-2 bg-[#FAFAFA] border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative">
                  {uploadedImage ? (
                    <Image
                      src={formValues.vendorLogo}
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
              {allDays.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <Checkbox
                    defaultChecked
                    checked={formValues.availableDays.includes(day)}
                    onCheckedChange={() => toggleDay(day)}
                  />
                  <Label htmlFor={day.toLowerCase()}>{day}</Label>
                </div>
              ))}
            </div>
            {errors.availableDays && <p className="text-red-500 text-sm">{errors.availableDays}</p>}
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
    </div>
  );
}
